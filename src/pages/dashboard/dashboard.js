/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { getAllGamesOnline, getAllGamesIA } from '../../methods/fetch';
import othelloPicture from '../../assets/othello.jpg';
import NavBarComponent from '../../components/navBar/navBar';
import './dashboard.css';

moment.locale('fr');
class Dashboard extends Component {
  componentDidMount() {
    axios.all([getAllGamesOnline(), getAllGamesIA()])
      .then(axios.spread(
        (games, gamesIA) => this.setState({ games: games.data, gamesIA: gamesIA.data }),
      ));
  }

  render() {
    return (
      <>
        <NavBarComponent />
        <p className="create-style">
          <Link to="/home" className="link-exit">Créer une partie</Link>
        </p>
        <div className="col-md-12 col-sm-12 col-xs-12  d-flex login-page-style   ">
          <article className="col-md-6 col-sm-12 col-xs-12 mt-5 d-flex section-game-style" style={{ border: '1px solid gray' }}>
            <section className="col-md-12 col-sm-12 col-xs-12     ">
              <p className=" col-md-12 col-sm-12 col-xs-12  single-game">Liste des parties disponible en IA</p>
              <div className=" d-flex login-page-style">
                {this.state && this.state.gamesIA.length !== 0 && this.state.gamesIA !== null
                  ? this.state.gamesIA.map((el) => (
                    <section className="col-md-6 col-sm-12 col-xs-12 mt-3   ">
                      <header>
                        {!el.saveScorePlayer1 && !el.saveScoreIA
                          ? <span>Match pas encore commencé</span>
                          : null}
                        <p>
                          {el.saveScorePlayer1 ? <span className="score-style">Score:</span> : ''}
                          {el.saveScorePlayer1 ? (

                            <span>
                              {' '}
                              vous:&nbsp;
                              {el.saveScorePlayer1}

                              ,
                            </span>
                          ) : ''}
                          {' '}
                          &nbsp;
                          {el.saveScoreIA ? (
                            <span>
                              IA:&nbsp;
                              {el.saveScoreIA}
                            </span>
                          ) : ''}
                        </p>
                      </header>
                      <Card
                        className={el.saveWinners === 'O' || el.saveWinners === 'XO' || el.saveScorePlayer1 === '0'
                          ? 'bg-danger text-white'
                          : el.saveWinners === 'X' || el.saveScoreIA === '0'
                            ? 'bg-success text-white '
                            : 'bg-primary text-white'}
                      >
                        <Card.Title>{el.name}</Card.Title>
                        <Card.Img src={othelloPicture} alt="Card image othello" />
                        <Card.Body>
                          <span />
                          Crée le &nbsp;
                          {moment(el.date).format('DD-MM-YYYY')}
                        </Card.Body>
                        <Card.Footer>
                          {el.saveWinners !== '' || el.saveWinners !== null
                            ? el.saveWinners === 'O' ? 'Perdu' : '' || el.saveWinners === 'X'
                              ? 'Gagner!' : '' || el.saveWinners === 'XO'
                                ? 'Match null' : '' || el.saveScorePlayer1 === '0'
                                  ? 'Perdu'
                                  : '' : ''}
                          {el.saveWinners === 'O' || el.saveWinners === 'X' || el.saveWinners === 'XO' || el.saveScorePlayer1 === '0' || el.saveScoreIA === '0'
                            ? ''
                            : <Link to={{ pathname: `/${el._id}`, state: { fromId: true } }} className="single-player-link">{!el.saveScorePlayer1 && !el.saveScoreIA ? 'Commencer' : 'Reprendre la partie'}</Link>}


                        </Card.Footer>
                      </Card>
                    </section>
                  ))
                  : <p>Veuillez créer une partie avant de démarrer</p>}
              </div>
            </section>
          </article>
          <article className="col-md-6 col-sm-12 col-xs-12 mt-5 d-flex login-page-style" style={{ border: '1px solid gray' }}>
            <section className="col-md-12 col-sm-12 col-xs-12     ">
              <p className=" col-md-12 col-sm-12 col-xs-12  online-game">Liste des parties disponible en ligne</p>
              <div className=" d-flex login-page-style">
                {this.state && this.state.games.length !== 0 && this.state.games !== null
                  ? this.state.games.map((el) => (
                    <section className="col-md-6 col-sm-12 col-xs-12  mt-3    ">
                      <Card className="bg-secondary text-white">
                        <Card.Title>{el.name}</Card.Title>
                        <Card.Img src={othelloPicture} alt="Card image othello" />
                        <Card.Body>
                          Crée le &nbsp;
                          {moment(el.date).format('DD-MM-YYYY')}
                        </Card.Body>
                        <Card.Footer>
                          <Link to={`/othello/${el._id}`} className="single-player-link">Rejoindre</Link>
                        </Card.Footer>
                      </Card>
                    </section>
                  ))
                  : <p>Pas de partie multijoueur disponible. Veuillez créer une partie</p>}
              </div>
            </section>
          </article>
        </div>
      </>
    );
  }
}
export default Dashboard;
