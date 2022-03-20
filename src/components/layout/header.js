import React from "react";
import { Avatar,Menu, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import axios from "axios";


class CustomHeader extends React.Component {

    state = {
        current: 'jobs',
    };

    componentDidMount() {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        axios.get('/api/v1/user', config).then(
            res => {
                this.setState({
                    user: res.data
                });
            },
            err => {
                console.log(err);
            }
        )
    }

    handleClick = e => {
        this.setState({ current: e.key },()=>{
        });
    };

    render() {
        const { current } = this.state;

        let welcome
        if(this.state.user) {
            welcome = (
                <h5>Hi {this.state.username}</h5>
            )
        }

        let button
        if (this.props.user) {
            button = (
                <a href="http://localhost:3000/login">
                    <Button
                        type="button"
                        onClick={() => localStorage.clear()}
                    >
                        Logout
                    </Button>
                </a>
            )
        } else {
            button = (
                <a href="http://localhost:3000/login">
                    <Button type="button">
                        Login
                    </Button>
                </a>
            )
        }

        return (
            <div class={"custom-header"}>
                <div class={"custom-header-left"}>
                    CA-SDE-JOBS
                </div>
                <div class={"custom-header-mid"}>
                    <Menu
                        onClick={this.handleClick}
                        selectedKeys={[current]}
                        mode="horizontal">

                        <Menu.Item key="jobs">
                            Jobs
                            {<Link to="jobs" />}
                        </Menu.Item>
                        <Menu.Item key="companies">
                            Companies
                            {<Link to="companies" />}
                        </Menu.Item>
                    </Menu>
                </div>
                <div class={"custom-header-right"}>
                    {welcome}
                    {button}
                </div>
            </div>


        );
    }
}

export default CustomHeader;