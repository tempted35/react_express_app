import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

class Login extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  login = (e) => {
    e.preventDefault();
    this.props.setUsername(e.target.username.value);
  }
  
  render() {
    return (
      <div id="login">
        <form onSubmit={this.login}>
          <label>Username:</label><br/>
          <input type="text" id="username"/><br/>
          <input type="submit" value="login"/>
        </form>
      </div>
    )
  }

}

export default Login;
