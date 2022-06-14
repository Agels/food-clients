import { POST_ADDRESS } from "./constans";

const initalState = {
    address:{}
};
export const addressReducer = (state = initalState, {type, payload}) => {

    switch(type){
        case POST_ADDRESS:
            return {
                ...state,
                address:payload
            }
        default : 
        return state;
    }
}