/**
 * Created by rozer on 3/31/2018.
 */
import React, { Component } from 'react';
import '../App.css';
import Post from './Post'
import Header from './Header'

class Category extends Component {
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
                            <select name="Sort By">sef
                                <option hidden="true">Sort by</option>
                                <option value="timestamp">Time</option>
                                <option value="voteScore">Vote</option>
                            </select>
                        </div>
                    </div>
                    <div className="Body-right">
                        <Post/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;
