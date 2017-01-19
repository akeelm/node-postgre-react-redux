import React from 'react';
import FormStatus from './../forms/FormStatus.js';
import InputText from './../forms/InputText.js';
import { Field, reduxForm } from 'redux-form';
import * as validate from './../../constants/validate.js';
import LoadingSpinner from './../forms/LoadingSpinner';
import { connect } from 'react-redux'
import { getFromToken } from './../../actions/userActions';

class Profile extends React.Component{
  handleSubmit(values) {
    return this.props.actions.userActions.updateUser(this.props.user.token, values);
  }
  componentWillUnmount() {
    this.props.actions.userActions.resetUserStatus();
  }
  render() {
    const { handleSubmit, submitting, valid, pristine } = this.props;
    return (
      <form ref="profileForm" className="form-horizontal"
        onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))} >
        <div className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-11">
                <div className="bs-component">
                  <legend>Profile</legend>
                  <fieldset>

                    <InputText placeholder="Id" name="id" validate={validate.required} outerClass="hidden" />

                    <InputText placeholder="First name" name="firstname" validate={validate.required} />

                    <InputText placeholder="Surname" name="surname" validate={validate.required} />

                    <InputText placeholder="E-mail" name="email" validate={[validate.email, validate.required]} />

                    <div className="form-group">
                      <div className="col-md-10 col-md-offset-2">
                        <button className="btn btn-primary pull-left" type="submit" disabled={submitting || !valid || pristine}>Submit</button>
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

Profile = reduxForm({
  form: 'profileForm',
  enableReinitialize: true //Need this because of a rendering error https://github.com/erikras/redux-form/issues/621
})(Profile)

//get the initial values for the form
Profile = connect(
  state => ({
    initialValues: state.user //loaded from the action
  }),
  { load: getFromToken } //action to retrieve initial values
)(Profile)

export default Profile;
