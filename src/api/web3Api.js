import Web3 from 'web3';
import {getExtendedWeb3Provider} from '../utils/web3Utils';
import bitcore from 'bitcore-lib';
import EtherfileHubContract from '../../build/contracts/EtherfileHub.json';
import SellerContract from '../../build/contracts/Seller.json';
import ProductContract from '../../build/contracts/Product.json';

const contract = require('truffle-contract');

const SIGN_DATA = web3Client().sha3("Etherfile is awesome");

let web3Provided;

/**
 * Initialize EtherfileHub contract factory
 */
const etherfileHub = contract(EtherfileHubContract);
/*eslint-disable */
if (typeof web3 !== 'undefined') {
    etherfileHub.setProvider(new Web3(web3.currentProvider));
} else {
    etherfileHub.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
}
/*eslint-enable */

/**
 * Initialize Seller contract factory
 */
const seller = contract(SellerContract);
/*eslint-disable */
if (typeof web3 !== 'undefined') {
    seller.setProvider(new Web3(web3.currentProvider));
} else {
    seller.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
}
/*eslint-enable */

/**
 * Initialize Product contract factory
 */
const product = contract(ProductContract);
/*eslint-disable */
if (typeof web3 !== 'undefined') {
    product.setProvider(new Web3(web3.currentProvider));
} else {
    product.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
}
/*eslint-enable */

function initializeWeb3() {
    /*eslint-disable */
    if (typeof web3 !== 'undefined') {
        web3Provided = new Web3(web3.currentProvider);
    } else {
        web3Provided = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    /*eslint-enable */

    return getExtendedWeb3Provider(web3Provided);
}

function web3Client() {
    if (web3Provided) {
        return web3Provided;
    } else {
        return initializeWeb3();
    }
}

export function getAccounts() {
    return new Promise((resolve, reject) => {
        web3Client().eth.getAccounts(function (err, accts) {
            if (err != null) {
                console.log("Web3Api Error: ", err);
                reject();
            }

            if (accts.length === 0) {
                console.log("Web3Api Error: couldn't get any accounts");
                reject();
            }

            let accountsAndBalances = accts.map((address => {
                return getAccountBalance(address).then((balance) => { return { address, balance} });
            }));

            Promise.all(accountsAndBalances).then((accountsAndBalances) => {
                resolve(accountsAndBalances);
            });

        });
    
    });
}

export function getAccountBalance(account) {
    return new Promise((resolve, reject) => {
        web3Client().eth.getBalance(account, function(err, value) {
            resolve(value.valueOf());
        });
    });
}

export function registerSeller(userAddress, username, email) {
    return new Promise((resolve, reject) => {

        // let signData = "0x9dd2c369a187b4e6b9c402f030e50743e619301ea62aa4c0737d4ef7e10a3d49"; // web3.sha3("xyz");

        // generate public key for username
        web3Client().eth.sign(userAddress, SIGN_DATA , function (err, result) {
            var privateKey = bitcore.PrivateKey.fromString(result.slice(2, 66)); // 64 bits
            var publicKey = bitcore.PublicKey.fromPrivateKey(privateKey);

            if (err) {
                console.log("Error: ", err);
                reject(err);
            }

            console.log("signed result: ", publicKey.toString());

            // register user
            etherfileHub.deployed().then(function(instance) {
                return instance.registerSeller(username, email, publicKey.toString(), { from: userAddress, gas: 1000000 }); // may need to adjust gas?
            }).then(function(result) {
                console.log(result);
                resolve(result);
            });
        });
        
    });
}

export function loginSeller(userAddress) {
    return new Promise((resolve, reject) => {
        etherfileHub.deployed().then(function(instance) {

            getSellerAddress(userAddress).then(function(sellerAddress) {
                if (sellerAddress !== '0x0000000000000000000000000000000000000000') {
                    console.log("User is registered");
                    getSellerDetails(sellerAddress).then(function(sellerDetails) {
                        console.log("getSellerDetails result: ", sellerDetails);
                        //resolve(result);

                        authenticateSellerKey(sellerDetails.publicKey, userAddress).then(function(authenticated) {
                            if (authenticated) {
                                console.log("User is authenticated");
                                resolve(sellerDetails);
                            } else {
                                console.log("Error: Unable to authenticate");
                                reject("Unable to authenticate");
                            }
                        })
                    });
                } else {
                    console.log("User is not registered");
                    resolve("User is not registered");
                }
            });

        });
    });
}

export function getSellerAddress(userAddress) {
    return new Promise((resolve, reject) => {
        etherfileHub.deployed().then(function(instance) {
            instance.sellers.call(userAddress).then(function(result) {
                resolve(result);
            });
        });
    });
}

export function getSellerDetails(sellerAddress) {
    return new Promise((resolve, reject) => {
        seller.at(sellerAddress).then(function(instance) {
            instance.getSeller.call().then(function(sellerDetails) {
                let sellerObject = {
                    username: web3Client().toAscii(sellerDetails[0]),
                    email: web3Client().toAscii(sellerDetails[1]),
                    publicKey: sellerDetails[2],
                    creator: sellerDetails[3],
                    created: sellerDetails[4].toNumber(),
                    productCount: sellerDetails[5].toNumber(),
                    contractAddress: sellerAddress
                }
                resolve(sellerObject);
            });
        });
    });
}

export function authenticateSellerKey(retrievedPublicKey, userAddress) {
    return new Promise((resolve, reject) => {
        // let signData = "0x9dd2c369a187b4e6b9c402f030e50743e619301ea62aa4c0737d4ef7e10a3d49"; // web3.sha3("xyz");
        web3Client().eth.sign(userAddress, SIGN_DATA, function (err, result) {
            var privateKey = bitcore.PrivateKey.fromString(result.slice(2, 66)); // 64 bits
            var publicKey = bitcore.PublicKey.fromPrivateKey(privateKey);

            if (err) {
                console.log("Error: unable to sign data");
                reject("Error: unable to sign data");
            }

            if (retrievedPublicKey !== publicKey.toString()) {
                console.log("Error: keys don't match!");
                resolve(false);
            } else {
                resolve(true);
            }
        });
    })
}



export function createProduct(userAddress, sellerAddress, name, costInWei) {

    console.log("userAddress: ", userAddress);
    console.log("sellerAddress: ", sellerAddress);
    var productName = "Test Product";
    var productCost = 10000000000000000000;

    return new Promise((resolve, reject) => {
        let sellerInstance;
        seller.at(sellerAddress).then(function(instance) {
            console.log("instance: ", instance);
            return instance.getPublicKey.call();
        }).catch(function(exception){ 
            console.log(exception);
        }).then(function(result) {
            console.log("result: ", result);
        });
    });
}

// export function getSellerProducts(sellerAddress) {
//     console.log("requested seller address: ", sellerAddress);
//     return new Promise((resolve, reject) => {
//         seller.at(sellerAddress).then(function(instance) {
//             return instance.productCount.call();
//         }).then(function(result) {
//             console.log("result: ", result);
//             let productCount = result.valueOf();
//             console.log("web3Api.getSellerProducts() count: " + productCount);

//             // create an array where length = productCount
//             let array = Array.apply(null, {length: productCount}).map(Number.call, Number);

//             // fill array with corresponding product contract addresses
//             let productAddressPromises = array.map((id => {
//                 return getProductAddress(id);
//             }));

//             // get projectDetails for each projectAddress promise
//             Promise.all(productAddressPromises).then((productAddresses) => {
//                 let productPromises = productAddresses.map((address => {
//                     return getProduct(address);
//                 }));

//                 Promise.all(productPromises).then((products) => {
//                     resolve(products);
//                 });
//             });
//         });
//     });
// }

export function getSellerProducts(sellerContractAddress) {
    return new Promise((resolve, reject) => {
        seller.at(sellerContractAddress).then(function(instance) {
            instance.productCount.call().then(function(count) {
                console.log("count.valueOf(): ", count.valueOf());
                resolve(count.valueOf());
            });
        });
    });
}

function getProductAddress(sellerAddress, id) {
    return new Promise((resolve, reject) => {
        seller.at(sellerAddress).then(function(instance) {
            instance.products.call(id).then(function(address) {
                resolve(address);
            });
        });
    });
}

export function getProduct(productAddress) {
    return new Promise((resolve, reject) => {
        product.at(productAddress).then(function(instance) {

            instance.getProduct.call().then(function(productDetails) {
                resolve({
                    name: web3Client().toAscii(productDetails[0]),
                    costInWei: productDetails[1].toNumber(),
                    unitsSold: productDetails[2],
                });
            });
        });
    });
}

export function getCurrentBlockNumber() {
    return new Promise((resolve, reject) => {
        web3Client().eth.getBlockNumber(function (err, blockNum) {
            if (err) {
                reject();
            }
            resolve(blockNum);
        });
    });
}

export function getNetwork() {
    return new Promise((resolve, reject) => {
        web3Client().version.getNetwork(function (err, network) {
            if (err) {
                reject();
            }
            resolve(network);
        })
    })
}

export function toWei(ethValue) {
    return web3Client().toWei(ethValue, "ether");
}

export function fromWei(weiValue) {
    return web3Client().fromWei(weiValue, "ether");
}