/**
 * Created by rozer on 3/31/2018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/category'


class Header extends Component{

    componentDidMount () {
       this.props.fetchCategories();
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
                    {categories.map( (category) =>(
                        <li key={category.path}>
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
const mapStateToProps = (state) => ({
    categories: state.categories
});



export default connect(mapStateToProps, {fetchCategories})(Header);
