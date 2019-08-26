import React, {Component} from 'react';
import ToDoForm from "./ToDoForm";
import Todo from "./Todo";
import axios from 'axios';
import {herokuURLTodo} from "./Login";
import {localURLTodo} from "./Login";


class ToDoList extends Component {

    constructor(props) {
        super(props);

        //each to/do inside of todos is an object with an id, text and a complete bool
        this.state = {
            todos: []
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.userId !== prevProps.userId) {
            this.getTodosFromDB();
        }
    }

    // <ToDoForm onSubmit={this.addTodo}/>, onSubmit will be called inside of ToDoForm
    addTodo = (todo) => {
        // you must use the spread syntax when updating a state array, this is because you must return a new array with that new item in it, the spread syntax does this for you
        this.setState((state) => ({
            todos: [todo, ...state.todos]
        }))

        //the post request for this is actually inside of the To/DoFrom component
    };

    //<To/do component handleTextBox={(e) => this.handleTextBox(e, to/do.id)}
    //contains call to update to/do in db
    handleTextBox = (e, id) => {

        /*
        target: whatever element somebody actually clicked on. It can vary, as this can be within an element that the event was bound to.

        currentTarget: is the element you actually bound the event to. This will never change. it is the element that the event listener is attached to
         */
        let textBoxValue = e.currentTarget.value;

        this.setState((state) => ({
            todos: state.todos.map(todo => {
                if (todo.id === id) {
                    // state is updated AFTER this return statement executes
                    // the spread operator here allows us to crete a new object that has all of its properties the same as before, except for the text property in this case, this allows use to avoid mutating state
                    return {
                        ...todo,
                        text: textBoxValue
                    }
                } else {
                    //if this isn't the to/do we are interested in, just return it without modifying its textBoxValue
                    return todo;
                }
            })
        }), () => {
            //to/do state must be completely set before updating database
            //we can't simply use the text box value bc we need the exact to/do object
            //thus we need to loop over the to/do's again to get the to/do object that was updated in line ~53
            this.state.todos.find((todo) => {
                if (todo.id === id) {
                    this.updateUserToDoInDb(todo);
                }
            });
        })
    };


    //update: {todo: localTodo},
    updateUserToDoInDb = async (todo) => {

        if (this.props.loggedIn) {
            let response = await axios.post(`${herokuURLTodo}updateUsersTodos`, {
                id: this.props.userId,
                todo: todo
            });
        } else {
            //do not touch database, we aren't logged in
        }
    };

    // this function is passed to <To/do component from this components render function via
    // handleDeleteTodo={() => this.handleDeleteTodo(to/do.id)}
    handleDeleteTodo = id => {

        this.state.todos.find((todo) => {
            if (todo.id === id) {
                this.deleteItemFromDb(todo);
            }
        });

        this.setState(state => ({
            todos: state.todos.filter(todo => todo.id !== id)
        }), () => {

        });
    };

    deleteItemFromDb = async (todo) => {
        if (this.props.loggedIn) {
            let response = await axios.delete(`${herokuURLTodo}deleteUsersTodos`, {
                data: {
                    id: this.props.userId,
                    todo: todo
                }
            });
        } else {
            //do not touch database, we aren't logged in
        }
    };

    getTodosFromDB = async () => {
        if (this.props.userId) {
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: this.props.userId})
            };
            const response = await fetch(`${herokuURLTodo}getUserById`, config);
            const json = await response.json();

            if (response.ok) {
                // clear any to/dos on screen, since we weren't logged in
                let emptyArray = [];
                this.setState({
                    todos: emptyArray
                }, () => {
                    let todos = json.todos;
                    this.setState((state) => ({
                        todos: [...todos, ...state.todos]
                    }))
                });
            } else {
                console.log('Failed to grab user todos');
            }
        }
    };


    //Because we have access to the unique id's of each to/do object in here we don't have to send that id back up from a To/do component instance, we can instead pass in an arrow function as props, that already contains the to/do.id
    //the alternative method would be to send in to/do.id as a prop to the To/do component and then pass that in to the toggleComplete function inside of the To/do component
    //in either case, the function that takes in the id parameter must be contained within an anon function, else it will immediately fire
    render() {

        return (
            <div>

                <ToDoForm onSubmit={this.addTodo}
                          userId={this.props.userId}/>

                {this.state.todos.map(todo =>
                    (<Todo
                            key={todo.id}
                            todo={todo}
                            todoText={todo.text}
                            toggleComplete={() => this.toggleComplete(todo.id)}
                            handleDeleteTodo={() => this.handleDeleteTodo(todo.id)}
                            handleTextBox={e => this.handleTextBox(e, todo.id)}
                        />
                    ))}
            </div>
        );
    }

    //this looks over all of the to do objects and finds the one with the correct id, i think this id is taken from the appropriate div that fired the function within To do
    //this also only works if you can pass in the to do object to the To do component (i think)
    //Because map takes in a function and returns whatever you want, you can write normal code inside of it, like if else statements, as long as you end up returning the correct variable. Which in this case is an object, since you are trying to update the state of to do
    //keep everything in the to do object the same except for complete by using the spread operator
    toggleComplete = (id) => {
        this.setState((state) => ({
            todos: state.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        complete: !todo.complete
                    }
                } else {
                    //this isn't the to do we wish to change, so just return it
                    return todo;
                }
            })
        }))
    };
}

export default ToDoList;
