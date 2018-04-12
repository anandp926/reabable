import React, { Component } from 'react';
import '../App.css';
import Post from './Post'
import Header from './Header'
import Postdetails from './Postdetails'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

class App extends Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Header}></Route>
                        <Route path="/:category" component={Header}></Route>
                    </Switch>
                </Router>
                <Router>
                    <Switch>
                        <Route exact path="/:" component={Post}></Route>
                        <Route exact path="/category" component={Post}></Route>
                        <Route exact path="/category/:id" component={Postdetails}></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
