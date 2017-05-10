import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Button, Container } from 'semantic-ui-react';
import { push } from 'react-router-redux';

class Navigation extends Component {

    handleItemClick = (e, { value }) => {
        console.log("item clicked: ", value);
        console.log(this.props);
        const { dispatch } = this.props;
        dispatch(push(value));
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
                    <Menu.Item name='EtherFile' value={'/'} onClick={this.handleItemClick} />
                    <Menu.Item name='dashboard' value={'/dashboard'} onClick={this.handleItemClick} />

                    <Menu.Menu position='right'>
                        <Dropdown item text='Language'>
                            <Dropdown.Menu>
                            <Dropdown.Item>English</Dropdown.Item>
                            <Dropdown.Item>Russian</Dropdown.Item>
                            <Dropdown.Item>Spanish</Dropdown.Item>
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