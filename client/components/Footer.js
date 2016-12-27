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
                      <a href="http://www.creative-tim.com">
                        Creative Tim
                      </a>
                    </li>
                    <li>
                      <a href="http://presentation.creative-tim.com">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="http://blog.creative-tim.com">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="http://www.creative-tim.com/license">
                        Licenses
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="copyright pull-right">
                  © <script async="" src="//www.google-analytics.com/analytics.js"></script><script>document.write(new Date().getFullYear())</script>2016, made with <i className="material-icons">favorite</i> by Creative Tim for a better web.
                </div>
              </div>
            </footer>

            <footer className="footer footer-black footer-big">
              <div className="container">
                <div className="content">
                  <div className="row">
                    <div className="col-md-4">
                      <h5>About Us</h5>
                      <p>Creative Tim is a startup that creates design tools that make the web development process faster and easier. </p> <p>We love the web and care deeply for how users interact with a digital product. We power businesses and individuals to create better looking web projects around the world. </p>
                    </div>

                    <div className="col-md-4">
                      <h5>Social Feed</h5>
                      <div className="social-feed">
                        <div className="feed-line">
                          <i className="fa fa-twitter"></i>
                          <p>How to handle ethical disagreements with your clients.</p>
                        </div>
                        <div className="feed-line">
                          <i className="fa fa-twitter"></i>
                          <p>The tangible benefits of designing at 1x pixel density.</p>
                        </div>
                        <div className="feed-line">
                          <i className="fa fa-facebook-square"></i>
                          <p>A collection of 25 stunning sites that you can use for inspiration.</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <h5>Instagram Feed</h5>
                      <div className="gallery-feed">
                        <img src="assets/img/faces/card-profile6-square.jpg" className="img img-raised img-rounded" alt="" />
                        <img src="assets/img/faces/christian.jpg" className="img img-raised img-rounded" alt="" />
                        <img src="assets/img/faces/card-profile4-square.jpg" className="img img-raised img-rounded" alt=""/>
                        <img src="assets/img/faces/card-profile1-square.jpg" className="img img-raised img-rounded" alt="" />

                        <img src="assets/img/faces/marc.jpg" className="img img-raised img-rounded" alt="" />
                        <img src="assets/img/faces/kendall.jpg" className="img img-raised img-rounded" alt="" />
                        <img src="assets/img/faces/card-profile5-square.jpg" className="img img-raised img-rounded" alt="" />
                        <img src="assets/img/faces/card-profile2-square.jpg" className="img img-raised img-rounded" alt="" />


                        <hr />

                        <ul className="pull-left">
                          <li>
                            <a href="#pablo">
                              Blog
                            </a>
                          </li>
                          <li>
                            <a href="#pablo">
                              Presentation
                            </a>
                          </li>
                          <li>
                            <a href="#pablo">
                              Discover
                            </a>
                          </li>
                          <li>
                            <a href="#pablo">
                              Payment
                            </a>
                          </li>
                          <li>
                            <a href="#pablo">
                              Contact Us
                            </a>
                          </li>
                        </ul>

                        <div className="copyright pull-right">
                          Copyright © 2016 Creative Tim All Rights Reserved.
                        </div>
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
