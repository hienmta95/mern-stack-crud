import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEM_LOADING, GET_ITEM, EDIT_ITEM } from './types';
import axios from 'axios';

export const getItems = () => dispatch => {
    dispatch(setItemLoading());
    axios.get('/api/items')
    .then(res => 
        dispatch({ 
            type: GET_ITEMS,
            payload: res.data
        })
    )
};

export const getItem = (id) => dispatch => {
    axios.get(`/api/item/${id}`)
    .then(res => 
        dispatch({ 
            type: GET_ITEM,
            payload: id
        })
    )
};

export const editItem = (id, item) => dispatch => {
    axios.post(`/api/item/${id}`, item)
    .then(res => 
        dispatch({ 
            type: EDIT_ITEM,
            id: id,
            payload: res.data
        })
    )
};

export const deleteItem = (id) => dispatch => {
    axios.delete(`/api/item/${id}`)
    .then(res => dispatch({
        type: DELETE_ITEM,
        payload: id
    }));
};

export const addItem = (item) => dispatch => {
    axios.post('/api/item', item)
    .then(res => dispatch({
        type: ADD_ITEM,
        payload: res.data
    }));
};

export const setItemLoading = () => {
    return {
        type: ITEM_LOADING
    };
};