import React from 'react';
import FormStatus from './../forms/FormStatus.js';

class Login extends React.Component{
  constructor(props) {
    super(props);
  }
  handleSubmit(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.props.loginUser(email, password);
  }
  render() {
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-11">
              <div className="bs-component">
                <legend>Login</legend>
                <form ref="loginForm" className="form-horizontal"
                  onSubmit={this.handleSubmit.bind(this)}>
                  <fieldset>

                    <div className="form-group is-empty">
                      <label for="inputEmail" className="col-md-2 control-label">E-mail</label>
                      <div className="col-md-10">
                        <input type="text" id="inputEmail" className="form-control" ref="email" placeholder="E-mail"/>
                      </div>
                    </div>

                    <div className="form-group is-empty">
                      <label for="inputPassword" className="col-md-2 control-label">Password</label>
                      <div className="col-md-10">
                        <input type="password" id="inputPassword" className="form-control" ref="password" placeholder="Password"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-md-10 col-md-offset-2">
                        <input className="btn btn-primary" type="submit" />
                      </div>
                    </div>

                    <FormStatus {...this.props} />

                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Login;
