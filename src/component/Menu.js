/**
 * Created by rozer on 4/9/2018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/category'
import * as api from '../utils/api'

class Menu extends Component{

    componentDidMount () {
        this.props.fetchCategories();
    }

    render() {
        const {categories} = this.props;
        return(
            <ul className="Top-nav">
                {categories !== 'undefined' && categories.map( (category) =>(
                    <li key={category.path}>
                        <a href={category.path}>
                            {category.name}
                        </a>
                    </li>
                ))}
            </ul>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        categories: Object.values(state.categories)
    }
};

export const mapDispatchToProps = (dispatch) =>({
    fetchCategories: () => api.getCategory().then(categories => dispatch(fetchCategories(categories)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
