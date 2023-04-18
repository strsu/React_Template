import React, { Component } from 'react';
import HomePresenter from "./HomePresenter";

import { authApi } from "../../services/auth/auth";
import { soccerApi } from "../../services/soccer/soccer";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { list: [] };
    }

    async componentDidMount() {
        await authApi.login({
            email: "admin",
            password: "admin"
        });
        await soccerApi.list();
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <HomePresenter
                props={this.props}
                state={this.state}
            />
        );
    }
}

export default Home;