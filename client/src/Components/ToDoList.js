import React, {Component} from 'react';
import ToDoForm from "./ToDoForm";
import Todo from "./Todo";
import axios from 'axios';


//export const localURL = 'http://localhost:3002/mycrud/';
const localURLTodo = 'http://localhost:3002/todoUser/';
export const herokuURL = '';


class ToDoList extends Component {

    constructor(props) {
        super(props);

        //each to/do inside of todos is an object with an id, text and a complete bool
        this.state = {
            todos: [],
            todoToShow: "all",
            toggleAllComplete: true
        };
    }


    componentDidUpdate(prevProps) {
        if (this.props.userId != prevProps.userId) {
            this.getTodosFromDB();
        }
    }

    // <ToDoForm onSubmit={this.addTodo}/>, onSubmit will be called inside of ToDoForm
    addTodo = (todo) => {

        this.setState((state) => ({
            todos: [todo, ...state.todos]
        }))

        //the post request for this is actually inside of the To/DoFrom component


    };

    //<To/do component handleTextBox={(e) => this.handleTextBox(e, to/do.id)}
    //contains call to update to/do in db
    handleTextBox = (e, id) => {
        let textBoxValue = e.currentTarget.value;

        this.setState((state) => ({
            todos: state.todos.map(todo => {
                if (todo.id === id) {
                    //state is updated AFTER this return statement executes
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
                    console.log('line 68 todo', todo);
                    this.updateUserToDoInDb(todo);
                }
            });
        })
    };


    //update: {todo: localTodo},
    updateUserToDoInDb = async (todo) => {

        console.log('line 76 todo', todo);

        if (this.props.loggedIn) {
            let response = await axios.post(`${localURLTodo}updateUsersTodos`, {
                id: this.props.userId,
                todo:todo
            });
        } else {
           //do not touch database, we aren't logged in
        }
    };


    // <To/do component  onDelete={() => this.handleDeleteTodo(to/do.id)}
    handleDeleteTodo = id => {

        console.log('line89', id);

        this.state.todos.find((todo) => {
            if (todo.id === id) {
                console.log('line 93', todo);
                this.deleteItemFromDb(todo);
            }
        });

        this.setState(state => ({
            todos: state.todos.filter(todo => todo.id !== id)
        }), ()=>{

        });
    };

    deleteItemFromDb = async (todo) => {
        if (this.props.loggedIn) {
            let response = await axios.delete(`${localURLTodo}deleteUsersTodos`, {data:{
                id: this.props.userId,
                todo: todo
            }});
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
            const response = await fetch(`${localURLTodo}getUserById`, config);
            const json = await response.json();

            if (response.ok) {
                let todos = json.todos;
                this.setState((state) => ({
                    todos: [...todos, ...state.todos]
                }))
            } else {
                console.log('Failed to grab user todos');
            }
        }
    };


    //Because we have access to the unique id's of each to/do object in here we don't have to send that id back up from a To/do component instance, we can instead pass in an arrow function as props, that already contains the to/do.id
    //the alternative method would be to send in to/do.id as a prop to the To/do component and then pass that in to the toggleComplete function inside of the To/do component
    //in either case, the function that takes in the id parameter must be contained within an anon function, else it will immediately fire
    render(props) {

        let todos = [];

        if (this.state.todoToShow === "all") {
            todos = this.state.todos;
        } else if (this.state.todoToShow === "active") {
            todos = this.state.todos.filter(todo => !todo.complete);
        } else if (this.state.todoToShow === "complete") {
            todos = this.state.todos.filter(todo => todo.complete);
        }

        return (
            <div>
                <ToDoForm onSubmit={this.addTodo} userId={this.props.userId}/>
                {todos.map(todo =>
                    (<Todo
                            key={todo.id}
                            todo={todo}
                            value={todo.text}
                            toggleComplete={() => this.toggleComplete(todo.id)}
                            onDelete={() => this.handleDeleteTodo(todo.id)}
                            handleTextBox={(e) => this.handleTextBox(e, todo.id)}
                        />
                    ))}

                <div>todos left: {this.state.todos.filter(todo => !todo.complete).length}</div>
                <button onClick={() => this.updateTodoToShow("all")}>all</button>
                <button onClick={() => this.updateTodoToShow("active")}>
                    active
                </button>
                <button onClick={() => this.updateTodoToShow("complete")}>
                    complete
                </button>

                {/*if one of the to/dos are complete then show the user the remove complete button, else render null*/}

                {this.state.todos.some(todo => todo.complete) ?
                    <div>
                        <button onClick={this.removeAllTodosThatAreComplete}>
                            Remove Completed
                        </button>
                    </div>
                    : null}


                {/*<Login loginProp = {this.loginFunction}>*/}


                {/*looping thru all the to/do's setting the complete to a boolean state property (toggleAllComplete)*/}
                {/*<button*/}
                {/*onClick={() =>*/}
                {/*this.setState(state => ({*/}
                {/*todos: state.todos.map(todo => ({*/}
                {/*...todo,*/}
                {/*complete: state.toggleAllComplete*/}
                {/*})),*/}
                {/*toggleAllComplete: !state.toggleAllComplete*/}
                {/*}))*/}
                {/*}*/}
                {/*>*/}
                {/*toggle all complete: {`${this.state.toggleAllComplete}`}*/}
                {/*</button>*/}


            </div>
        );
    }


    //this looks over all of the to do objects and finds the one with the correct id, i think this id is taken from the appropriate div that fired the function within To do
    //this also only works if you can pass in the to do object to the To do component (i think)
    toggleComplete = (id) => {
        this.setState((state) => ({
            todos: state.todos.map(todo => {
                if (todo.id === id) {
                    //Because map takes in a function and returns whatever you want, you can write normal code inside of it, like if else statements, as long as you end up returning the correct variable. Which in this case is an object, since you are trying to update the state of to do

                    //keep everything in the to do object the same except for complete by using the spread operator
                    console.log('id passed in', id);

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

    //filter keeps all items where the condition is true
    //if you want to remove all completed items, that is the equivalent of keeping all incomplete items and removing the rest, hence this logic works
    removeAllTodosThatAreComplete = () => {
        this.setState(state => ({
            todos: state.todos.filter(todo => !todo.complete)
        }));
    };

    //this will grab the string from the bottom button names which can be used in the comparison logic in the beginning of the render method
    updateTodoToShow = string => {
        this.setState((state) => ({
            todoToShow: string
        }));
    };


}


export default ToDoList;
