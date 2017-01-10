import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actionCreators from '../actions/actionCreators';
import Main from './Main.js';

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

const App = connect(mapStateToProps, dispatch => ({
  actions: actionCreators(dispatch)
}))(Main);

export default App;
