pragma solidity ^0.4.4;

import './zeppelin/ownership/Ownable.sol';
import './Product.sol';

contract Seller is Ownable{

    struct Details {
        bytes32 username;
        bytes32 email;
        string publicKey;
        address creator;
        uint256 created;
    }

    uint public productCount;

    mapping(uint => address) public products;

    Details details;

    event BroadcastSellerCreated(bytes32 indexed username, address indexed hubAddress, string publicKey);
    event ProductCreated(string message, address productAddress);
    event LogFailure(string message);
    event LogMessage(bytes32 name, string message, address sender);

    function Seller(bytes32 _username, bytes32 _email, string _publicKey, address _userAddr) {

        details = Details({
            username: _username,
            email: _email,
            publicKey: _publicKey,
            creator: _userAddr,
            created: block.number
        });

        productCount = 0;

        BroadcastSellerCreated(_username, msg.sender, _publicKey);
    }

    /**
    * [0] -> Seller.details.username
    * [1] -> Seller.details.email
    * [2] -> Seller.details.publicKey
    * [3] -> Seller.details.creator
    * [4] -> Seller.details.created
    * [5] -> productCount
    */
    function getSeller() returns (bytes32, bytes32, string, address, uint256, uint) {
        return (
            details.username,
            details.email,
            details.publicKey,
            details.creator,
            details.created,
            productCount
        );
    }

    function addProduct(address _productAddr) returns (bool added) {
        products[productCount] = _productAddr;
        productCount++;
    }
}