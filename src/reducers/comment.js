/**
 * Created by rozer on 4/10/2018.
 */
import { FETCH_COMMENTS } from '../actions/comment'

function comments(state = {}, action) {
    switch (action.type) {
        case FETCH_COMMENTS:
            return action.comments
        default:
            return state
    }
}

export default comments
