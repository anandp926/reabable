import React, { Component } from 'react';
import '../App.css';
import Posts from './Posts'
import Header from './Header'

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="News-body">
                    <div className="row">
                        <Posts/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
