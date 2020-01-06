/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import NavBarComponent from '../../components/navBar/navBar';
import SinglePlayer from '../../components/mode/singlePlayer/singlePlayer';
import MultiPlayer from '../../components/mode/multiPlayer/multiPlayer';
import './home.css';

class Home extends Component {
  componentDidMount() {
    axios.get('http://localhost:5000/api/users/').then((res) => console.log(res));
  }

  render() {
    return (
      <>
        <NavBarComponent />
        <p className="exit-style">
          <Link to="/dashboard" className="link-exit">Revenir sur la page acceuil</Link>
        </p>
        <h1 className="mt-3">Choisir votre mode de jeu</h1>
        <section className="col-md-12 col-sm-12 col-xs-12 mt-5   ">
          <Alert variant="danger" className="col-md-4 col-sm-12 col-xs-12 notification-multi-player" dismissible>
            <p>Pas de partie multi-joueur disponible.</p>
          </Alert>
        </section>
        <article className="col-md-12 col-sm-12 col-xs-12 d-flex login-page-style">
          <SinglePlayer />
          <MultiPlayer />
        </article>
      </>
    );
  }
}
export default Home;
