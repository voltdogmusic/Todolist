import React from 'react';

const ToDo = props => {
    return (
        <div>
            <button
                    className = 'btn btn-outline-danger deleteTodoButton'
                    onClick={props.handleDeleteTodo}
                    style={{marginRight: '1%'}}>
                x
            </button>
            <input type='text'
                   value={props.todoText}
                   onChange={e => props.handleTextBox(e)}/>
        </div>
    );
};

export default ToDo;

