import React, {PropTypes} from 'react';

const RenderField = ({
  input,
  placeholder,
  type,
  value,
  test,
  className,
  meta: { touched, error, warning } }) => (
  <div className="has-error">
    <input {...input}
      className={className}
      placeholder={placeholder}
      type={type}
    />
    {touched &&
      (
        (
          error && Object.keys(error).length > 0 &&
          <span className="text-danger">{error.valueOf()}</span>
        )
        ||
        (warning && <span className="text-danger">{warning}</span>)
      )
    }
  </div>
)

RenderField.propTypes = {
  input: PropTypes.object.isRequired,
  displayName: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
};

export default RenderField;
