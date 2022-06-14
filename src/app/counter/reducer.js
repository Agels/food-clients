import {INCREMENT, DECREMENT} from './constans';

const initialState = {
    cartQty:0
}

const counterReducer = (state = initialState, action) => {

    switch(action.type){
        case INCREMENT:
            return {
                ...state,
                cartQty: + 1
            }
        case DECREMENT:
            return {
               ...state,
                cartQty: - 1
            }
        default:
            return state;
    }

}
export default counterReducer;