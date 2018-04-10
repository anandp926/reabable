/**
 * Created by rozer on 4/3/2018.
 */
import { combineReducers } from 'redux';
import CategoriesReducer from './category';
import PostReducer from './posts'
import CommentReducer from './comment'


const rootReducer = combineReducers({
    categories: CategoriesReducer,
    posts: PostReducer,
    comments: CommentReducer
});

export default rootReducer;
