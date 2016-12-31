import React from 'react';

class FormStatus extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    let alertType = (this.props.user.status >= 400) ? "danger" : "info";
    let alertClass =
    (this.props.user.statusText) ?
    'alert alert-' + alertType + ' col-md-10 col-md-offset-2' :
    '';
    return (
      <div className="form-group">
        <div className={alertClass}>{this.props.user.statusText}</div>
      </div>
    )
  }
};

export default FormStatus;
