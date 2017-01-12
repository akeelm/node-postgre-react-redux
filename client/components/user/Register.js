import React from 'react';
import FormStatus from './../forms/FormStatus.js';
import InputText from './../forms/InputText.js';
import { Field, reduxForm } from 'redux-form';
import * as validate from './../../constants/validate.js';


class Register extends React.Component{
  handleSubmit(values) {
    return this.props.actions.userActions.registerUser(values.firstname, values.surname, values.email, values.password);
  }
  render() {
    const {
      fields: { password, confirmPassword },
      handleSubmit, submitting, valid, pristine } = this.props;
    return (
      <form ref="registerForm" className="form-horizontal"
        onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-11">
                <div className="bs-component">
                  <legend>Register</legend>
                  <fieldset>

                    <InputText placeholder="First name" name="firstname" validate={validate.required}/>

                    <InputText placeholder="Surname" name="surname" validate={validate.required}/>

                    <InputText placeholder="E-mail" name="email" validate={[validate.email, validate.required]}/>

                    <InputText placeholder="Password" name="password" validate={validate.required} type="password" />

                    <InputText placeholder="Confirm password" name="confirmPassword" validate={[validate.required, validate.validateConfirm]} type="password" />

                    <div className="form-group">
                      <div className="col-md-10 col-md-offset-2">
                        <button className="btn btn-primary" type="submit" disabled={pristine || submitting || !valid}>Submit</button>
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

Register = reduxForm({
  form: 'registerForm',
  fields: [
    'password', 'confirmPassword'
  ],
  validate: validate.validateConfirm
})(Register);


export default Register;
