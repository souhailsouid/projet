/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import SignIn from '../../components/signIn/signIn';
import SignUp from '../../components/signUp/signUp';
import './login.css';

class Login extends Component {
  render() {
    return (
      <>
        <h1>Othello</h1>
        <article className="col-md-12 col-sm-12 col-xs-12 d-flex login-page-style">
          <SignIn />
          <SignUp />
        </article>
      </>
    );
  }
}
export default Login;
