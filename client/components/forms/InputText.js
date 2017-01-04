import React from 'react';

class InputText extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="form-group is-empty">
        <label for="inputEmail" className="col-md-2 control-label">E-mail</label>
        <div className="col-md-10">
          <input type="text" id="inputEmail" className="form-control" ref="email" placeholder="E-mail"/>
        </div>
      </div>
    )
  }
};

export default InputText;
