/**
 * Created by rozer on 3/31/2018.
 */
import React, { Component } from 'react'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import { connect } from 'react-redux'
import { fetchAllPosts } from '../actions/posts'
import * as api from '../utils/api'
import Comment from './Comment'

class Post extends Component {

    componentDidMount(){
        this.props.fetchAllPosts();
    }

    render() {
        const { posts } = this.props;
        return (
            <div>
                {posts !== 'undefined' && posts.map((post) => {
                    return(
                        <div className="column" key={post.id}>
                        <div className="card" >
                            <div className="container">
                                <div className="Time">
                                    {post.timestamp}
                                </div>
                                <h4>
                                    <b><a href="#post">{post.title}</a></b>
                                    <small className="Author">By: {post.author}</small>
                                </h4>
                                <p>
                                    {post.body}
                                </p>
                                <div className="Like-comment">
                                    <span className="Like-comment1">{post.voteScore} Likes</span>
                                    <span className="Like-comment2">{post.commentCount} Comments</span>
                                </div>
                                <div className="Vote-comment">
                                    <button className="Like">
                                        <FaThumbsOUp size={30}/>
                                    </button>
                                    <button className="Like">
                                        <FaThumbsODown size={30}/>
                                    </button>
                                    <button className="Like">
                                        <FaCommentO size={30}/>
                                    </button>
                                    <button className="Comment">
                                        <FaTrashO size={30}/>
                                    </button>
                                </div>
                                <Comment postId={post.id}/>
                            </div>
                        </div>
                        </div>
                    )
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        posts: Object.values(state.posts)
    }
};

export const mapDispatchToProps = (dispatch) =>({
    fetchAllPosts: () => api.getAllPosts().then(posts => dispatch(fetchAllPosts(posts)))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
