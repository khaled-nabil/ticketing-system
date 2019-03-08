import {UPDATE_AUTH,SET_TOKEN_VALIDITY} from "./constants/actions"
const updateToken = token => ({
    type: UPDATE_AUTH,
    token
});
const setTokenValidity = authorized => ({
    type: SET_TOKEN_VALIDITY,
    authorized
});
export {updateToken, setTokenValidity}
