/**
 * Created by rozer on 3/31/2018.
 */
import React, { Component } from 'react'
import PostControl from './PostControl'
import FaEdit from 'react-icons/lib/fa/edit'
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o'
import { connect } from 'react-redux'
import { deletePost } from '../actions/posts'
import * as api from '../utils/api'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import ShowComment from './ShowComment'
import Modal from 'react-modal'
import Addpost from './Addpost'
import sortBy from 'sort-by'
import Loading from 'react-loading'

class Post extends Component {
    
    state={
        pcId:"",
        commentPId:"",
        editId:"",
        commentId:"",
        editMode:false,
        editCommentMode:false,
        commentBox:false,
        commentBoxEdit:false,
        showComment:false,
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
        
    removePost = (id) =>{
        this.props.deletePost(id);
    };
    
    openComment = (id) => {
        this.setState({
            pcId: id,
            commentBox: true,
            commentBoxEdit: false
        });
    };
    closeComment = () =>{
        this.setState({
            commentBox:false,
            commentBoxEdit: false
        })
    };

    editComment = (id) =>{
        this.setState({
            commentId: id,
            commentBoxEdit: true,
            commentBox: false,
            editCommentMode: true
        })
    };

    parentPostId = (id) =>{
        this.setState({
            commentPId:id,
            showComment:true
        })
    };
    render() {
        const { posts, sorttype, loading } = this.props;
        const filter = this.props.match.params.category || false;
        const allPost = posts[0].filter(post => post.deleted===false).sort(sortBy(sorttype));
        const categoryPost = posts[0].filter(post => post.category === filter && post.deleted === false).sort(sortBy(sorttype));
        const filterPost = (filter === false || filter === undefined)
                         ?  allPost
                         :  categoryPost;
        return (
            <div className="News-body">
                {
                    loading === true
                    ? <Loading delay={200} type='spin' color='#222' className='loading' />
                    : 
                        <div>
                            {filterPost.length > 0
                                ? filterPost !== 'undefined' && filterPost.map((post) => {
                                return(
                                    <div className="column" key={post.id}>
                                        <div className="card" >
                                            <div className="container">
                                                <div className="Time-Edit">
                                            <span className="Time">
                                                {post.timestamp}
                                            </span>
                                            <span className="Edit">
                                                <FaEdit onClick={() => this.handleOpenModal(post.id)}/>
                                            </span>
                                                </div>
                                                <h4>
                                                    <b><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></b>
                                                    <small className="Author">By: {post.author}</small>
                                                </h4>
                                                <p>
                                                    {post.body.split('\n', 1)[0]}
                                                </p>
                                                <div className="Like-comment">
                                                    <span className="Like-comment1">{post.voteScore} Likes</span>
                                            <span className="Like-comment2">
                                                <a onClick={() => this.parentPostId(post.id)}>
                                                    <u>{post.commentCount} Comments</u>
                                                </a>
                                            </span>
                                                </div>
                                                <PostControl post={post} onDeletePost={this.removePost}  openCommentBox={this.openComment}/>
                                                { (this.state.showComment && post.id === this.state.commentPId)
                                                    ? <div>
                                                    <ShowComment pId={this.state.commentPId} onEditComment={this.editComment}/>
                                                    { (this.state.commentBoxEdit)
                                                        ? <Comment cId={this.state.commentId} editCmt={this.state.editCommentMode} cboxClose={this.closeComment} />
                                                        : <div></div>
                                                    }
                                                </div>
                                                    : <div></div>
                                                }

                                                { (this.state.commentBox && post.id === this.state.pcId )
                                                    ? <Comment postId={this.state.pcId}  cboxClose={this.closeComment}/>
                                                    : <div></div>
                                                }

                                            </div>
                                        </div>
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
                                )
                            })
                                : <div>
                                <h1><strong>
                                    <center>Sorry! No Post Found</center>
                                </strong></h1>
                            </div>
                            }
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: Object.values(state.posts)
    }
};

export const mapDispatchToProps = (dispatch) =>({
    deletePost: (data) => api.deletePost(data).then(data => dispatch(deletePost(data)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
