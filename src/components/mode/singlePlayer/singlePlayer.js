/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */

import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Input from '../../input/input.js';
import { exitModalShow, handleCloseModal } from '../../../methods/modal';
import { onShowRecapCreationGame, onCreationGameIa, handleCloseRecapModal } from '../../../methods/game';
import othelloPicture from '../../../assets/othello.jpg';
import './singlePlayer.css';

class SinglePlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      showRecap: false,
      title: '',
      errorInput: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      show, showRecap, title, errorInput,
    } = this.state;
    const showModal = (
      <Modal show={show} onHide={() => handleCloseModal(this.setState.bind(this))}>
        <Modal.Header closeButton>
          <Modal.Title>Création partie contre I.A</Modal.Title>
        </Modal.Header>
        <form className="form-group-who-to-follow " data-toggle="validator">
          <Modal.Body>
            {errorInput
              ? <p className="error-style">Veuillez remplir ce champ!</p> : null}
            <Input
              label="Nom de la partie *"
              type="text"
              name="title"
              id="title"
              placeholder="Veuillez inscrire un nom "
              validation={errorInput ? 'Une partie doit contenir un nom' : ''}
              value={title}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => handleCloseModal(this.setState.bind(this))}>
              Annuler
            </Button>
            <Button variant="success" onClick={() => (title !== '' ? onShowRecapCreationGame(this.setState.bind(this)) : this.setState({ errorInput: 'error' }))} id="recap-button" btnType="valider">
              Valider
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );

    const showModalRecap = (
      <Modal show={showRecap} onHide={() => handleCloseRecapModal(this.setState.bind(this))}>
        <Modal.Header closeButton>
          <Modal.Title>Demande de confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Etes vous sûr de vouloir créer cette partie?</Modal.Body>
        <Modal.Body>
          <p>
            Titre de la partie:&nbsp;
            <span className="name-game">{title}</span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => handleCloseRecapModal(this.setState.bind(this))}>
            Annuler la création
          </Button>
          <Button variant="success" onClick={() => onCreationGameIa(this.state, this.setState.bind(this))}>
            Créer la partie
          </Button>
        </Modal.Footer>
      </Modal>
    );
    return (

      <section className="col-md-4 col-sm-12 col-xs-12 mt-5">
        <Card className="bg-dark text-white">
          <Card.Title>Jouer contre  I.A</Card.Title>
          <Card.Img src={othelloPicture} alt="Card image othello" />

          <Card.Footer>
            <button type="submit" className="single-player-button" onClick={() => exitModalShow(this.setState.bind(this))}>Créer une nouvelle partie simple</button>
          </Card.Footer>
        </Card>
        {showModal}
        {showModalRecap}
      </section>
    );
  }
}
export default SinglePlayer;
