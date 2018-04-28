/**
 * Created by rozer on 4/10/2018.
 */
import { 
    FETCH_COMMENTS, 
    ADD_NEW_COMMENT,
    INCREMENT_COMMENT,
    DECREMENT_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    UPDATE_COMMENT
} from '../actions/comment'

export function comments(state = {comments: []}, action) {
    const { id, voteScore, comments } = action;
    switch (action.type) {
        case FETCH_COMMENTS:
            return {
                comments: comments
            };
        case ADD_NEW_COMMENT:
            return {
                ...state,
                comments: [
                    ...state.comments.concat(action.comment)
                ]
            };
        case UPDATE_COMMENT:
            return {
                ...state,
                comments: [
                    ...state.comments.filter(comment => comment.id !== action.comment.id),
                    action.comment
                ]
            };
        case INCREMENT_COMMENT:
            return {
                ...state,
                [id]:{
                    ...state[id],
                    voteScore: voteScore
                }
            };
        case DECREMENT_COMMENT:
            return {
                ...state,
                [id]:{...state[id],
                    voteScore: voteScore
                }
            };
        case DELETE_COMMENT:
            return{
                ...state,
                [id]:{...state[id],
                    deleted: true
                },
                comments: [
                    ...state.comments.filter(comment => comment.id !== id),
                ]
            };
        case EDIT_COMMENT:
            return{
                ...state,
                [id]:{...state[id],
                    comments: action.comments
                }
            };
        default:
            return state
    }
}

