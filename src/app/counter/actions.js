import { INCREMENT, DECREMENT } from "./constans";

export const increment = (val) => {
    return {
        type:INCREMENT,
        cartQty : val
    }
}

export const decrement = (val) => {
    return {
        type:DECREMENT,
        cartQty:val
    }
}