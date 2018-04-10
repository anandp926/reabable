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
                    <div className="Body-left">
                        <button className="Post-button">
                            <a href="#newpost">ADD NEW POST</a>
                        </button>
                        <div className="Sort-post">
                            <select name="Sort By">
                                <option hidden="true">Sort by</option>
                                <option value="timestamp">Time</option>
                                <option value="voteScore">Vote</option>
                            </select>
                        </div>
                    </div>
                    <div className="Body-right">
                        <Posts/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
