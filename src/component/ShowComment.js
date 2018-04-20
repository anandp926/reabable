/**
 * Created by rozer on 4/15/2018.
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { fetchComments, incrementComment, decrementComment, deleteComment } from '../actions/comment'
import * as api from '../utils/api'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'

class ShowComment extends Component {

    static propType = {
        onEditComment: PropTypes.func.isRequired,
    };

    state = {
        box : false,
        cId : ""
    };

    componentDidMount() {
        const id = this.props.pId;
        this.props.fetchComments(id);
    }
  /*  componentDidUpdate(prevProps) {
        if(prevProps.comments !== this.props.comments)
            this.props.fetchComments()
    }
    */

    editBox = (id) => {
        this.setState({
            box : true,
            cId : id
        })
    };

    render() {
        const { comments, pId, onEditComment } = this.props;
        const filterComment = comments.filter((comment) => comment.parentId ===pId && comment.deleted === false);
        return(
            <div className="Comment-Div">
                <hr/>
                { (filterComment.length > 0)
                    ?
                    filterComment.map((comment) => (
                        <div className="Show-comment" key={comment.id}>
                            <p>
                                <span>{comment.author}{" "}</span>
                                {comment.body}
                            </p>
                            <div className="comment-control">
                                <span className="voteScore">{comment.voteScore}</span>
                                <span className="comment-like">
                                    <FaThumbsOUp onClick={() => this.props.incrementComment({id:comment.id,vote:"upVote"})}/>
                                </span>
                                <span className="comment-dislike">
                                    <FaThumbsODown onClick={() => this.props.decrementComment({id:comment.id,vote:"downVote"})}/>
                                </span>
                                <span className="edit" onClick={() => onEditComment(comment.id)}>
                                   <FaEdit/>
                                </span>
                                <span className="delete">
                                    <FaTrashO onClick={() => this.props.deleteComment(comment.id)}/>
                                </span>
                            </div>
                        </div>
                    ))
                    :
                    <div>No Comments</div>
                }
                <hr/>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return{
        posts: Object.values(state.posts),
        comments: Object.values(state.comments)
    }
};

export const mapDispatchToProps = (dispatch) =>({
    fetchComments: (comments) => api.getComments(comments).then(comments => dispatch(fetchComments(comments))),
    incrementComment: (data) => api.voteComment(data).then(data => dispatch(incrementComment(data))),
    decrementComment: (data) => api.voteComment(data).then(data => dispatch(decrementComment(data))),
    deleteComment: (data) => api.deleteComment(data).then(data => dispatch(deleteComment(data)))
});

export default connect(mapStateToProps,mapDispatchToProps)(ShowComment)
