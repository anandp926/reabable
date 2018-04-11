/**
 * Created by rozer on 4/5/2018.
 */

export const FETCH_ALLPOSTS = "FETCH_ALLPOSTS";
export const FETCH_NEWPOSTS = "FETCH_NEWPOSTS";

export const fetchAllPosts = posts => ({
    type: FETCH_ALLPOSTS,
    posts
});

export const fetchNewPosts = posts => ({
    type: FETCH_NEWPOSTS,
    posts
})
