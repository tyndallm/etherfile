pragma solidity ^0.4.4;

import './zeppelin/lifecycle/Destructible.sol';
import './Seller.sol';

contract EtherfileHub is Destructible {

    // mapping (bytes32 => address) sellerUsernames; // username => userAddress
    // mapping (address => address) sellers; // userAddress => sellerContractAddress is this necessary??

    mapping (bytes32 => address) existingUsernames;
    mapping (address => address) public sellers; // username => sellerContractAddress

    uint public sellerCount;

    // event BroadcastPublicKey(bytes32 indexed username, address indexed addr, string publicKey);
    event BroadcastRegisterSeller(bytes32 indexed username, address indexed userAddr, address sellerContractAddr);

    /**
    * Register a new seller
    * [0] -> bool registration successful
    */
    function registerSeller(bytes32 _username, bytes32 _email, string _publicKey) returns (bool successful) {
        // If username is already registered throw
        if (existingUsernames[_username] != 0) {
            throw;
        }

        Seller s = new Seller(_username, _email, _publicKey, msg.sender); // create seller contract
        sellers[msg.sender] = s; // assign username to seller contract
        sellerCount++; // increase seller count

        existingUsernames[_username] = s; // TODO: Not sure if this should be msg.sender or sellerContractAddr...

        //BroadcastPublicKey(_username, msg.sender, _publicKey);

        BroadcastRegisterSeller(_username, msg.sender, s);

        return true;
    }
}