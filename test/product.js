
var Product = artifacts.require("./Product.sol");

contract('Product', function(accounts) {
    
    it("should be possible to create a product", function() {
        var name = "Test";
        var costInWei = 10000000000000000000;
        return Product.new(name, costInWei, { from: accounts[0]}).then(function(instance) {
            // console.log(instance);
            return instance.getProduct.call();
        }).then(function(result) {
            // console.log(result);
        });
    });

});