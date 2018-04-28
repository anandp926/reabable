/**
 * Created by rozer on 4/9/2018.
 */
import React, { Component } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import * as api from '../utils/api'
import PropTypes from 'prop-types'
import TextareaAutosize from 'react-autosize-textarea';
import { addComment, editComment, updateComment } from '../actions/comment'
import { updatePost } from '../actions/posts'
import moment from 'moment'

class Comment extends Component {

    static propTypes ={
        cboxClose: PropTypes.func.isRequired
    };

    state={
        author:"",
        body:"",
        error: false
    };

    componentDidMount(){
        const editComment = this.props.comments[0].filter(comment => comment.id === this.props.cId && comment.deleted === false);
        if(editComment){
            editComment.map(comment => (
                this.setState({
                    author: comment.author,
                    body: comment.body
                })
            ))
        }
    }

    handleInputChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }
    
    formSubmit = (e) =>{
        e.priventDefault()
    };

    pComment = () =>{
        if(this.validate()){
            if(this.props.editCmt){
                const postComment = {
                    timestamp: moment().format('LLL'),
                    body: this.state.body,
                    author: this.state.author
                };
                this.props.editComment({id:this.props.cId, comment:postComment}).then(
                    this.props.updateComment(this.props.cId)
                );
                this.resetForm();
            }else{
                const postComment = {
                    id: uuid(),
                    parentId: this.props.postId,
                    timestamp: Date.now(),
                    body: this.state.body,
                    author: this.state.author
                };
                this.props.addComment(postComment).then(
                    this.props.updatePost(this.props.postId)
                );
                this.resetForm();
            }
        }else{
            this.setState({error:true})
        }
    };

    validate = () => {
        const { author, body } = this.state;
        return author !== '' && body !==  '';
    };

    resetForm = () => {
        this.setState({
            author: '',
            body :''
        })
    };

    render() {
        const { cboxClose} = this.props;

        return(
            <div className="comment-form">
                <form onSubmit={this.formSubmit}>
                    <div className="author-comment">
                        <div className="ac1">
                            <TextareaAutosize
                                placeholder="comment"
                                name="body"
                                className="tarea"
                                value={this.state.body}
                                onChange={ e => this.handleInputChange(e)}
                            />
                        </div>
                        <div className="ac2">
                            <input 
                                type="text" 
                                name="author"
                                value={this.state.author}
                                onChange={e => this.handleInputChange(e)}
                                placeholder="your name"
                                readOnly={this.props.editCmt}
                            />
                            { this.state.error
                                ? <span className="error"><strong>fill all</strong></span>
                                : <span></span>
                            }

                            <button className="cancel" type="button" onClick={() => cboxClose()}>Cancel</button>
                            <button className="post" type="button" onClick={this.pComment}>Post</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export function mapStateToProps(state) {
    return{
        comments: Object.values(state.comments)
    }
}

export function mapDispatchToProps(dispatch) {
    return{
        addComment: (data) => api.addComment(data).then(data => dispatch(addComment(data))),
        editComment: (data) => api.editComment(data).then(data => dispatch(editComment(data))),
        updatePost: (data) => api.getPost(data).then(post => dispatch(updatePost(post))),
        updateComment: (data) => api.getComment(data).then(data => dispatch(updateComment(data)))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Comment)
