const initialState = [];

export const taggsReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case "ADD_TAGS":
            return [payload]
        default:
            return state;
    }
}