import React from 'react';

class LoadingSpinner extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="spinner-container">
        {
          (this.props.submitting) ?
          <svg class="spinner" width="35px" height="35px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
          </svg>
        : ""
        }
      </div>
    )
  }
}
export default LoadingSpinner;
