import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from "axios/index";

class App2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myJson: {},
            myArray: [],
            myArrayIsntUndef:false
        }
    }


    async componentDidMount() {

        //Example 1 JSON
        let response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        let json = await response.json();
        this.setState({
            myJson: json
        },()=>{

        });


        //Example 2 Array
        //Because of the async call, the array will initially be undefined during the first calls to render, to fix this, you must check that it isn't empty, if its not empty, set a boolean that will control the rendering
        let response2 = await fetch('http://localhost:3002/posts');
        let json2 = await response2.json();
        this.setState({
            myArray: json2
        },()=>{

            if(this.state.myArray[0]!==undefined){
                this.setState({myArrayIsntUndef : true});
            }

        });

    }

    render() {

        let {myJson, myArray, myArrayIsntUndef} = this.state;

        return (
            <div>

                {myJson.title}

                {myArrayIsntUndef &&
                <div>{myArray[0].title}</div>
                }


            </div>

        );
    }
}

App2.propTypes = {};

export default App2;
