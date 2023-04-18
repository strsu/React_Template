import React, { Component } from 'react';
import Presenter from ".//Presenter";

class extends Component {

    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleIncrease() {
        console.log('increase');
    }

    handleDecrease() {
        console.log('decrease');
    }

    render() {
        return (
            <Presenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default ;