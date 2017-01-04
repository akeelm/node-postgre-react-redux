import React from 'react';
import FormStatus from './../forms/FormStatus.js';
import InputText from './../forms/InputText.js';
import { Field, reduxForm } from 'redux-form';

class Login extends React.Component{
  render() {
    const { handleSubmit } = this.props;
    return (
      <form ref="loginForm" className="form-horizontal"
        onSubmit={handleSubmit}>
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-11">
                <div className="bs-component">
                  <legend>Login</legend>
                  <fieldset>

                    <div className="form-group is-empty">
                      <label for="inputEmail" className="col-md-2 control-label">E-mail</label>
                      <div className="col-md-10">
                        <Field type="text" className="form-control" name="email" component="input" placeholder="E-mail"/>
                      </div>
                    </div>

                    <div className="form-group is-empty">
                      <label for="inputPassword" className="col-md-2, control-label">Password</label>
                      <div className="col-md-10">
                        <input type="password" id="inputPassword" className="form-control" ref="password" placeholder="Password"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-md-10 col-md-offset-2">
                        <input className="btn btn-primary" type="submit" />
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
  form: 'contact' // a unique name for this form
})(Login);


export default Login;
