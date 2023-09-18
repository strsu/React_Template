import React, { Component } from 'react';
import HomePresenter from './HomePresenter';

import { useAuthStore } from '../../context/authStore';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
  }

  async componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <HomePresenter props={this.props} state={this.state} />;
  }
}

export default Home;
