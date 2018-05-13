/**
 * Created by rozer on 4/14/2018.
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaCommentO from 'react-icons/lib/fa/comment-o'
import {decrementVote,incrementVote, updatePost} from '../actions/posts'
import * as api from '../utils/api'
import PropTypes from 'prop-types'

class PostControl extends Component {

    static propTypes = {
        onDeletePost: PropTypes.func.isRequired,
        openCommentBox: PropTypes.func.isRequired
    };

    render() {
        const { post, onDeletePost, openCommentBox} = this.props;
        return(
            <div className="Vote-comment">
                <button className="Like"
                        onClick={() => {
                        this.props.incrementVote({id:post.id, vote:"upVote"}).then(
                        this.props.updatePost(post.id)
                        )
                        }}
                >
                    <FaThumbsOUp size={30}/>
                </button>
                <button className="Like"
                        onClick={() => {
                        this.props.decrementVote({id:post.id, vote:"downVote"}).then(
                        this.props.updatePost(post.id)
                        )
                        }}
                >
                    <FaThumbsODown size={30}/>
                </button>
                <button className="Like" onClick={() => openCommentBox(post.id)}>
                    <FaCommentO size={30}/>
                </button>
                <button className="Comment"
                        onClick={() => {
                                onDeletePost(post.id);
                            }
                        }>
                    <FaTrashO size={30}/>
                </button>
            </div>
        )
    }
}

export const mapDispatchToProps = (dispatch) =>({
    incrementVote: (data) => api.votePost(data).then(data => dispatch(incrementVote(data))),
    decrementVote: (data) => api.votePost(data).then(data => dispatch(decrementVote(data))),
    updatePost: (data) => api.getPost(data).then(post => dispatch(updatePost(post))),
});

export default connect(null,mapDispatchToProps)(PostControl)
