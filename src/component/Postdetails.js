/**
 * Created by rozer on 4/12/2018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o'
import ShowComment from './ShowComment'
import Comment from './Comment'
import PostControl from './PostControl'
import * as api from '../utils/api'
import {deletePost} from '../actions/posts'
import Modal from 'react-modal'
import Addpost from './Addpost'
import { Link } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AddComment from 'material-ui/svg-icons/editor/insert-comment';
import Divider from 'material-ui/Divider';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    }
};

class UiButton extends Component{

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
            <div className="topMargin">
                { filterPost.length > 0
                    ? filterPost.map((post) => (
                    <div className="Material-Card" key={post.id}>
                        <MuiThemeProvider>
                            <Card style={{textAlign:'left'}}>
                                <div style={styles.root}>
                                    <div className="Vote">
                                        <PostControl post={post} openCommentBox={this.openComment}/>
                                    </div>
                                    <div className="Post">
                                        <div style={styles.root}>
                                            <CardHeader
                                                title={post.timestamp}
                                                subtitle={`Author:- ${post.author}`}
                                            />
                                            <IconMenu
                                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                                className="IconMenu"
                                            >
                                                <MenuItem primaryText="Edit" onClick={() => this.handleOpenModal(post.id)}/>
                                                <MenuItem primaryText="Delete" onClick={() => this.removePost(post.id)}/>
                                            </IconMenu>
                                        </div>
                                        <CardTitle title={post.title}
                                                   style={{paddingBottom:0, paddingTop:0}}
                                        />
                                        <CardText style={{paddingTop:0}}>
                                            {post.body}
                                        </CardText>
                                        <CardActions>
                                            <AddComment style={{cursor:'pointer'}} onClick={() => this.openComment(post.id)}/>
                                            <a
                                                style={{color:'blue', textDecoration:'underline', fontSize:13}}
                                            >
                                                {post.commentCount} comments
                                            </a>
                                        </CardActions>
                                    </div>
                                </div>
                                <Divider />
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
                            </Card>
                        </MuiThemeProvider>
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

export default connect(mapStateToProps, mapDispatchToProps)(UiButton)
