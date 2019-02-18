import {updateToken} from "./actionCreators"

function mapDispatchToProps(dispatch) {
    return {
        updateToken: token => dispatch(updateToken(token))
    };
}
const mapStateToProps = state => {
    return {token: state.token};
};
export {mapDispatchToProps,mapStateToProps}
