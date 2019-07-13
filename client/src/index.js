import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from "./Components/Login";
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    render() {
        return (
            <div>
                <Login/>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));


App.propTypes = {};

export default App;
