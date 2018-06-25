import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


class HomeHome extends Component {
  render() {
    return(
      <div>
        <h1>Home Page</h1>
      </div>
    );
  }
}

/*
ReactDOM.render(
  <Router>
    <Route path="/" component={HomeHome}/>
  </Router>,
  document.getElementById('container')
);
*/

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
