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

    componentDidMount() {
        const { dispatch, user } = this.props;

        if (user.accounts.length > 0 ) {
            let selectedUserAddress = user.accounts[user.selectedAccount].address;
            dispatch(checkUserExists(selectedUserAddress, ""));
        }
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <p>View all of your products and any purchases you've made here.</p>
            </div>
        );
    };
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Dashboard);