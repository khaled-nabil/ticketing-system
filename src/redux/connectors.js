import {updateToken, setTokenValidity} from "./actionCreators"

function mapDispatchToProps(dispatch) {
    return {
        updateToken: token => dispatch(updateToken(token)),
        setTokenValidity: authorized => dispatch(setTokenValidity(authorized))
    };
}
const mapStateToProps = state => {
    return {token: state.token, authorized: state.authorized};
};
export {mapDispatchToProps,mapStateToProps}
