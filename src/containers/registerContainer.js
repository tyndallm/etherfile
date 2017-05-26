import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actions from '../actions/registerActions';
import Register from '../components/register';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
    return {
        register: bindActionCreators(actions,dispatch),
        push: bindActionCreators(push, dispatch)
    }
}

const RegisterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

export default RegisterContainer;