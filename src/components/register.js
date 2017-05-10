import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

var _this;

const initialState = {
    username: ''
}

class Register extends Component {
    
    constructor(props) {
        super(props);
        _this = this;

        this.state = initialState;
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = (e) => {
        e.preventDefault();
        const { user } = this.props;
        //let userAddress = _this.props.user.accounts[1].address;
        let selectedUserAddress = user.accounts[user.selectedAccount].address;
        _this.props.registerUser(selectedUserAddress, _this.state.username);
    };

    render() {
        const { username } = this.state;
        return (
            <div>
                <h1>Sign up to begin selling products</h1>
                <p>EtherFile is a fully decentralized platform for selling digital products, proudly powered by Ethereum and IPFS.</p>
                <Form onSubmit={_this.handleSubmit}>
                    <Form.Field>
                        <label>username</label>
                        <Form.Input placeholder='ex. vbuterin' name='username' value={username} onChange={this.handleChange} />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    };
}

export default Register;