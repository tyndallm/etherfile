import { connect } from 'react-redux';
import { fetchProducts, createProduct } from '../actions/sellerActions';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
// import { createProduct } from '../api/web3Api';

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

    componentDidMount() {
        // console.log("componentDidMount");
        console.log(this.props);
        const { dispatch, seller } = _this.props;
        if (seller.contractAddress !== '') {
            console.log("compDidMnt: seller available");
            // _this.setState({
            //     displaySellerActions: true
            // });

            dispatch(fetchProducts(seller.contractAddress));
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps");
        const { dispatch, seller } = _this.props;

        if (nextProps.seller.contractAddress !== seller.contractAddress) {
            console.log("compWillRcv: seller available...");

            dispatch(fetchProducts(nextProps.seller.contractAddress));
        }
    }

    handleCreateProductClicked() {
        const { dispatch, user, seller } = _this.props;
        console.log("create product clicked");
        console.log("sellerProps available: ", seller);

        let selectedUserAddress = user.accounts[user.selectedAccount].address;
        console.log("user address: ", selectedUserAddress);
        console.log("seller contract address: ", seller.contractAddress);

        // TODO display modal form?
        // dispatch(createProduct(selectedUserAddress, seller.contractAddress, "TestBook", 10000000000000000000));

        dispatch(createProduct(selectedUserAddress, seller.contractAddress, "Test", 100000000000));
    }

    getSellerActions(sellerObject) {
        if (sellerObject.username !== "") {
            return (
                <Button primary onClick={this.handleCreateProductClicked}>Create product</Button>
            )
        } else {
            return(<div></div>);
        }
    }


    render() {
        return (
            <div>
                <h1>Seller Dashboard</h1>
                <p>View all of your products and any purchases you've made here.</p>
                <p>seller username: {this.props.seller.username}</p>
                <p>seller address: {this.props.seller.contractAddress}</p>
                {this.getSellerActions(this.props.seller)}
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