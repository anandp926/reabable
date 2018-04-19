/**
 * Created by rozer on 4/10/2018.
 */
export const FETCH_COMMENTS = "FETCH_COMMENTS";
export const ADD_NEW_COMMENT ="ADD_NEW_COMMENT";
export const INCREMENT_COMMENT = "INCREMENT_COMMENT";
export const DECREMENT_COMMENT = "DECREMENT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";

export const fetchComments = (comments) => ({
    type: FETCH_COMMENTS,
    comments
});

export const addComment = (comments) => ({
    type: ADD_NEW_COMMENT,
    comments
});

export const incrementComment = ({id,voteScore}) => ({
    type: INCREMENT_COMMENT,
    id,
    voteScore
});

export const decrementComment = ({id,voteScore}) => ({
    type: DECREMENT_COMMENT,
    id,
    voteScore
});

export const deleteComment = ({id})  => ({
    type: DELETE_COMMENT,
    id
});

export const editComment = ({id,comments}) => ({
    type: EDIT_COMMENT,
    id,
    comments
});
