import { ADD_ITEM, REMOVE_ITEM, CANCEL_ORDER } from "./constans";

export const addItem = (item) => {
    return {
        type:ADD_ITEM,
        payload : {
            item: {
                ...item,
                product:item.product || item
            }
        }
    }
}

export const removeItem = (item) => {
    return {
        type:REMOVE_ITEM,
        payload : {
            item: item
            }
        }
    }

export const cancelOrder = () => {
    return {
        type:CANCEL_ORDER, 
    }
}