import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEM_LOADING, GET_ITEM, EDIT_ITEM } from '../actions/types';

var initialState = {
    item: '',
    items: [],
    loading: false
} 

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }

        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
            }

        case GET_ITEM:
            return {
                ...state,
                item: state.items.filter(item => item._id === action.payload)[0],
            }

        case EDIT_ITEM:
            state.items.forEach(function(item, index) {
                if(item._id === action.id) {
                    state.items[index] = action.payload
                }
            });
            return {
                ...state
            }

        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }

        case ITEM_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}
