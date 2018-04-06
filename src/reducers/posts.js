/**
 * Created by rozer on 4/5/2018.
 */
import { GET_POSTS } from '../actions/posts'

function posts(state = {}, action) {
    switch (action.type){
        case GET_POSTS:
            return action.posts;
        default:
            return state;
    }
}

export default posts
