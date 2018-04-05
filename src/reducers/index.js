/**
 * Created by rozer on 4/3/2018.
 */
import { combineReducers } from 'redux';
import CategoriesReducer from './category';
import PostReducer from './posts'


const rootReducer = combineReducers({
    categories: CategoriesReducer,
    posts: PostReducer
});

export default rootReducer;
