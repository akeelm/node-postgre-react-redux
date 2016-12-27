import React from 'react';
import { Link } from 'react-router';

const Home = React.createClass({
  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <h4 className="description text-center">
            <p>
              This is the home page of the node.js bootstrap template
              app using PostgreSQL for the back end and React with Redux
              on the front end.
            </p>
          </h4>
        </div>
      </div>
    )
  }
});

export default Home;
