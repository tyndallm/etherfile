var Seller = artifacts.require("./Seller.sol");
var Product = artifacts.require("./Product.sol");

contract('Seller', function(accounts) {
    
    it("should be possible to create a Seller", function() {
        var username = "matt";
        var email = "matt@helloworld.com"
        var publicKey = "0342f8e259b4c54c76f7214c8bcad5964100bf2c0f450bd826ea7fd8be51f1a30c";

        var sellerInstance;
        return Seller.new(username, email, publicKey, accounts[0], { from: accounts[5] }).then(function(instance) {
            sellerInstance = instance;

            sellerInstance.getSeller.call().then(function(sellerDetails) {
                let sellerObject = {
                    username: web3.toUtf8(sellerDetails[0]),
                    email: web3.toUtf8(sellerDetails[1]),
                    publicKey: sellerDetails[2],
                    creator: sellerDetails[3],
                    created: sellerDetails[4].toNumber(),
                    productCount: sellerDetails[5].toNumber(),
                }

                assert.equal(username, sellerObject.username, "usernames should match");
                assert.equal(email, sellerObject.email, "emails should match");

                var productName = "Test Product";
                var productCost = 10000000000000000000;

                sellerInstance.createProduct(productName, productCost).then(function(result) {
                    var productId = result.logs[0].args.productId;
                    var sellerContract = result.logs[0].args.sellerAddress;
                    var productContract = result.logs[0].args.productAddress;
                    
                    assert.equal(productId.valueOf(), 0, "should be the first product");

                    return Product.at(productContract).then(function(instance) {
                        instance.getProduct.call().then(function(productDetails) {
                            var productObject = {
                                name: web3.toUtf8(productDetails[0]),
                                cost: productDetails[1].toNumber(),
                                unitsSold: productDetails[2].valueOf()
                            }
                            assert.equal(productName, productObject.name, "names should match");
                            assert.equal(productCost, productObject.cost, "cost in wei should match");
                            assert.equal(0, productObject.unitsSold, "should not have any units sold");
                        });
                    });
                });
            });
        });
    });

});