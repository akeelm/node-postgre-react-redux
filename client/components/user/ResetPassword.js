import React from 'react';
import FormStatus from './../forms/FormStatus';
import InputText from './../forms/InputText';
import { Field, reduxForm } from 'redux-form';
import * as validate from './../../constants/validate';
import LoadingSpinner from './../forms/LoadingSpinner';
import { connect } from 'react-redux'
import { getFromToken } from './../../actions/userActions';

class ResetPassword extends React.Component{
  handleSubmit(values) {
    return this.props.actions.userActions.updateUser(this.props.user.token, values);
  }
  componentWillUnmount() {
    this.props.actions.userActions.resetUserStatus();
  }
  render() {
    const {
      fields: { password, confirmPassword },
      handleSubmit, submitting, valid, pristine, actions } = this.props;
    return (
      <form ref="resetPasswordForm" className="form-horizontal"
        onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-11">
                <div className="bs-component">
                  <legend>Reset password</legend>
                  <fieldset>

                    <InputText placeholder="Id" name="id" validate={validate.required} outerClass="hidden" />

                    <InputText placeholder="Password" name="password" validate={validate.required} type="password" />

                    <InputText placeholder="Confirm password" name="confirmPassword" validate={[validate.required, validate.validateConfirm]} type="password" />

                    <div className="form-group">
                      <div className="col-md-10 col-md-offset-2">
                        <button className="btn btn-primary pull-left" type="submit" disabled={pristine || submitting || !valid}>Submit</button>
                        <LoadingSpinner {... {submitting: submitting } } />
                      </div>
                    </div>

                    <FormStatus {...this.props.user} />

                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
};

ResetPassword = reduxForm({
  fields: [
    'password', 'confirmPassword'
  ],
  validate: validate.validateConfirm,
  enableReinitialize: true //Need this because of a rendering error https://github.com/erikras/redux-form/issues/621
})(ResetPassword);

ResetPassword = connect(
  state => ({
    initialValues: state.user //loaded from the action
  }),
  { load: getFromToken } //action to retrieve initial values
)(ResetPassword)

export default ResetPassword;
