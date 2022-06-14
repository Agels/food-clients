import {ADD_ITEM,REMOVE_ITEM, CANCEL_ORDER} from './constans';
const fromLocalStorage = localStorage.getItem("charts");
const intialState =  fromLocalStorage ? JSON.parse(fromLocalStorage) : [];

export const chartReducer = (state = intialState, {type, payload}) => {
    switch(type){
        case ADD_ITEM:
           if(state.find(items => items._id === payload.item._id)){
            return state.map((items) => ({
                ...items,
                qty: items._id === payload.item._id ? items.qty + 1 : items.qty,
              }));
           } else {
             
               return [
                   ...state,{
                       ...payload.item,
                       qty: 1
                   }
               ]
           }
       case REMOVE_ITEM:
          let cek = state.find(items => items._id === payload.item._id );
        if(cek.qty  <= 1){
            return state.filter((item) => item._id !== payload.item._id)
           
        } else {
           return state.map((items) => ({
              ...items,
              qty: items._id === payload.item._id ? items.qty  - 1 : items.qty,
            }));
        }
        
        case CANCEL_ORDER:
            return [];
        default :
           return state
    }

}