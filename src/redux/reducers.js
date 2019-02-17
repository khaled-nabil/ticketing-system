import {UPDATE_AUTH} from "./constants/actions"

const initialState = {
    token: ""
};
const authToken = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_AUTH:
            return action.token;
        default:
            return state
    }
}

export default authToken
