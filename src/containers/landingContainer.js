import React from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Button } from 'semantic-ui-react';

import './landingContainer.css';

var _this;

class LandingContainer extends React.Component {

    constructor(props) {
        super(props);
        _this = this;
    }

    componentDidMount() {
        // nothing to do
    }

    handleSignupClicked(projectAddress) {
        const { dispatch } = _this.props;
        dispatch(push('/register'));
    }

    render() {
        return (
            <Grid container>
                <Grid.Column width={16}>
                    <div className="masthead">
                        <h1>Sell your work directly to your audience</h1>
                        <p>Etherfile is a decentralized platform for selling digital content, backed by Ethereum smart contracts.</p>
                        <Button primary size='huge' onClick={_this.handleSignupClicked}>Start selling</Button>
                    </div>
                </Grid.Column>
            </Grid>
        )
    }
}

export default connect()(LandingContainer);