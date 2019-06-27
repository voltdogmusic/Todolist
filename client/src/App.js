import React, {Component} from 'react';
import axios from 'axios';

let posts = 'http://localhost:3002/posts';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            myArrayIsntUndef:false
        };
    }

    componentDidMount() {
        //this.getDataFromDbVanillaFetch();
        this.getDataFromDbAxios();
        this.postDataToDbAxios();
        this.getDataFromDbAxiosAwait();
    }

    //Vanilla Get
    async getDataFromDbVanillaFetch() {
        const respVar = await fetch(posts);
        console.log("react get with async", respVar); //you MUST convert the response into JSON to use it
        const jsonVar = await respVar.json();
        console.log("react get with async", jsonVar);

    };

    //Axios Get, see App2 to properly render this data
    getDataFromDbAxios() {
        axios.get('http://localhost:3002/posts')
            .then(function (response) {
                console.log("axios get then", response);
                console.log("axios get then", response.data);
            })
            .catch(function (error) {

                console.log("axios get then", error);
            })
            .finally(function () {

            });
    }

    //Axios Get Await Fetch style
    //Because the data comes as an array a boolean switch is needed for rendering
    //See App2 for more information
    getDataFromDbAxiosAwait = async () => {
        let response2 = await fetch('http://localhost:3002/posts');
        let json2 = await response2.json();
        this.setState({
            myArray: json2
        },()=>{

            if(this.state.myArray[0]!==undefined){
                this.setState({myArrayIsntUndef : true});
            }

        });
    };


    //Axios Post
    postDataToDbAxios() {
        axios.post('http://localhost:3002/api/user/login', {
            email: "123456@gmail.com",
            password: "123456@gmail.com"
        })
            .then(function (response) {
                console.log("axios post then", response);
            })
            .catch(function (error) {
                console.log("axios post then", error);
            });
    }


    //Axios Get (my own endpoints)


    //Axios Delete
    //Axios Update
    //Axios Create


    render() {

        return (
            <div>
                <ul>
                </ul>
            </div>
        );
    }
}


export default App;
