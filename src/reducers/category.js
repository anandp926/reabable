/**
 * Created by rozer on 4/3/2018.
 */
import { CATEGORY } from '../actions/category'



function categories(state=[], action) {
    const {categories} = action
    switch(action.type){
        case CATEGORY:
            return {
                ...state,
                categories
            };
        default:
            return state;
    }
}

export default categories
