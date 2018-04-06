/**
 * Created by rozer on 4/1/2018.
 */
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token;

if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token
};
export const getCategory = () => {
    return fetch(`${api}/categories`, { headers })
        .then(res => res.json()).then(data => data.categories);
};

export const getAllPosts = () =>{
    return fetch(`${api}/posts`, { headers })
        .then(res => res.json()).then(data => data);
}
