/**
 * Created by rozer on 4/11/2018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../style.css'
import uuid from 'uuid'
import {addNewPost, editPost,updatePost} from '../actions/posts'
import * as api from '../utils/api'
import moment from 'moment'

class Addpost extends Component {

    state = {
        author: "",
        title: "",
        body: "",
        category: "",
        error: false
    };

    componentDidMount(){
        const editPost = this.props.posts[0].filter(edpost => edpost.id === this.props.editId && edpost.deleted===false );
        if(editPost){
            editPost.map((post) => (
                this.setState({
                    id:post.id,
                    author:post.author,
                    title:post.title,
                    body:post.body,
                    category:post.category
                })
            ))
        }
    }

    handleInputChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onFormSubmit = (e) =>{
        e.preventDefault();
    };

    validate = () => {
        const { author, title, body, category } = this.state;
        return author !== '' && title !== '' && body !==  '' && category !== '';
    }

    onPost = () => {
        if(this.validate()){
            if(this.props.edit){
                const post = {
                    author: this.state.author,
                    title: this.state.title,
                    body: this.state.body,
                    category: this.state.category
                };
                this.props.editPost({id: this.props.editId,post:post}).then(
                    this.props.updatePost(this.props.editId)
                );
                this.props.modal()
            }else{
                const post = {
                    id: uuid(),
                    timestamp: moment().format('LLL'),
                    author: this.state.author,
                    title: this.state.title,
                    body: this.state.body,
                    category: this.state.category
                };
                this.props.addNewPost(post);
                this.props.modal()
            }
            
        }else {
            this.setState({error:true})
        }
    };

    render() {

        const { categories,edit } = this.props;

        return(
            <div className="container">
                <form onSubmit={ this.onFormSubmit }>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="category">Select Category</label>
                        </div>
                        <div className="col-75">
                            <select name="category"
                                    value={this.state.value}
                                    onChange={e => this.handleInputChange(e)}
                                    disabled={edit}
                            >
                                { categories !== undefined && categories.map(category => {
                                    return(
                                        <option key={category.path} value={category.name}>{category.name}</option>
                                    )
                                })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="aname">Author Name</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="aname" name="author"
                                   value={this.state.author}
                                   onChange={ e => this.handleInputChange(e)}
                                   placeholder="Your name.."
                                   readOnly={edit}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="col-75">
                            <input type="text" id="title" name="title"
                                   value={this.state.title}
                                   onChange={ e => this.handleInputChange(e)}
                                   placeholder="Title of the post.."
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label htmlFor="body">Content</label>
                        </div>
                        <div className="col-75">
                            <textarea id="body" name="body" value={this.state.body}
                                      onChange={ e => this.handleInputChange(e)}
                                      placeholder="Write content.." className="box"
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="row">
                        { this.state.error
                            ? <div className="error"><strong>All fields are mandatory. Please fill them.</strong></div>
                            : <div></div>
                        }
                        <input type="submit" value="POST" onClick={this.onPost}/>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        categories: Object.values(state.categories),
        posts: Object.values(state.posts)
    }
};

function mapDispatchToProps(dispatch) {
    return {
        addNewPost: (post) => api.addNewPost(post).then(post => dispatch(addNewPost(post))),
        editPost: (posts) => api.editPost(posts).then(posts => dispatch(editPost(posts))),
        updatePost: (data) => api.getPost(data).then(post => dispatch(updatePost(post))),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Addpost)
