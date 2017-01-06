import { bindActionCreators } from 'redux';
import * as UserActions from './userActions';

const actionCreators = {
  userActions: UserActions,
};

// export default actionCreators;

export default dispatch => {
  let bound = {};

  Object.keys(actionCreators).forEach(key =>
    bound[key] = bindActionCreators(actionCreators[key], dispatch)
  );

  return bound;
};
