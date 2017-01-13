import React from 'react';

export const FormStatus = (props) => {
    let alertType = (props.status >= 400) ? "danger" : "info";
    let colClass = (!props.colClass) ? ' col-md-10 col-md-offset-2' : props.colClass;
    let alertClass =
    (props.statusText) ?
    `alert alert-${alertType} ${colClass}` :
    '';
    return (
      <div className="form-group">
        <div className={alertClass}>{props.statusText}</div>
      </div>
    )
};

export default FormStatus;
