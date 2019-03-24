import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/customers';
import People from './components/people';
import Login from './components/login';

class App extends Component {
  state = {
    username: null
  }

  setUsername = (username) => {
    this.setState({username})
    sessionStorage.setItem('username', {username});
  }

  render() {
    return (
      <div className="App">
      {
        !sessionStorage.getItem('username') ?
          <Login setUsername={this.setUsername}/>
          :
          <People />
      }
      </div>
    );
  }
}

export default App;
