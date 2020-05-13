import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';
import Admin from './admin/Admin';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact={true} path="/appadmin" component={Admin} />
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
