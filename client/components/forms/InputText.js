import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from './RenderField.js';

const InputText = (props) => (
  <div className="form-group is-empty">
    <label className="col-md-2 control-label">
      {props.placeholder}
    </label>
    <div className="col-md-10">
      <Field type={ (props.type) ? props.type : 'text' } className="form-control" name={props.name}
        component={RenderField} placeholder={props.placeholder}
        validate={props.validate} />
    </div>
  </div>
);

export default InputText;
