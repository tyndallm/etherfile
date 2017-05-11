pragma solidity ^0.4.4;

import './zeppelin/lifecycle/Destructible.sol';

contract Product is Destructible {

    bytes32 public name;
    uint public costInWei;

    uint public unitsSold;

    //mapping (address => bytes32) public accessibleLinks; not sure how this will work yet, only authorized users should be able to access a link
    // how can we create links that are locked to a purchaser? Can we someone sign the link with a private key?

    function Product(bytes32 _name, uint _costInWei) {
        name = _name;
        costInWei = _costInWei;

        unitsSold = 0;
    }

    function getProduct() returns (bytes32, uint, uint) {
        return (
            name,
            costInWei,
            unitsSold
        );
    }

    function() {
        throw;
    }

}