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
        <h1> About the Project</h1>
        <h3>1. Group Member and work distribution: </h3>
        <h5>Ho Shing Fung 1155105818 (Login page + User interface + backend function of User interface)</h5>
        <h5>Yip Kai Hin 1155105796 (User interface)</h5>
        <h5>Yu Chun Fung Ray 1155094125 (Admin interface + backend function of Admin interface)</h5>
        <h5>Pun Man Wing 1155092833 (Admin interface）</h5>
        <br/>

        <h3>2. Basic “how-to” of your project app</h3>
        <h5>1. npm install</h5>
        <h5>2. config mongodb connection setting insrc/backend/server.js</h5>
        <h5>3. npm run backend (To run the backend server)</h5>
        <h5>4. npm start (use other terminal) </h5>
        <h5>5. To use user interface, first create user account in admin interface</h5>
        <h5>6. Enjoy this App!</h5>
        <br/>
        <h3>Things we have not implement</h3>
        <h5>1. Home location feature for user</h5>
        <h5>2. Charting statistics feature</h5>
        <br/>

        <h3>3. Mongodb collections for this app</h3>
        <h5>User/Location/Route/Stop/Comment/Favourite</h5>
        <h5>(Details can be view in src/backend/server.js: line 31-127)</h5>
        <br/>

        <h3>4. Technologies and frameworks/libraries in use</h3>
        <h5>1. Create-react-app</h5>
        <h5>- Pros1. Suit for single-paged application</h5>
        <h5>- Pros2. Save can be updated immediately while devloping, you don't need to restart the app to see the update</h5>
        <h5>- Cons1. Not the quickest or most concise way to use React, because of plenty of pre-configuration</h5>
        <h5>- Cons2. Need proxy to save express backend server</h5>
        <h5>2. Mongodb</h5>
        <h5>- Pros1. Clear single object structure</h5>
        <h5>- Pros2. Uses internal memory for storing the working set, enabling faster access of data.</h5>
        <h5>- Cons1. Server need numerous usage of memory</h5>
        <h5>- Cons2. No joins leads to less flexibuilty with querying</h5>
        <br/>

        <h3>5. Academic Honesty</h3>
        <a href="http://www.cuhk.edu.hk/policy/academichonesty">http://www.cuhk.edu.hk/policy/academichonesty</a>
        <h5>All group member have read the article carefully</h5>

      </div>
    )
  }
}

export default About