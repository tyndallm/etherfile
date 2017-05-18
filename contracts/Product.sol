pragma solidity ^0.4.4;

contract Product {

    bytes32 public name;
    uint256 public unitsSold;

    function Product(bytes32 _name) {
        name = _name;
        unitsSold = 0;
    }

    function getProduct() returns (bytes32, uint256) {
        return (
            name,
            unitsSold
        );
    }
}