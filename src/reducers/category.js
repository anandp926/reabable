/**
 * Created by rozer on 4/3/2018.
 */
import { FETCH_CATEGORIES } from '../actions/category'


function categories(state = {}, action) {
    switch (action.type){
        case FETCH_CATEGORIES:
            return action.categories;
        default:
            return state
    }
}
export default categories
