/**
 * Created by rozer on 4/12/2018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import FaEdit from 'react-icons/lib/fa/edit'
import ShowComment from './ShowComment'
import Comment from './Comment'

class Postdetails extends Component{

    state = {
        postComment: true,
        editCommentMode: false,
        cmId: ''
    };

    editComment = (id) => {
        this.setState({
            postComment: false,
            editCommentMode:true,
            cmId: id
        });
    };

    closeEditBox = () =>{
        this.setState({
            editCommentMode: false,
            postComment: true
        })
    };

    closeCommentBox = () =>{
        this.setState({
            postComment: true,
        })
    };


    render(){
        const { posts } = this.props;
        const filterCategory = this.props.match.params.category || false;
        const filterId = this.props.match.params.id || false;
        const filterPost = posts.filter(post => (post.id === filterId && post.category === filterCategory && post.deleted === false));

        return(
            <div className="Post-Detail">
                {filterPost.map((post) => (
                    <div className="Post-Detail-container" key={post.id}>
                        <div className="Post-Detail-header">
                            <div className="Time-Edit">
                            <span className="Time">
                                {post.timestamp}
                            </span>
                            <span className="Edit">
                                <FaEdit/>
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
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        posts: Object.values(state.posts)
    }
};

export default connect(mapStateToProps)(Postdetails)
