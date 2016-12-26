import React from 'react';

class Login extends React.Component{
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
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    this.props.login(username, password);
  }
  render() {
    return (
      <div>
        <span className="login" onClick={this.toggleLoginBox.bind(this)}>login</span>
        <div className={this.state.showHideLogin}>
          <div className="close-button" onClick={this.toggleLoginBox.bind(this)}>X</div>
          <form ref="loginForm"
              onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" className="form-control" ref="username" placeholder="username"/>
              <input type="password" className="form-control" ref="password" placeholder="password"/>
              <input className="btn-std" type="submit" />
          </form>
        </div>
        <div className={this.state.blockScreen}></div>
      </div>
    )
  }
};

export default Login;
