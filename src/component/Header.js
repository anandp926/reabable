/**
 * Created by rozer on 3/31/2018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/category'


class Header extends Component{

    componentWillMount () {
       this.props.fetchCategories()
    }

    render() {
        const {categories} = this.props;
        return (
            <div className="Top-header">
                <div className="App-header">
                    <h1 className="App-title">
                        <span className="App-title1">TRICKY</span>
                        <span className="App-title2">NEWS</span>
                        <small className="quotes">Fastest coverage in the world</small>
                    </h1>
                </div>
                <ul className="Top-nav">
                    {categories.map( (category, index) =>(
                        <li key={category[index]}>
                            <a href={category.path}>
                                {category.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        categories: state.categories
    }
}



export default connect(mapStateToProps, fetchCategories)(Header);
