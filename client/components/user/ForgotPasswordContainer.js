import React from 'react';
import Email from './Email';
import ResetPassword from './ResetPassword';
import { validateForgotPasswordCode } from './../../actions/userActions';
import { connect } from 'react-redux'

class ForgotPasswordContainer extends React.Component{
  componentDidMount() {
    if (this.props.params.code) { this.props.actions.userActions.validateForgotPasswordCode(this.props.params.code); }
  }
  resetPasswordSubmit(values, dispatch, props) {
    if (values.password) { return props.actions.userActions.resetPassword(props.params.code, values); }
  }
  render() {
    return (
      <div>
        {
          (this.props.params.code)

          ?

          <ResetPassword form="resetPasswordForm" {...this.props} onSubmit={this.resetPasswordSubmit} loadAction={validateForgotPasswordCode}/>

          :

          <Email {...this.props}/>
        }
      </div>
    )
  }
}

ForgotPasswordContainer = connect(
  (state, ownProps) => ({
    initialValues: state.user, //loaded from the action
  }),
)(ForgotPasswordContainer)

export default ForgotPasswordContainer;
