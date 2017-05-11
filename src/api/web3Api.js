import Web3 from 'web3';
import {getExtendedWeb3Provider} from '../utils/web3Utils';
import bitcore from 'bitcore-lib';
import EtherfileHubContract from '../../build/contracts/EtherfileHub.json';
import SellerContract from '../../build/contracts/Seller.json';

const contract = require('truffle-contract');

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

// export function registerUser(userAddress, username) {
//     return new Promise((resolve, reject) => {
//         let signData = "0x9dd2c369a187b4e6b9c402f030e50743e619301ea62aa4c0737d4ef7e10a3d49"; // web3.sha3("xyz");
//         web3Client().eth.sign(userAddress, signData , function (err, result) {
//             var privateKey = bitcore.PrivateKey.fromString(result.slice(2, 66)); // remove 0x, left with 64 bits?
//             console.log("privateKey: ", privateKey.toString());
//             var publicKey = bitcore.PublicKey.fromPrivateKey(privateKey);

//             if (err) {
//                 console.log("Error: ", err);
//                 reject(err);
//             }

//             console.log("signed result: ", publicKey.toString());

//             etherfileHub.deployed().then(function(instance) {
//                 return instance.registerUser(username, publicKey.toString(), { from: userAddress });
//             }).then(function(result) {
//                 console.log(result);
//                 resolve(result);
//             });
//         });
        
//     });
// }
export function registerSeller(userAddress, username, email) {
    return new Promise((resolve, reject) => {

        let signData = "0x9dd2c369a187b4e6b9c402f030e50743e619301ea62aa4c0737d4ef7e10a3d49"; // web3.sha3("xyz");

        // generate public key for username
        web3Client().eth.sign(userAddress, signData , function (err, result) {
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

// export function checkIfUserExists(userAddress, username) {
//     return new Promise((resolve, reject) => {

//         let etherfileHubInstance;
//         etherfileHub.deployed().then(function(instance) {
//             etherfileHubInstance = instance;
//             let broadcastEvent = etherfileHubInstance.BroadcastPublicKey({addr: userAddress}, function(err, result) {
//                 if (err) {
//                     reject("Error: ", err);
//                 }

//                 let retrievedPublicKey = result.args.publicKey;

//                 let signData = "0x9dd2c369a187b4e6b9c402f030e50743e619301ea62aa4c0737d4ef7e10a3d49"; // web3.sha3("xyz");
//                 web3Client().eth.sign(userAddress, signData, function (err, result) {
//                     var privateKey = bitcore.PrivateKey.fromString(result.slice(2, 66)); // remove 0x, left with 64 bits?
//                     var publicKey = bitcore.PublicKey.fromPrivateKey(privateKey);

//                     if (retrievedPublicKey === publicKey.toString()) {
//                         resolve(result);
//                     } else {
//                         reject("Keys don't match, wrong user");
//                     }
//                 });
//             });
//         });
//     });
// }

/**
 * We can use the as a sort of "untrusted login"
 * From the UI perspective if the username checks out and the publickey matches, the user is effectively logged in
 * However any contract transactions will also require that the msg.sender matches the owner 
 * (this provides authentication protection, but not necessarily privacy of a sellers data)
 */
export function checkIfUserExists(userAddress) {
    return new Promise((resolve, reject) => {

        let etherfileHubInstance;
        etherfileHub.deployed().then(function(instance) {
            etherfileHubInstance = instance;

            // 1. Get user's sellerAddress
            etherfileHubInstance.sellers.call(userAddress).then(function(sellerAddress) {

                if (sellerAddress === 0) {
                    console.log("Error: seller does not exist");
                    reject("Error: seller does not exist. Either the username doesn't exist or sellerContract doesn't...");
                }

                console.log("sellerAddress: ", sellerAddress);

                let sellerInstance;
                seller.at(sellerAddress).then(function(instance) {
                    sellerInstance = instance;

                    // 2. Get requested seller's publicKey
                    sellerInstance.getSeller.call().then(function(sellerDetails) {
                        let sellerObject = {
                            username: web3Client().toAscii(sellerDetails[0]),
                            email: web3Client().toAscii(sellerDetails[1]),
                            publicKey: sellerDetails[2],
                            addr: sellerDetails[3],
                            created: sellerDetails[4].toNumber(),
                            productCount: sellerDetails[5].toNumber()
                        }

                        console.log("sellerObject: ", sellerObject);

                        // 3. Confirm it matches requesting user's publicKey
                        let signData = "0x9dd2c369a187b4e6b9c402f030e50743e619301ea62aa4c0737d4ef7e10a3d49"; // web3.sha3("xyz");
                        web3Client().eth.sign(userAddress, signData, function (err, result) {
                            var privateKey = bitcore.PrivateKey.fromString(result.slice(2, 66)); // 64 bits
                            var publicKey = bitcore.PublicKey.fromPrivateKey(privateKey);

                            if (err) {
                                console.log("Error: unable to sign data");
                                reject("Error: unable to sign data");
                            }

                            if (sellerObject.publicKey !== publicKey.toString()) {
                                console.log("Error: keys don't match!");
                                reject("Error: keys don't match");
                            } else {
                                resolve(sellerObject);
                            }
                        });
                    });
                });

            });
        });
    });
}

export function getUserProducts(userAddress, username) {
    return new Promise((resolve, reject) => {
        resolve("success");
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