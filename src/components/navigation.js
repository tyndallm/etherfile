import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Button, Container } from 'semantic-ui-react';
// import { getFormattedUserAccount } from '../utils/textUtils';

class Navigation extends Component {

    handleItemClick = () => {
        console.log("item clicked");
    }

    render() {
        const {
            user: { 
                accounts,
                selectedAccount 
            }
        } = this.props;

        return (
            <Menu size='small'
                borderless={true}
                fixed={'top'}>
                <Container>
                    <Menu.Item name='EtherFile' onClick={this.handleItemClick} />
                    <Menu.Item name='dashboard' onClick={this.handleItemClick} />

                    <Menu.Menu position='right'>
                        <Dropdown item text='Language'>
                            <Dropdown.Menu>
                            <Dropdown.Item>English</Dropdown.Item>
                            <Dropdown.Item>Russian</Dropdown.Item>
                            <Dropdown.Item>Spanish</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Menu.Item>
                            <Button primary>Sign Up</Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
            </Menu>
            
        )
    }
}

export default Navigation;