/**
 * Created by rozer on 4/14/2018.
 */
import React, { Component } from 'react'
import ArrowDropUp from 'material-ui/svg-icons/navigation/arrow-drop-up'
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down'
import {red500, greenA200} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import {connect} from 'react-redux'
import {decrementVote,incrementVote, updatePost} from '../actions/posts'
import * as api from '../utils/api'

class PostControl extends Component {

    render() {
        const { post} = this.props;
        return(
            <List>
                <ListItem
                    leftIcon={
                          <ArrowDropUp
                          color={greenA200}
                          style={{width:125, height:50}}
                          viewBox="6 9 50 20"/>}
                    onClick={() => {
                        this.props.incrementVote({id:post.id, vote:"upVote"}).then(
                        this.props.updatePost(post.id)
                        )
                        }}
                />
                <ListItem primaryText={post.voteScore} style={{textAlign:'center'}}/>
                <ListItem
                    leftIcon={
                          <ArrowDropDown
                          color={red500}
                          style={{width:125, height:50}}
                          viewBox="6 10 50 20"/>}
                    onClick={() => {
                        this.props.decrementVote({id:post.id, vote:"downVote"}).then(
                        this.props.updatePost(post.id)
                        )
                        }}
                />
            </List>
        )
    }
}

export const mapDispatchToProps = (dispatch) =>({
    incrementVote: (data) => api.votePost(data).then(data => dispatch(incrementVote(data))),
    decrementVote: (data) => api.votePost(data).then(data => dispatch(decrementVote(data))),
    updatePost: (data) => api.getPost(data).then(post => dispatch(updatePost(post))),
});

export default connect(null,mapDispatchToProps)(PostControl)

