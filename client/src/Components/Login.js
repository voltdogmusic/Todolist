import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ToDoList, {localURL} from "./ToDoList";
import axios from "axios/index";


const initialState = {
    email: "",
    password: "",
    emailError: "",
    passwordError: ""
};

const localURLTodo = 'http://localhost:3002/todoUser/';
const herokuURLTodo = '';


class Login extends Component {

    state = {
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        userId: "",
        loggedIn: false
    };


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitRegToDB = async () => {

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        };
        const response = await fetch(`${localURLTodo}register`, config);
        const json = await response.json();


        if (response.ok) {

            this.setState({
                emailError: 'Registered!'
            });
        } else {

            console.log('json.error', json.error);
            this.setState({emailError: json.error});
        }


    };


    submitLoginToDB = async () => {

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        };
        const response = await fetch(`${localURLTodo}login`, config);
        const json = await response.json();

        if (response.ok) {
            this.setState({
                passwordError: 'Logged In!',
                userId: json.id,
                loggedIn: true
            });
        } else {
            this.setState({passwordError: json.error});
        }

    };


    validate = () => {
        let emailError = "";
        // let passwordError = "";

        if (!this.state.email.includes("@")) {
            emailError = "invalid email";
        }

        if (emailError) {
            this.setState({emailError});
            return false;
        }

        return true;
    };

    //if the login button was clicked and there is a user id send down the props and trigger a db call


    //how to ensure that rendering restarts once a user logs in
    //have two ToDoList components one that renders normally, but then another one that has the loginProps
    //loginTodos might not be needed anymore


    render() {
        return (
            <div>
                {/*? : isn't needed anymore*/}
                {this.state.loggedIn ?
                    <ToDoList userId={this.state.userId} loggedIn={this.state.loggedIn}/>
                    :
                    <ToDoList/>}

                <div className='login'>
                    <div>
                        <input
                            name="email"
                            placeholder="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <div style={{fontSize: 12, color: "red"}}>
                            {this.state.emailError}
                        </div>
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <div style={{fontSize: 12, color: "red"}}>
                            {this.state.passwordError}
                        </div>
                    </div>
                    <button onClick={this.submitRegToDB}>Register</button>
                    <button onClick={this.submitLoginToDB}>Login</button>
                </div>
            </div>
        );
    }
}

Login.propTypes = {};

export default Login;
