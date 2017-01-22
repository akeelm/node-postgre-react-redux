import React from 'react';
import Profile from './Profile';
import ResetPassword from './ResetPassword';
import { getFromToken } from './../../actions/userActions';

class ProfileContainer extends React.Component{
  resetPasswordSubmit(values, dispatch, props) {
    if (values.password)
    return props.actions.userActions.updateUser(props.user.token, values);
  }
  render() {
    return (
      <div>
        <Profile form="profileForm" {...this.props}/>
        <ResetPassword form="resetPasswordForm" {...this.props} onSubmit={this.resetPasswordSubmit} loadAction={getFromToken}/>
      </div>
    )
  }
}

export default ProfileContainer;
