/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import Game from './game';
import NavBarComponent from '../../components/navBar/navBar';
import { exitModalShow, handleCloseModal } from '../../methods/modal';
import { setAuthToken } from '../../methods/setAuthToken';
import './game.css';

class Othello extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      token: Cookies.get('jwtSecret'),
    };
  }

  componentDidMount() {
    if (this.state.token) {
      setAuthToken(this.state.token);
    }
    axios.get('http://localhost:5000/api/auth/', this.state.username, { withCredentials: true }).then((res) => console.log(res));
  }

  render() {
    const { show } = this.state;
    const showModal = (
      <Modal show={show} onHide={() => handleCloseModal(this.setState.bind(this))}>
        <Modal.Header closeButton>
          <Modal.Title>Quitter la partie ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Voulez vous quitter la partie ?</Modal.Body>
        <Modal.Body>Vous seriez redirigé vers votre page d&apos;accueil</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => handleCloseModal(this.setState.bind(this))}>
            Continuer la partie
          </Button>
          <Button variant="danger" onClick={() => window.location = 'http://localhost:9000/home'}>
            Quitter la partie
          </Button>
        </Modal.Footer>
      </Modal>
    );
    return (
      <>
        <header>
          <NavBarComponent />

        </header>
        {showModal}
        <article className="col-md-12 col-sm-12 col-xs-12">
          <div className="mt-2 section-button-exit-game">

            <button type="submit" className="button-game-exit-style" onClick={() => exitModalShow(this.setState.bind(this))}>Quitter la partie</button>
          </div>
          <Game />

        </article>

      </>
    );
  }
}

export default Othello;
