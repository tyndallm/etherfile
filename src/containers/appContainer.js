import React from 'react';
import {connect} from 'react-redux';
import {fetchAccountsAndBalances} from '../actions/userActions';
import { Grid } from 'semantic-ui-react';

import './appContainer.css';

class AppContainer extends React.Component {
    
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchAccountsAndBalances());
    }

    render() {
        let content = (
            <div className={'mainContent'}>
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