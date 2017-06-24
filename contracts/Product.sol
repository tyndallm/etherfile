pragma solidity ^0.4.4;

contract Product {

    bytes32 public name;
    bytes32 public description;
    uint256 public unitsSold;
    uint256 public costInWei;

    function Product(bytes32 _name, bytes32 _description, uint256 _costInWei) {
        name = _name;
        description = _description;
        costInWei = _costInWei;
        unitsSold = 0;
    }

    function getProduct() returns (bytes32, bytes32, uint256, uint256) {
        return (
            name,
            description,
            costInWei,
            unitsSold
        );
    }
}