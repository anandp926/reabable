/**
 * Created by rozer on 4/3/2018.
 */
import { combineReducers } from 'redux';
import {categories} from './category';
import { posts } from './posts'
import {comments} from './comment'


const rootReducer = combineReducers({
    categories,
    posts,
    comments
});

export default rootReducer;
