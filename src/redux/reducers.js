import {UPDATE_AUTH, SET_TOKEN_VALIDITY} from "./constants/actions"

const initialState = {
    token: "",
    authorized: false
};
const authToken = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_AUTH:
            console.log(UPDATE_AUTH, state, action, {
                token: action.token,
                authorized: state.authorized
            });
            return {
                token: action.token,
                authorized: state.authorized
            };
        case SET_TOKEN_VALIDITY:
            return {
                token: state.token,
                authorized: action.authorized
            };
        default:
            return state
    }
};

export default authToken
