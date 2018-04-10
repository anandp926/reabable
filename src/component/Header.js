/**
 * Created by rozer on 3/31/2018.
 */
import React, { Component } from 'react'
import Menu from './Menu'

class Header extends Component{
    
    render() {
        return (
            <div className="Top-header">
                <div className="App-header">
                    <h1 className="App-title">
                        <span className="App-title1">TRICKY</span>
                        <span className="App-title2">NEWS</span>
                        <small className="quotes">Fastest coverage in the world</small>
                    </h1>
                </div>
                <Menu/>
            </div>
        );
    }
}



export default Header;
