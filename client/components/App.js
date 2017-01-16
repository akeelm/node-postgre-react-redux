import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/actionCreators';
import Main from './layout/Main';

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

const App = connect(mapStateToProps, dispatch => ({
  actions: actionCreators(dispatch)
}))(Main);

export default App;
