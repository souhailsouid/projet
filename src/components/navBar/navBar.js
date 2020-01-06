/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */

import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from 'js-cookie';
import axios from 'axios';
import { setAuthToken } from '../../methods/setAuthToken';
import { capitalize } from '../../methods/game';

class NavBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      token: Cookies.get('jwtSecret'),
    };
  }

  componentDidMount() {
    if (this.state.token) {
      setAuthToken(this.state.token);
    }
    axios.get('http://localhost:5000/api/auth/', this.state.username, { withCredentials: true }).then((res) => this.setState({ name: res.data.name }));
  }

  render() {
    const { name } = this.state;
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/dashboard" title="se rediriger vers la page accueil">Othello</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Bonjour
            {' '}
            <a href="#login">{capitalize(name)}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default NavBarComponent;
