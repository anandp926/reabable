/**
 * Created by rozer on 4/12/2018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import FaEdit from 'react-icons/lib/fa/edit'
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o'
import ShowComment from './ShowComment'
import Comment from './Comment'
import PostControl from './PostControl'
import * as api from '../utils/api'
import {deletePost} from '../actions/posts'
import Modal from 'react-modal'
import Addpost from './Addpost'
import { Link } from 'react-router-dom'

class Postdetails extends Component{

    state = {
        postComment: true,
        editCommentMode: false,
        cmId: '',
        editId: '',
        editMode: false
    };

    constructor () {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal (id) {
        this.setState({
            showModal: true,
            editId: id,
            editMode:true
        });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    editComment = (id) => {
        this.setState({
            postComment: false,
            editCommentMode:true,
            cmId: id
        });
    };

    removePost = (id) =>{
        this.props.deletePost(id);
    };

    closeEditBox = () =>{
        this.setState({
            editCommentMode: false,
            postComment: true
        })
    };

    closeCommentBox = () =>{
        this.setState({
            postComment: false
        })
    };

    openComment = () => {
        this.setState({
            postComment: true,
            editCommentMode: false
        });
    };

    render(){
        const { posts } = this.props;
        const filterCategory = this.props.match.params.category || false;
        const filterId = this.props.match.params.id || false;
        const filterPost = posts[0].filter(post => (post.id === filterId && post.category === filterCategory && post.deleted === false));

        return(
            <div className="Post-Detail">
                { filterPost.length > 0
                  ? filterPost.map((post) => (
                    <div className="Post-Detail-container" key={post.id}>
                        <div className="Post-Detail-header">
                            <div className="Time-Edit">
                            <span className="Time">
                                {post.timestamp}
                            </span>
                            <span className="Edit">
                                <FaEdit onClick={() => this.handleOpenModal(post.id)}/>
                            </span>
                            </div>
                            <h1>
                                {post.title}
                                <small>
                                    <u>
                                        <span>Author:</span>{" "}{post.author}
                                    </u>
                                </small>
                            </h1>
                        </div>
                        <hr/>
                        <div className="Post-Detail-body">
                            <p>
                                {post.body}
                            </p>
                        </div>
                        <PostControl post={post} onDeletePost={this.removePost} openCommentBox={this.openComment}/>
                        <hr/>
                        <div className="Post-Detail-footer">
                            <h5>{post.voteScore} likes</h5>
                            <span><u>{post.commentCount} comments</u></span>
                        </div>
                        { this.state.editCommentMode
                            ? <Comment cId={this.state.cmId} editCmt={this.state.editCommentMode} cboxClose={this.closeEditBox}/>
                            : <div></div>
                        }
                        {
                            this.state.postComment
                            ? <Comment postId={filterId}  cboxClose = {this.closeCommentBox}/>
                            : <div></div>
                        }
                        
                        <ShowComment pId={filterId} onEditComment={this.editComment}/>
                        <Modal
                            isOpen={this.state.showModal}
                            onRequestClose={this.handleCloseModal}
                            className="Modal"
                        >
                            <div className="right">
                                <button className="btncss" onClick={this.handleCloseModal}><FaTimesCircleO size={30}/></button>
                            </div>
                            <Addpost modal={this.handleCloseModal} edit={this.state.editMode} editId={this.state.editId} />
                        </Modal>
                    </div>
                ))
                : <div>
                    <h1><strong>
                        <center>NO Post Found</center>
                    </strong></h1>
                    <center>
                        Go Back To <Link to="/">Home</Link>
                    </center>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        posts: Object.values(state.posts)
    }
};

export const mapDispatchToProps = (dispatch) =>({
    deletePost: (data) => api.deletePost(data).then(data => dispatch(deletePost(data)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Postdetails)
