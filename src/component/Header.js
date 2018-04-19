/**
 * Created by rozer on 3/31/2018.
 */
import React, { Component } from 'react'
import Menu from './Menu'
import PropTypes from 'prop-types'

class Header extends Component{
    
    static propTypes = {
        sortType: PropTypes.func.isRequired  
    };
    
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
                <Menu sortType={this.props.sortType}/>
            </div>
        );
    }
}



export default Header;
