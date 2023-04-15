import React, { Component } from 'react';

class Chat extends Component {

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
            <div>
                <h1>0</h1>
                <button onClick={this.handleIncrease}>+1</button>
            </div>
        );
    }
}

export default Chat;