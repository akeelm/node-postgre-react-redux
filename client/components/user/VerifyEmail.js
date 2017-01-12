import React from 'react';
import FormStatus from './../forms/FormStatus.js';
import { Field, reduxForm } from 'redux-form';
import LoadingSpinner from './../forms/LoadingSpinner';

class VerifyEmail extends React.Component{
  handleSubmit(values) {
    return this.props.actions.userActions.validateUserEmail(this.props.params.code);
  }
  render() {
    const { handleSubmit, submitting, valid, pristine } = this.props;
    return (
      <form ref="verifyForm" className="form-horizontal"
        onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-11">
                <div className="bs-component">
                  <legend>Verify E-mail</legend>
                  <fieldset>

                    <div className="form-group">
                      <div className="col-md-12 col-md-offset-2">
                        <p> <span className="clear h4">Please click submit to finish verifying your account</span> </p>
                        {this.props.handleSubmit(handleSubmit.bind(this))}
                        <button className="btn btn-primary pull-left" type="submit" disabled={submitting}>Submit</button>
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

VerifyEmail = reduxForm({
  form: 'verifyEmailForm', // a unique name for this form
})(VerifyEmail);

export default VerifyEmail;
