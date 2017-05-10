import React from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from 'semantic-ui-react';

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
            <div>
                <h1>Sell your work directly to your audience</h1>
                <p>EthFile is a fully decentralized platform for selling digital products. EthFile is proudly powered by Ethereum and IPFS.</p>
                <Button primary onClick={_this.handleSignupClicked}>Start selling</Button>
            </div>
        )
    }
}

export default connect()(LandingContainer);