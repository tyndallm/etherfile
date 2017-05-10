pragma solidity ^0.4.4;

import './zeppelin/lifecycle/Destructible.sol';

contract EtherfileHub is Destructible {

    mapping (bytes32 => address) usernames;

    event BroadcastPublicKey(bytes32 indexed username, address indexed addr, string publicKey);

    /**
    * Register a new user
    * [0] -> bool registration successful
    */
    function registerUser(bytes32 _username, string _publicKey) returns (bool successful) {
        // If username is already registered throw
        if (usernames[_username] != 0) {
            throw;
        }

        usernames[_username] = msg.sender;

        BroadcastPublicKey(_username, msg.sender, _publicKey);

        return true;
    }
}