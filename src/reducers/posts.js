/**
 * Created by rozer on 4/5/2018.
 */
import {
    FETCH_ALLPOSTS,
    ADD_NEW_POST,
    INCREMENT_VOTE,
    DECREMENT_VOTE,
    DELETE_POST,
    EDIT_POST,
    UPDATE_POST
} from '../actions/posts'

export function posts(state = {}, action) {
    const {posts, id,voteScore,post} = action;
    switch (action.type){
        case FETCH_ALLPOSTS:
            return posts;
        case ADD_NEW_POST:
            return {
                ...state,
                posts: action.posts
            };
        case UPDATE_POST:
            return {
                ...state,
                posts: [
                    ...state.posts.filter(post => post.id !== action.post.id),
                ]
            };
        case INCREMENT_VOTE:
            return {
                ...state,
                [id]:{
                    ...state[id],
                    voteScore: voteScore
                },
            };
        case DECREMENT_VOTE:
            return {
                ...state,
                [id]:{...state[id],
                    voteScore: voteScore,
                },
            };
        case DELETE_POST:
            return{
                ...state,
                [id]:{...state[id],
                    deleted: true
                }
            };
        case EDIT_POST:
            return {
                ...state,
                [id]:{...state[id],
                    posts: action.posts
                }
            };

        default:
            return state
    }
}

