/**
 * Created by rozer on 4/15/2018.
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {
    fetchComments,
    incrementComment,
    decrementComment,
    deleteComment,
    updateComment
} from '../actions/comment'
import * as api from '../utils/api'
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up'
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'
import Loading from 'react-loading'

class ShowComment extends Component {

    static propType = {
        onEditComment: PropTypes.func.isRequired,
    };

    state = {
        box : false,
        cId : "",
        loadingComment: false
    };

    componentDidMount() {
        this.setState(() => ({ loadingComment: true }));
        const id = this.props.pId;
        this.props.fetchComments(id).then(() => {
            this.setState({
                loadingComment: false
            })
        });
    }

    editBox = (id) => {
        this.setState({
            box : true,
            cId : id
        })
    };
    
    render() {
        const { comments, pId, onEditComment } = this.props;
        const filterComment = comments[0].filter((comment) => comment.parentId ===pId && comment.deleted === false);
        return(
            <div className="Comment-Div">
                <hr/>
                {
                    this.state.loadingComment === true
                    ? <Loading delay={200} type='spin' color='#222' className='loading' />
                    :
                        <div>
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
                                    <FaThumbsOUp
                                        onClick={() => {
                                        this.props.incrementComment({id:comment.id,vote:"upVote"}).then(
                                        this.props.updateComment(comment.id)
                                        )
                                        }}
                                    />
                                </span>
                                <span className="comment-dislike">
                                    <FaThumbsODown
                                        onClick={() => {
                                        this.props.decrementComment({id:comment.id,vote:"downVote"}).then(
                                        this.props.updateComment(comment.id)
                                        )
                                        }}
                                    />
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
                        </div>
                }
                <hr/>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return{
        comments: Object.values(state.comments)
    }
};

export const mapDispatchToProps = (dispatch) =>({
    fetchComments: (comments) => api.getComments(comments).then(comments => dispatch(fetchComments(comments))),
    incrementComment: (data) => api.voteComment(data).then(data => dispatch(incrementComment(data))),
    decrementComment: (data) => api.voteComment(data).then(data => dispatch(decrementComment(data))),
    deleteComment: (data) => api.deleteComment(data).then(data => dispatch(deleteComment(data))),
    updateComment: (data) => api.getComment(data).then(data => dispatch(updateComment(data)))
});

export default connect(mapStateToProps,mapDispatchToProps)(ShowComment)
