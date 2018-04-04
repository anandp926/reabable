/**
 * Created by rozer on 4/1/2018.
 */
import * as api from '../utils/api'

export const CATEGORY = 'CATEGORY';

export const getCategories = categories => ({
    type: CATEGORY,
    categories
});


// Fetch categories from API
export const fetchCategories = () => dispatch => (
    api
        .getCategory()
        .then(categories => dispatch(getCategories(categories)))
);

