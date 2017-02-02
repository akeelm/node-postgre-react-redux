import React from 'react';

class Footer extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
          <div className="footer-areas">
            <footer className="footer">
              <div className="container">
                <nav className="pull-left">
                  <ul>
                    <li>
                      <a href="http://akeel.co.uk">
                        akeel.co.uk
                      </a>
                    </li>
                    <li>
                      <a href="http://github.com/akeelm">
                        github.com/akeelm
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="copyright pull-right">
                  © Akeel Mughal
                </div>
              </div>
            </footer>

            <footer className="footer footer-black footer-big">
              <div className="container">
                <div className="content">
                  <div className="row">
                    <div className="col-md-4">
                      <h5>About Me</h5>
                      <p>
                        Hi there! I’m a full stack developer with more than seven years experience in development and over a decade in tech. My experience has been gained working in a variety of industries, working for companies, big and small, in London.
                      </p>
                    </div>

                    <div className="col-md-4">
                      <h5>Another column</h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>

                    <div className="col-md-4">
                      <h5>Final column</h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                      <div className="copyright pull-right">
                        Copyright © Akeel Mughal
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </footer>

          </div>
    )
  }
};

export default Footer;
