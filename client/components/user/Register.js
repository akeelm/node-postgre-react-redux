import React from 'react';

class Register extends React.Component{
  constructor(props) {
    super(props);
    this.state = {"showHideLogin":"hidden", "blockScreen":"hidden"};
  }
  toggleLoginBox() {
    console.log('toggling visibility');
    let css = (this.state.showHideLogin === "hidden") ? "login-box show" : "hidden";
    this.setState({"showHideLogin":css})
    this.toggleBlockScreen();
  }
  toggleBlockScreen(){
    console.log('block ' + this.state.blockScreen);
    let css = (this.state.blockScreen === "hidden") ? "block-screen" : "hidden";
    this.setState({"blockScreen":css});
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.refs);
    const firstname = this.refs.firstname.value;
    const surname = this.refs.surname.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.props.register(firstname, surname, email, password);
  }
  render() {
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-11">
              <div className="bs-component">
                <legend>Register</legend>
                <form ref="loginForm" className="form-horizontal"
                  onSubmit={this.handleSubmit.bind(this)}>
                  <fieldset>

                    <div className="form-group is-empty">
                      <label for="inputFirstname" className="col-md-2 control-label">First name</label>
                      <div className="col-md-10">
                        <input type="text" id="inputFirstname" className="form-control" ref="firstname" placeholder="First name"/>
                      </div>
                    </div>

                    <div className="form-group is-empty">
                      <label for="inputSurname" className="col-md-2 control-label">Surname</label>
                      <div className="col-md-10">
                        <input type="text" id="inputSurname" className="form-control" ref="surname" placeholder="Surname"/>
                      </div>
                    </div>

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

                    <div className="form-group is-empty">
                      <label for="inputConfirmPassword" className="col-md-2 control-label">Confirm Password</label>
                      <div className="col-md-10">
                        <input type="password" id="inputConfirmPassword" className="form-control" ref="confirmpassword" placeholder="Confirm Password"/>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-md-10 col-md-offset-2">
                        <input className="btn btn-primary" type="submit" />
                      </div>
                    </div>
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

export default Register;
