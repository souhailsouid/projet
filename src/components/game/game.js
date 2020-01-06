/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import othelloPicture from '../../assets/othello.jpg';


export default () => (

  <section className="col-md-2 col-sm-12 col-xs-12 mt-5  ">
    <Card className="bg-dark text-white">
      <Card.Title>Mode multijoueur</Card.Title>
      <Card.Img src={othelloPicture} alt="Card image othello" />
      <Card.Footer>
        <Link to="/othello" className="single-player-link">Rejoindre</Link>
      </Card.Footer>
    </Card>
  </section>

);
