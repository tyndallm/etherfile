import Web3 from 'web3';
import {getExtendedWeb3Provider} from '../utils/web3Utils';
import bitcore from 'bitcore-lib';
// import SimpleStorageContract from '../../build/contracts/SimpleStorage.json';

const contract = require('truffle-contract');

let web3Provided;

// An example of how to properly setup contracts in Truffle 3.x
// const simpleStorage = contract(SimpleStorageContract);
// simpleStorage.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

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

export function registerUser(userAddress, username) {
    return new Promise((resolve, reject) => {
        let signData = "0x9dd2c369a187b4e6b9c402f030e50743e619301ea62aa4c0737d4ef7e10a3d49"; // web3.sha3("xyz");
        web3Client().eth.sign(userAddress, "0x9dd2c369a187b4e6b9c402f030e50743e619301ea62aa4c0737d4ef7e10a3d49", function (err, result) {
            var privateKey = bitcore.PrivateKey.fromString(result.slice(2, 66)); // remove 0x, left with 64 bits?
            var publicKey = bitcore.PublicKey.fromPrivateKey(privateKey);

            if (err) {
                console.log("Error: ", err);
                reject(err);
            }

            console.log("signed result: ", publicKey.toString());

            // TODO save the public key to a contract

            resolve(result);
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