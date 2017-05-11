import { connect } from 'react-redux';
import { checkUserExists } from '../actions/userActions';
import React, { Component } from 'react';

var _this;

const initialState = {}

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        _this = this;

        this.state = initialState;
    }

    componentWillReceiveProps(nextProps) {
        const { dispatch } = this.props;
        if (nextProps.user.accounts.length > 0 ) {
            let nextUserProps = nextProps.user;
            let selectedUserAddress = nextUserProps.accounts[nextUserProps.selectedAccount].address;
            dispatch(checkUserExists(selectedUserAddress));
        }
    }


    render() {
        return (
            <div>
                <h1>Seller Dashboard</h1>
                <p>View all of your products and any purchases you've made here.</p>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(Dashboard);