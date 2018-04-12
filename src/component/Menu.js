/**
 * Created by rozer on 4/9/2018.
 */
import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { fetchCategories } from '../actions/category'
import { fetchNewPosts } from '../actions/posts'
import * as api from '../utils/api'
import Addpost from './Addpost'
import uuid from 'uuid'
import FormSerialize from 'form-serialize'
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o'
import { Link } from 'react-router-dom'

class Menu extends Component{

    handleFormSubmit = (event) =>{
        event.preventDefault();
        const value = FormSerialize(event.target, {hash: true});
        const postId = uuid();
        const post = {
            ...value,
            timestamp: Date.now(),
            id: postId
        }

        this.props.fetchNewPosts(post).then(({ post }) => {
            this.props.history.push(`/${post.category}/${post.id}`);
        })

    }

    constructor () {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }
    componentDidMount () {
        this.props.fetchCategories();
    }

    render() {
        const {categories} = this.props;
        return(
            <ul className="Top-nav">
                {categories !== 'undefined' && categories.map( (category) =>(
                    <li key={category.path}>
                        <Link to={category.path}>
                            {category.name}
                        </Link>
                    </li>
                ))}
                <li className="right dropdown">
                    <a>Dropdown</a>
                        <div className="dropdown-content">
                            <a href="time">Link 1</a>
                            <a href="voteup">Link 2</a>
                            <a href="votedown">Link 3</a>
                        </div>
                </li>
                <li className="right Add-new-post"><a onClick={this.handleOpenModal}>Add New Post</a></li>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                >
                    <div className="right">
                        <button className="btncss" onClick={this.handleCloseModal}><FaTimesCircleO size={30}/></button>
                    </div>
                    <Addpost onFormSubmit={this.handleFormSubmit}/>
                </Modal>
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
    fetchCategories: () => api.getCategory().then(categories => dispatch(fetchCategories(categories))),
    fetchNewPosts: (post) => api.addNewPost(post).then(post => dispatch(fetchNewPosts(post)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
