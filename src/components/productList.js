import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { getEtherscanLink } from '../utils/web3Utils';

class ProductList extends Component {

    renderProductRow = (products) => {
        return products.map((product, index) => {
            return (
                <Table.Row key={index}>
                    <Table.Cell><a href="#" onClick={() => this.props.onProductClicked(product.address)}>{product.name}</a></Table.Cell>
                    <Table.Cell><a href={getEtherscanLink(product.address)}>{product.address}</a></Table.Cell>
                    <Table.Cell>{product.costInWei}</Table.Cell>
                    <Table.Cell>{product.unitsSold}</Table.Cell>
                    <Table.Cell>{0.00}</Table.Cell>
                </Table.Row>
            )
        })
    }

    render() {
        return (
            <Table stackable={true} columns={16}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={4}>Product Name</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Address</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Cost</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Units sold</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Balance</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    { this.renderProductRow(this.props.products) }
                </Table.Body>
            </Table>
        );
    }
}

export default ProductList;