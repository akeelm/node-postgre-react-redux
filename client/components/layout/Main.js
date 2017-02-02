import React from 'react';
import { Link } from 'react-router';
import Navbar from './../navbar/Navbar';
import Home from './../Home.js';
import Footer from './Footer.js';
import { RouteTransition } from 'react-router-transition';

const Main = React.createClass({
  componentWillMount() {
    this.props.actions.userActions.getFromToken();
  },
  render() {
    const bgImage = {
      transform: 'translate3d(0px, 0px, 0px)',
      backgroundImage: 'url(\'/static/images/rainbow.jpg\')'
    };

    const mainClass = (this.props.location.pathname === "/") ? "main main-raised" : "main main-raised-not-home"

    return (
      <div>
        <Navbar {...this.props} />

          {
            (this.props.location.pathname == '/') ?
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
            : ''
          }

        <div key="maincomponent" className={mainClass}>
          <div className="section">

            <RouteTransition
              pathname={this.props.location.pathname}
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}
              mapStyles={(styles) => {
                return {
                  position: (styles.opacity > 0.3) ? 'relative': 'absolute',
                  boxSizing: 'border-box',
                  width: '100%',
                  height: '100%',
                  opacity: styles.opacity,
                  transform: 'translateX(' + styles.offset + '%) scale(' + styles.scale + ')'
                }
              }}
              >

                {React.cloneElement(this.props.children, this.props, { key: this.props.location.pathname })}

            </RouteTransition>
            
          </div>
          <Footer />
        </div>
      </div>
    )
  }
});

export default Main;
