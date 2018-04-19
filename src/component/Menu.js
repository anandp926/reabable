/**
 * Created by rozer on 4/9/2018.
 */
import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import Addpost from './Addpost'
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {capitalize} from '../utils/helper'

class Menu extends Component{

    static propTypes = {
        sortType: PropTypes.func.isRequired
    };

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

    render() {
        const {categories, sortType} = this.props;
        return(
            <ul className="Top-nav">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {categories !== 'undefined' && categories.map( (category) =>(
                    <li key={`/${category.path}`}>
                        <Link to={`/${category.path}`}>
                            {capitalize(category.name)}
                        </Link>
                    </li>
                ))}
                <li className="right dropdown">
                    <a>Sort Post By</a>
                        <div className="dropdown-content">
                            <button value="-voteScore" onClick={(e) => sortType(e.target.value)}>UpVote</button>
                            <button value="voteScore" onClick={(e) => sortType(e.target.value)}>DownVote</button>
                            <button value="-timestamp" onClick={(e) => sortType(e.target.value)}>New</button>
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
                    <Addpost modal={this.handleCloseModal} />
                </Modal>
            </ul>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        categories: Object.values(state.categories),
    }
};



export default connect(mapStateToProps)(Menu)
