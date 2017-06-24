import React, { Component } from 'react';
import { Menu, Dropdown, Button, Container, Label, Icon } from 'semantic-ui-react';
import { push } from 'react-router-redux';

class Navbar extends Component {

    handleItemClick = (e, { value }) => {
        const { dispatch } = this.props;
        dispatch(push(value));
    }

    renderUserNav = (user, seller) => {
        let selectedDropdownText = !!seller ? seller.username : user.accounts[user.selectedAccount].address;

        return (
            <Menu.Menu position='right'>
                <Dropdown item text={selectedDropdownText}>
                    <Dropdown.Menu>
                            {user.accounts.map((account, index) =>
                            <Dropdown.Item 
                                key={index}
                                onClick={() => this.props.onHandleSelectAccount(index)}>
                                {account.address}
                            </Dropdown.Item>
                            )}
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        );
    }

    renderNetworkLabelMenuItem = () => {
        return (
            <Menu.Item>
                <Label color={'teal'}>
                    <Icon name='plug' />Ropsten
                </Label>
            </Menu.Item>
        );
    }

    render() {
        const { user, seller } = this.props;

        let selectedDropdownText = !!seller ? seller.username : user.accounts[user.selectedAccount].address;

        return (
            <Menu 
                size='small'
                borderless={true}
                fixed={'top'}>
                <Container>
                    <Menu.Item name='Etherfile' value={'/'} onClick={this.handleItemClick} />
                    { this.renderNetworkLabelMenuItem() }
                    { this.renderUserNav(user, seller) }
                </Container>
            </Menu>
        )
    }
}

export default Navbar;
