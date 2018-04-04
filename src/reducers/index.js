/**
 * Created by rozer on 4/3/2018.
 */
import { combineReducers } from 'redux';
import CategoriesReducer from './category';


const rootReducer = combineReducers({
    categories: CategoriesReducer,
});

export default rootReducer;
