/**
 * Created by rozer on 4/9/2018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as api from '../utils/api'
import { fetchComments } from '../actions/comment'

class Comment extends Component {

    componentDidMount(){
        this.props.fetchComments(this.props.postId);
    }

    render() {
        const {postId, comments} = this.props;
        console.log(this.props);
        return(
            <div>
                {comments.filter((cm) => cm.parentId !== postId ).map((comment) => {
                    return(
                        <div className="Show-comment" key={comment.id}>
                            {comment.body}
                            <div className="Show-comment-button">
                                <button>edit</button>
                                <button>delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        comments: Object.values(state.comments)
    }
}

export const mapDispatchToProps = (dispatch) => ({
    fetchComments: (postId) => api.getComments(postId).then(comments => dispatch(fetchComments(comments)))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
