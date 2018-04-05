/**
 * Created by rozer on 4/5/2018.
 */
import * as api from '../utils/api'

export const GET_POSTS = 'GET_POSTS';

export const getAllPosts = posts => ({
    type: GET_POSTS,
    posts
});

export const fetchAllPosts = () => (dispatch) =>{
    api.getAllPosts().then(posts => dispatch(getAllPosts(posts)) )
};
