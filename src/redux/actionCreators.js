import {UPDATE_AUTH} from "./constants/actions"
const updateToken = token => ({
    type: UPDATE_AUTH,
    token
});
export {updateToken}
