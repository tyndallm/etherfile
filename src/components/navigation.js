import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Button, Container, Label, Icon } from 'semantic-ui-react';
import { push } from 'react-router-redux';

class Navigation extends Component {

    handleItemClick = (e, { value }) => {
        const { dispatch } = this.props;
        dispatch(push(value));
    }

    render() {
        const {
            user: { 
                accounts,
                selectedAccount,
                seller,
            }
        } = this.props;

        let selectedDropdown = "";

        if (accounts.length > 0) {
            if (!!seller) {
                selectedDropdown = seller.username;
            } else {
                selectedDropdown = accounts[selectedAccount].address;
            }
        }

        return (
            <Menu size='small'
                borderless={true}
                fixed={'top'}>
                <Container>
                    <Menu.Item name='Etherfile' value={'/'} onClick={this.handleItemClick} />
                    <Menu.Item>
                        <Label color={'teal'}>
                            <Icon name='plug' />Ropsten
                        </Label>
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        <Dropdown item text={selectedDropdown}>
                            <Dropdown.Menu>
                                 {accounts.map((account, index) =>
                                    <Dropdown.Item 
                                        key={index}
                                        onClick={() => this.props.onHandleSelectAccount(index)}>
                                        {account.address}
                                    </Dropdown.Item>
                                 )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Menu.Item>
                            <Button primary value={'/register'} onClick={this.handleItemClick}>Sign Up</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
            
        )
    }
}

export default Navigation;