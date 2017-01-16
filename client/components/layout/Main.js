import React from 'react';
import { Link } from 'react-router';
import Navbar from './../navbar/Navbar';
import Home from './../Home.js';
import Footer from './Footer.js';

const Main = React.createClass({
  componentWillMount() {
    this.props.actions.userActions.getFromToken();
  },
  render() {
    const bgImage = {
      transform: 'translate3d(0px, 0px, 0px)',
      backgroundImage: 'url(\'/static/images/rainbow.jpg\')'
    };
    return (
      <div>
        <Navbar {...this.props} />
        <div className="page-header header-filter clear-filter" data-parallax="active" style={bgImage}>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="brand">
                  <h1>
                    <Link to="/">node.js PostgreSQL react</Link>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main main-raised">
          <div className="section">
              {React.cloneElement(this.props.children, this.props)}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
});

export default Main;
