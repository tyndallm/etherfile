import React from 'react';
import {connect} from 'react-redux';
import { fetchAccountsAndBalances, setSelectedAccount } from '../actions/userActions';
import { Grid } from 'semantic-ui-react';
import Navigation from '../components/navigation';

import './appContainer.css';

class AppContainer extends React.Component {
    
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchAccountsAndBalances());
    }

    handleSelectAccount = (accountIndex) => {
        const {dispatch} = this.props;
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
        user: state.user
    };
}

export default connect(mapStateToProps)(AppContainer);