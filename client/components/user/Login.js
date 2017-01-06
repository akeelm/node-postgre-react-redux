import React from 'react';
import FormStatus from './../forms/FormStatus.js';
import InputText from './../forms/InputText.js';
import { Field, reduxForm } from 'redux-form';
import * as validate from './../../constants/validate.js';

class Login extends React.Component{
  handleSubmit(values) {
    this.props.loginUser(values.email, values.password);
  }
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form ref="loginForm" className="form-horizontal"
        onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-11">
                <div className="bs-component">
                  <legend>Login</legend>
                  <fieldset>

                    <InputText placeholder="E-mail" name="email" validate={[validate.email, validate.required]}/>

                    <InputText placeholder="Password" name="password" validate={validate.required} type="password"/>

                    <div className="form-group">
                      <div className="col-md-10 col-md-offset-2">
                        <button className="btn btn-primary" type="submit" disabled={submitting}>Submit</button>
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

Login = reduxForm({
  form: 'loginForm', // a unique name for this form
  touchOnBlue: false,
  touchOnChange: false
})(Login);


export default Login;