import React from 'react';
import FormStatus from './../forms/FormStatus';
import InputText from './../forms/InputText';
import { Field, reduxForm } from 'redux-form';
import * as validate from './../../constants/validate';
import LoadingSpinner from './../forms/LoadingSpinner';

class Email extends React.Component{
  handleSubmit(values) {
    return this.props.actions.userActions.forgotPassword(values.email);
  }
  componentWillUnmount() {
    this.props.actions.userActions.resetUserStatus();
  }
  render() {
    const {
      handleSubmit, submitting, valid, pristine } = this.props;
    return (
      <form ref="emailSubmitForm" className="form-horizontal"
        onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-11">
                <div className="bs-component">
                  <legend>Forgot password</legend>
                  <fieldset>

                    <InputText placeholder="E-mail" name="email" validate={[validate.email, validate.required]}/>
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

Email = reduxForm({
  form: 'emailSubmitForm',
})(Email);

export default Email;
