import React, { Component } from 'react';

var _this;

const initialState = {}

class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        _this = this;

        this.state = initialState;
    }

    componentDidMount() {
        const { dispatch } = this.props;
        console.log("dispatch: ", dispatch);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h1>Dashboard</h1>
                <p>View all of your products and any purchases you've made here.</p>
            </div>
        );
    };
}

export default Dashboard;