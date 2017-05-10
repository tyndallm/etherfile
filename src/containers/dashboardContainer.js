import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/dashboardActions';
import Dashboard from '../components/dashboard';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => bindActionCreators(actions,dispatch);

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default DashboardContainer;