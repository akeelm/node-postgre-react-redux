import React from 'react';
import { reduxForm } from 'redux-form';

class Logout extends React.Component{
  componentDidMount() {
    return this.props.actions.userActions.logoutUser();
  }
  render(){
    return (
      <div></div>
    )
  }
};

Logout = reduxForm({
  form: 'logoutForm', 
})(Logout);

export default Logout;
