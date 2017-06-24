pragma solidity ^0.4.4;

import './zeppelin/lifecycle/Destructible.sol';
import './Seller.sol';
import './Product.sol';

contract EtherfileHub is Destructible {

    // mapping (bytes32 => address) sellerUsernames; // username => userAddress
    // mapping (address => address) sellers; // userAddress => sellerContractAddress is this necessary??

    mapping (bytes32 => address) existingUsernames;
    mapping (address => address) public sellers; // username => sellerContractAddress
    mapping (uint => address) public products;

    uint public sellerCount;
    uint public productCount;

    // event BroadcastPublicKey(bytes32 indexed username, address indexed addr, string publicKey);
    event BroadcastRegisterSeller(bytes32 indexed username, address indexed userAddr, address sellerContractAddr);
    event BroadcastProductCreated(address indexed productAddr, address sellerContractAddr);

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

        existingUsernames[_username] = s;

        //BroadcastPublicKey(_username, msg.sender, _publicKey);

        BroadcastRegisterSeller(_username, msg.sender, s);

        return true;
    }

    function createProduct(address _seller, bytes32 _name, bytes32 _description, uint256 _costInWei) returns (bool successful) {
        Product p = new Product(_name, _description, _costInWei); // will need userAddress, cost, and details
        products[productCount] = p;
        productCount++;

        Seller s = Seller(_seller);
        s.addProduct(p);

        BroadcastProductCreated(p, _seller);

        return true;
    }

    /**
    * Retrieve a product
    * [0] -> bytes32 name
    * [1] -> uint256 unitsSold
    */
    function getProduct(uint _productId) returns (address) {
        return products[_productId];
    }


}