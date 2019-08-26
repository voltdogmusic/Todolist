import React, {Component} from 'react';
import axios from 'axios';
import {localURL} from "./ToDoList";
import shortid from 'shortid';
import {herokuURLTodo} from "./Login";

//input field at the top, will send the text being input back up to ToDoList via onSubmit, then ToDoList can create a to/do object with that information
class ToDoForm extends Component {

    state = {
        text: '',
        id: ''
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };


    handleSubmit = async (event) => {
        event.preventDefault();
        //putting this inside of onSubmit within To/DoList
        this.postTodoToDatabase();
    };

    postTodoToDatabase = async () => {

        let newId = shortid.generate();

        let newTodo = {
                id: newId,
                text:this.state.text,
                complete: false
        };

        if(this.props.userId){
            
            let response = await axios.post(`${herokuURLTodo}addToUsersTodos`, {
                id: this.props.userId,
                update: {todo: newTodo},
            });
        }

        //pretty sure i can shorten this to just newTodo since I am sending in an object
        this.props.onSubmit({
            id: newId,
            text: this.state.text,
            complete: false
        });

        this.setState({
            text: '',
            id: ''
        });
    };

    render() {
        return (
            <div className="todoForm">
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.text}
                        name='text'
                        onChange={this.handleChange}
                        placeholder="todo..."/>
                    <button
                        className="btn btn-outline-info"
                        id='addButton'
                        onClick={this.handleSubmit}>
                        Add Todo
                    </button>
                </form>
            </div>
        );
    }
}


export default ToDoForm;
