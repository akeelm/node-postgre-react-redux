import React, {PropTypes} from 'react';

const RenderField = ({ input, placeholder, type, className, meta: { touched, error, warning } }) => (
  <div className="has-error">
    <input {...input} className={className} placeholder={placeholder} type={type} />
    {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-danger">{warning}</span>))}
  </div>
)

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  displayName: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
};

export default RenderField;
