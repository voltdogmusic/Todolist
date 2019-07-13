import React from 'react';

const ToDo = props => {


    return (


        <div>
            <button onClick={props.onDelete} style={{marginRight: '1%'}}>x</button>


            {/*<div onClick={props.toggleComplete}*/}
            {/*style={{textDecoration: props.todo.complete ? "line-through" : ''}}>*/}

            <input type='text' value={props.value} onChange={e => props.handleTextBox(e,props.key)}/>


            {/*</div>*/}

        </div>
    );
};

 export default ToDo;

