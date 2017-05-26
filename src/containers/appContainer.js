import React from 'react';
import {connect} from 'react-redux';
import { 
    fetchAccountsAndBalances, 
    setSelectedAccount
} from '../actions/userActions';
import {
    loginSeller,
    fetchProducts,
} from '../actions/sellerActions';

import { Grid } from 'semantic-ui-react';
import Navigation from '../components/navigation';

import './appContainer.css';

class AppContainer extends React.Component {
    
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchAccountsAndBalances())
        .then(() => {
            let selectedUserAddress = this.props.user.accounts[this.props.user.selectedAccount].address;
            dispatch(loginSeller(selectedUserAddress)).then(() => {
                console.log("logged in: ", this.props.seller);
                dispatch(fetchProducts(this.props.seller.contractAddress));
            });
        });
    }

    handleSelectAccount = (accountIndex) => {
        const {dispatch} = this.props;
        console.log(accountIndex);
        dispatch(setSelectedAccount(accountIndex));
    }

    render() {
        let content = (
            <div className={'mainContent'}>
                <Navigation 
                    user={this.props.user}
                    onHandleSelectAccount={this.handleSelectAccount} 
                    dispatch={this.props.dispatch}/>
                {this.props.children}
            </div>
        );

        return (
            <Grid container>
                {content}
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        seller: state.seller,
    };
}

export default connect(mapStateToProps)(AppContainer);