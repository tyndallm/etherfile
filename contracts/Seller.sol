pragma solidity ^0.4.4;

import './zeppelin/ownership/Ownable.sol';
import './Product.sol';

contract Seller is Ownable {

    struct Details {
        bytes32 username;
        bytes32 email;
        string publicKey;
        address addr;
        uint256 created;
    }

    uint productCount;

    mapping(uint => address) public products;

    Details details;

    modifier onlySeller {
        if (owner != msg.sender) throw;
        _;
    }

    event BroadcastSellerCreated(bytes32 indexed username, address indexed hubAddress, string publicKey);
    event LogProductCreated(uint productId, address indexed sellerAddress, address indexed productAddress);

    function Seller(bytes32 _username, bytes32 _email, string _publicKey, address _userAddr) {

        details = Details({
            username: _username,
            email: _email,
            publicKey: _publicKey,
            addr: _userAddr,
            created: block.number
        });

        productCount = 0;

        BroadcastSellerCreated(_username, msg.sender, _publicKey);
    }

    /**
    * [0] -> Seller.details.username
    * [1] -> Seller.details.email
    * [2] -> Seller.details.publicKey
    * [3] -> Seller.details.addr
    * [4] -> Seller.details.created
    * [5] -> productCount
    */
    function getSeller() returns (bytes32, bytes32, string, address, uint256, uint) {
        return (
            details.username,
            details.email,
            details.publicKey,
            details.addr,
            details.created,
            productCount
        );
    }

    function createProduct(bytes32 _name, uint _costInWei) onlySeller returns (address productAddress) {
        Product p = new Product(_name, _costInWei);
        products[productCount] = p;
        LogProductCreated(productCount, address(this), p);
        productCount++;
        return p;
    }

    function() {
        throw;
    }

}