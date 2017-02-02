import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/actionCreators';
import Main from './layout/Main';

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
    return { actions: actionCreators(dispatch) };
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
