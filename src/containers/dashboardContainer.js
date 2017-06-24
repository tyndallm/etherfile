import { connect } from 'react-redux';
import { fetchProducts, createProduct } from '../actions/sellerActions';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import ProductList from '../components/productList';
import { push } from 'react-router-redux';

var _this;

const initialState = {
    displaySellerActions: false,
    requestedProducts: false,
}

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        _this = this;

        this.state = initialState;
    }

    handleCreateProductClicked() {
        const { dispatch, user, seller } = _this.props;

        let selectedUserAddress = user.accounts[user.selectedAccount].address;

        // TODO display modal form?
        // dispatch(createProduct(selectedUserAddress, seller.contractAddress, "TestBook", 10000000000000000000));

        dispatch(createProduct(selectedUserAddress, seller.contractAddress, "Test", 100000000000));
    }

    handleProductClicked = (productAddress) => {
        const { dispatch } = this.props;
        dispatch(push('/products/' + productAddress));
    }

    getSellerActions(sellerObject) {
        if (sellerObject.username !== "") {
            return (
                <Button primary floated={'right'} onClick={this.handleCreateProductClicked}>Create product</Button>
            )
        } else {
            return(<div></div>);
        }
    }


    render() {
        return (
            <div>
                <h1>Products {this.getSellerActions(this.props.seller)}</h1>
                <ProductList products={this.props.seller.products} onProductClicked={this.handleProductClicked}/>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        seller: state.seller,
    };
}

export default connect(mapStateToProps)(Dashboard);