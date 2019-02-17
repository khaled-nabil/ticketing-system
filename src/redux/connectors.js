import {updateToken} from "./actionCreators"

function mapDispatchToProps(dispatch) {
    return {
        updateToken: resource => dispatch(updateToken(resource))
    };
}
const mapStateToProps = state => {
    return {token: state.token};
};
export {mapDispatchToProps,mapStateToProps}
