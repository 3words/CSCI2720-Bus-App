/*
Group Memeber:
Yu Chun Fung Ray 1155094125
Pun Man Wing 1155092833
Ho Shing Fung 1155105818
Yip Kai Hin  1155105796
*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import Admin from './admin/Admin';
import About from './About.jsx';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact={true} path="/appadmin" component={Admin} />
        <Route exact={true} path="/aboutthisproject" component={About} />
        <Route component={App}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
