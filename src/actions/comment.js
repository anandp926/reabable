/**
 * Created by rozer on 4/10/2018.
 */
export const FETCH_COMMENTS = "FETCH_COMMENTS";

export const fetchComments = (comments) => ({
    type: FETCH_COMMENTS,
    comments
});
