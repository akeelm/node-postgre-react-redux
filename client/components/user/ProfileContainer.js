import React from 'react';
import Profile from './Profile';
import ResetPassword from './ResetPassword';

class ProfileContainer extends React.Component{
  render() {
    return (
      <div>
        <Profile form="profileForm" {...this.props}/>
        <ResetPassword form="resterPasswordForm" {...this.props}/>
      </div>
    )
  }
}

export default ProfileContainer;
