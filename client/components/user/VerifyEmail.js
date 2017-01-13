import React from 'react';
import FormStatus from './../forms/FormStatus.js';
import { Field, reduxForm } from 'redux-form';
import LoadingSpinner from './../forms/LoadingSpinner';

class VerifyEmail extends React.Component{
  componentDidMount() {
    return this.props.actions.userActions.validateUserEmail(this.props.params.code);
  }
  componentWillUnmount() {
    this.props.actions.userActions.resetUserStatus();
  }
  render() {
    const { handleSubmit, submitting, valid, pristine } = this.props;
    return (
      <form ref="verifyForm" className="form-horizontal">
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-11">
                <div className="bs-component">
                  <legend>E-mail verification</legend>
                  <fieldset>

                    <div className="form-group">
                      <div className="col-md-12 col-md-offset-2">
                        <LoadingSpinner {... {submitting: submitting } } />
                      </div>
                    </div>

                    <FormStatus {...
                      {status: this.props.user.status,
                      statusText: this.props.user.statusText,
                      colClass: 'col-md-12'} } />

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

VerifyEmail = reduxForm({
  form: 'verifyEmailForm', // a unique name for this form
})(VerifyEmail);

export default VerifyEmail;
