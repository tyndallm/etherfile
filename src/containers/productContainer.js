import React, { Component } from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { Card, Button, Icon, Grid, Header, Segment, Message, Divider, Label, Table } from 'semantic-ui-react';

import './productContainer.css';

var _this;

class ProductContainer extends Component {

    constructor(props) {
        super(props);
        _this = this;
    }

    componentDidMount() {
        // nothing to do
    }

    handlePurchaseClicked(projectAddress) {
        const { dispatch } = _this.props;
        // TODO
    }

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Column width={12}>
                        <Card fluid>
                            <Card.Content className={'productHeader'}>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={12}>
                                            <Card.Header className={'title'}>
                                                Building your first dapp
                                            </Card.Header>
                                            <Card.Meta className={'price'}>
                                                0.66 ETH (~$59.00)
                                            </Card.Meta>
                                            <Card.Meta>
                                                <Label>
                                                    eBook
                                                </Label>
                                            </Card.Meta>
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            <Button primary size='big' floated='right' animated>
                                                <Button.Content visible>Purchase</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name='shop' />
                                                </Button.Content>
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Card.Content>
                            <Card.Content className={'productDescription'}>
                                <p>The eBook Reader released in October 2012, the Kindle Paperwhite is the ultimate eBook Reader. No matter where you go, you will be able to hold it easily without getting tired of its weight. Read whatever you want to while you are on the move.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, sed do eiusmod tempor.</p>
                                <Divider />
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, sed do eiusmod tempor.</p>
                                <Table basic='very'>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Header as='h5'>
                                                <Header.Content>
                                                    Author
                                                </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>
                                                Matt Tyndall
                                            </Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                            <Table.Cell>
                                                <Header as='h5'>
                                                <Header.Content>
                                                    Pages
                                                </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>
                                                205
                                            </Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                            <Table.Cell>
                                                <Header as='h5'>
                                                <Header.Content>
                                                    Published
                                                </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>
                                                5/7/2017
                                            </Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                        <Table.Cell>
                                            <Header as='h5'>
                                            <Header.Content>
                                                Mark
                                                <Header.Subheader>Executive</Header.Subheader>
                                            </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                            11
                                        </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Card.Content>
                            <Card.Content>
                                <Message
                                    icon='file outline'
                                    header='Download link'
                                    content='Purchase this product to access download link'
                                />
                            </Card.Content>
                            <Card.Content extra>
                                <a>
                                    <Icon name='user' />
                                    10 Downloads
                                </a>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <div>
                            <Table basic='very'>
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>
                                                <Header as='h5'>
                                                <Header.Content>
                                                    Contract
                                                </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>
                                                Address goes here
                                            </Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                            <Table.Cell>
                                                <Header as='h5'>
                                                <Header.Content>
                                                    Creator
                                                </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>
                                                Link to username
                                            </Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                            <Table.Cell>
                                                <Header as='h5'>
                                                <Header.Content>
                                                    Created
                                                </Header.Content>
                                                </Header>
                                            </Table.Cell>
                                            <Table.Cell>
                                                5/7/2017
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                        </div>
                    </Grid.Column>
                </Grid>
                
            </div>
        )
    }
}

export default connect()(ProductContainer);