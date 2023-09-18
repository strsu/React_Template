import React, { Component } from 'react';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleIncrease() {
    console.log('increase');
  }

  handleDecrease() {
    console.log('decrease');
  }

  render() {
    return (
      <div>
        <h1>없는 페이지</h1>
      </div>
    );
  }
}

export default NotFound;
