import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import Post from './component/Post'
import Header from './component/Header'
import Postdetails from './component/Postdetails'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { fetchCategories } from './actions/category'
import { fetchAllPosts } from './actions/posts'
import * as api from './utils/api'

class App extends Component {

    state = {
        sortType: "-timestamp"
    };
    
    componentDidMount () {
        this.props.fetchCategories();
        this.props.fetchAllPosts();
    }
    
    onSort = (value) => {
      this.setState({
          sortType:value
      });
    };

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/" render = {({match}) => (
                        <div>
                            <Header sortType={this.onSort}/>
                            <Post match={match}  sorttype={this.state.sortType} />
                        </div>
                        )}>
                        </Route>
                        <Route exact path="/:category"  render = {({match}) => (
                        <div>
                            <Header sortType={this.onSort}/>
                            <Post match={match} sorttype={this.state.sortType}/>
                        </div>
                        )}>
                        </Route>
                        <Route exact path="/:category/:id" render = {({match}) => (
                        <div>
                            <Header sortType={this.onSort}/>
                            <Postdetails match={match} sorttype={this.state.sortType}/>
                        </div>
                        )}>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        categories: Object.values(state.categories),
    }
};

export const mapDispatchToProps = (dispatch) =>({
    fetchAllPosts: () => api.getAllPosts().then(posts => dispatch(fetchAllPosts(posts))),
    fetchCategories: () => api.getCategory().then(categories => dispatch(fetchCategories(categories)))

});

export default connect(mapStateToProps,mapDispatchToProps)(App);
