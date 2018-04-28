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

export function posts(state = {posts: []}, action) {
    const { posts,id,voteScore} = action;
    switch (action.type){
        case FETCH_ALLPOSTS:
            return {
                ...state,
                posts: posts
            };
        case ADD_NEW_POST:
            return {
                ...state,
                posts: [
                    ...state.posts.concat(action.post)
                ]
            };
        case UPDATE_POST:
            return {
                ...state,
                posts: [
                    ...state.posts.filter(post => post.id !== action.post.id),
                    action.post
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
                [id]:{
                    ...state[id],
                    deleted: true,
                },
                posts:[
                    ...state.posts.filter(post =>post.id !== id)
                ]
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

