/**
 * Created by rozer on 4/5/2018.
 */
import { FETCH_ALLPOSTS } from '../actions/posts'

function posts(state = {}, action) {
    switch (action.type){
        case FETCH_ALLPOSTS:
            return action.posts;
        default:
            return state
    }
}

export default posts
