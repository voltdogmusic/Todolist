import React, {Component} from 'react';
import ToDoList, {localURL} from "./ToDoList";

//export const localURLTodo = 'http://localhost:3002/todoUser/';
export const herokuURLTodo = 'https://todolistbytlee.herokuapp.com//todoUser/';


class Login extends Component {

    state = {
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        userId: "",
        loggedIn: false
    };


    // brackets around the key value allow this function to handle multiple events
    // see Forms in React within OneNote or
    // https://www.youtube.com/watch?v=doshF5Alr-k&list=PLN3n1USn4xlntqksY83W3997mmQPrUmqM&index=11
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
            body: JSON.stringify(
                {
                    email: this.state.email,
                    password: this.state.password
                })
        };
        const response = await fetch(`${herokuURLTodo}register`, config);

        const json = await response.json();

        if (response.ok) {

            this.setState({
                emailError: 'Registered!'
            });
        } else {

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
            body: JSON.stringify(
                {
                    email: this.state.email,
                    password: this.state.password
                })
        };

        const response = await fetch(`${herokuURLTodo}login`, config);
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

        if (!this.state.email.includes("@")) {
            emailError = "invalid email";
        }

        if (emailError) {
            this.setState({emailError});
            return false;
        }

        return true;
    };


    render() {
        return (
            <div>
                <ToDoList
                    userId={this.state.userId}
                    loggedIn={this.state.loggedIn}
                />

                <div className = 'todoLoginSeperator'></div>

                <div className='login'>
                    <div>
                        <input
                            className='emailTextbox'
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
                <div className='registerAndLoginButton'>
                    <button className="btn btn-outline-info registerButton"
                            onClick={this.submitRegToDB}>Register</button>
                    <button
                        className= 'btn btn-outline-info'
                        onClick={this.submitLoginToDB}>Login</button>
                </div>

                </div>
            </div>
        );
    }
}

export default Login;
