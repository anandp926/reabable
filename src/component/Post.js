/**
 * Created by rozer on 3/31/2018.
 */
import React,{ Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AddComment from 'material-ui/svg-icons/editor/insert-comment';
import Divider from 'material-ui/Divider';
import Modal from 'react-modal'
import Addpost from './Addpost'
import sortBy from 'sort-by'
import Loading from 'react-loading'
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { deletePost } from '../actions/posts'
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o'
import ShowComment from './ShowComment'
import Comment from './Comment'
import PostControl from './PostControl'
import { Link } from 'react-router-dom'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    }
};

class Post extends Component {

    state = {
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

        return(
            <div>
                {
                    loading === true
                        ? <Loading delay={200} type='spin' color='#222' className='loading' />
                        :
                        <div className="topMargin">
                            {filterPost.length > 0
                                ? filterPost !== 'undefined' && filterPost.map((post) => {
                                return (
                                    <div className="Material-Card" key={post.id}>
                                        <MuiThemeProvider>
                                            <Card style={{textAlign:'left'}}>
                                                <div style={styles.root}>
                                                    <div className="Vote">
                                                        <PostControl post={post}/>
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
                                                        <CardTitle title={<Link to={`/${post.category}/${post.id}`}>{post.title}</Link>}
                                                                   style={{paddingBottom:0, paddingTop:0}}
                                                        />
                                                        <CardText style={{paddingTop:0}}>
                                                            {post.body.split('\n', 1)[0]}
                                                        </CardText>
                                                        <CardActions>
                                                            <AddComment style={{cursor:'pointer'}} onClick={() => this.openComment(post.id)}/>
                                                            <a onClick={() => this.parentPostId(post.id)}
                                                               style={{cursor:'pointer', color:'blue', textDecoration:'underline', fontSize:13}}
                                                            >
                                                                {post.commentCount} comments
                                                            </a>
                                                        </CardActions>
                                                    </div>
                                                </div>
                                                <Divider />
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
                                )
                            })
                                :
                                <div>
                                    <h1><strong>
                                        <center>Sorry! No Post Found</center>
                                    </strong></h1>
                                </div>
                            }
                        </div>
                }
            </div>
        )
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

