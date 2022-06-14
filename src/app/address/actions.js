import {POST_ADDRESS} from './constans';

export const postAddress = (address) => {
    return {
        type:POST_ADDRESS,
        payload: address
    }
}