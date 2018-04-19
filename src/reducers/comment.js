/**
 * Created by rozer on 4/10/2018.
 */
import { 
    FETCH_COMMENTS, 
    ADD_NEW_COMMENT,
    INCREMENT_COMMENT,
    DECREMENT_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT
} from '../actions/comment'

export function comments(state = {}, action) {
    const { id, voteScore, comments } = action;
    switch (action.type) {
        case FETCH_COMMENTS:
            return comments;
        case ADD_NEW_COMMENT:
            return {
                ...state,
                comments:action.comments
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
                }
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

