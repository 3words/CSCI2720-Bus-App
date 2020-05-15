import React from 'react';
import { Link } from 'react-router-dom';

class About extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="about-the-project">
        <Link to='/'>Go back to login page</Link>
        <h5> About the Project</h5>
      </div>
    )
  }
}

export default About