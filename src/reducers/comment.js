/**
 * Created by rozer on 4/10/2018.
 */
import { FETCH_COMMENTS } from '../actions/comment'

function comments(state = [], action) {
    const { comments } = action;
    switch (action.type) {
        case FETCH_COMMENTS:
            return {
                ...state,
                comments: comments.reduce((accu, curr) => {
                    accu[curr.id] = curr;
                    return accu;
                }, {})
            }
        default:
            return state
    }
}

export default comments
