/**
 * Created by rozer on 4/5/2018.
 */

export const FETCH_ALLPOSTS = "FETCH_ALLPOSTS";
export const ADD_NEW_POST = "ADD_NEW_POST";
export const INCREMENT_VOTE = "INCREMENT_VOTE";
export const DECREMENT_VOTE = "DECREMENT_VOTE";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";

export const fetchAllPosts = posts => ({
    type: FETCH_ALLPOSTS,
    posts
});

export const addNewPost = (posts) => ({
    type: ADD_NEW_POST,
    posts
});

export function incrementVote ({ id, voteScore }) {
    return {
        type: INCREMENT_VOTE,
        id, 
        voteScore
    }
}

export const decrementVote = ({id, voteScore}) =>({
    type: DECREMENT_VOTE,
    id,
    voteScore
});

export const deletePost = (id) =>({
    type: DELETE_POST,
    id
});

export const editPost = ({id,posts}) => ({
   type: EDIT_POST,
    id,
    posts
});
