/**
 * Created by rozer on 4/5/2018.
 */
import {  } from 'react-redux'
import { FETCH_ALLPOSTS, FETCH_NEWPOSTS } from '../actions/posts'

function posts(state = {}, action) {
    const {posts, post} = action;
    switch (action.type){
        case FETCH_ALLPOSTS:
            return posts;
        case FETCH_NEWPOSTS:
            return {
                ...state,
                posts: state.posts.concat(post)
            };
        default:
            return state
    }
}

export default posts
