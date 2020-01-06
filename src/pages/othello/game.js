/* eslint-disable no-return-assign */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-shadow */
/* eslint-disable brace-style */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-continue */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
import React from 'react';
import NavBarComponent from '../../components/navBar/navBar';
import pieceBlack from '../../assets/Pieces (Black)/pieceBlack_multi10.png';
import pieceWhite from '../../assets/Chips/chipWhite.png';
import { PostPositionIA, getGameIAByID } from '../../methods/fetch';
import { exitModalShow, handleCloseModal } from '../../methods/modal';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Board from './board.js';
import Ai from './ai.js';
import axios from 'axios';
import './game.css';

export default class Game extends React.Component {
	constructor(props) {
		super(props);
		this.ai = new Ai(this);
		const initSquares = Array(64).fill(null);
		[initSquares[8 * 3 + 3], initSquares[8 * 3 + 4], initSquares[8 * 4 + 4], initSquares[8 * 4 + 3]] = ['X', 'O', 'X', 'O'];

		this.state = {
			history: [{
				squares: initSquares,
				xNumbers: 2,
				oNumbers: 2,
				xWasNext: true,
				winner: '',
			}],
			stepNumber: 0,
			xIsNext: true,
			piecewhiteIA: true,
			alert: true,
			notificationTour: true,
			notificationTourIa: false,
			savePositions: '',
			xNumbersSaving: '',
			oNumbersSaving: '',
			availablePosition: '',
			winner: '',
			goToDashboard: '',
			urlID: props.match.params.id,
			show: false,
		};
	}

	componentDidMount() {
		// eslint-disable-next-line react/prop-types
		const get = this.props.match.params.id;
		axios.all([getGameIAByID(get), PostPositionIA(get)])
			.then(axios.spread((gameByID, positionGame) => this.setState({
				gameByID: gameByID.data,
				positionGame: positionGame.data,
				availablePosition: gameByID.data.savePositions,
			})));
	}

	async initGame() {
		const initSquares = Array(64).fill(null);

		[initSquares[8 * 3 + 3], initSquares[8 * 3 + 4], initSquares[8 * 4 + 4], initSquares[8 * 4 + 3]] = ['X', 'O', 'X', 'O'];
	}


	handleUpdate() {
		const get = this.props.match.params.id;
		const elements = {
			savePositions: this.state.savePositions,
			saveScorePlayer1: this.state.xNumbersSaving,
			saveScoreIA: this.state.oNumbersSaving,
			saveWinners: this.state.winner,
		};
		axios.put(`http://localhost:5000/api/games/ia/${get}`, elements)
			.then((data) => {
				this.setState({ gameByID: data.data });
				// this.state.gameByID = data.data
				const updatedObj = {
					...this.state.gameByID,
				};
				this.setState({ gameByID: updatedObj });
			})
			// eslint-disable-next-line no-console
			.catch((err) => console.log(err));
	}

	calculateWinner(xNumbers, oNumbers) {
		return (xNumbers + oNumbers < 64) ? null : (xNumbers === oNumbers) ? 'XO' : (xNumbers > oNumbers ? 'X' : 'O');
	}

	flipSquares(squares, position, xIsNext) {
		let modifiedBoard = null;
		// Calculate row and col of the starting position
		const [startX, startY] = [position % 8, (position - position % 8) / 8];

		if (squares[position] !== null) {
			return null;
		}

		// Iterate all directions, these numbers are the offsets in the array to reach next sqaure
		[1, 7, 8, 9, -1, -7, -8, -9].forEach((offset) => {
			const flippedSquares = modifiedBoard ? modifiedBoard.slice() : squares.slice();
			let atLeastOneMarkIsFlipped = false;
			let [lastXpos, lastYPos] = [startX, startY];

			for (let y = position + offset; y < 64; y += offset) {
				// Calculate the row and col of the current square
				const [xPos, yPos] = [y % 8, (y - y % 8) / 8];

				// Fix when board is breaking into a new row or col
				if (Math.abs(lastXpos - xPos) > 1 || Math.abs(lastYPos - yPos) > 1) {
					break;
				}

				// Next square was occupied with the opposite color
				if (flippedSquares[y] === (!xIsNext ? 'X' : 'O')) {
					flippedSquares[y] = xIsNext ? 'X' : 'O';
					atLeastOneMarkIsFlipped = true;
					[lastXpos, lastYPos] = [xPos, yPos];
					continue;
				}
				// Next aquare was occupied with the same color
				else if ((flippedSquares[y] === (xIsNext ? 'X' : 'O')) && atLeastOneMarkIsFlipped) {
					flippedSquares[position] = xIsNext ? 'X' : 'O';
					modifiedBoard = flippedSquares.slice();
				}
				break;
			}
		});

		return modifiedBoard;
	}

	checkAvailableMoves(color, squares) {
		return squares
			.map((value, index) => (this.flipSquares(squares, index, color) ? index : null))
			.filter((item) => item !== null);
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[this.state.stepNumber];
		if (this.calculateWinner(current.xNumbers, current.oNumbers) || current.squares[i]) {
			return;
		}

		const changedSquares = this.flipSquares(this.state.availablePosition.length !== 0
			? this.state.availablePosition
			: current.squares, i, this.state.xIsNext);

		if (changedSquares === null) {
			return;
		}

		const xNumbers = changedSquares.reduce((acc, current) => (current === 'X' ? acc + 1 : acc), 0);
		const oNumbers = changedSquares.reduce((acc, current) => (current === 'O' ? acc + 1 : acc), 0);

		const shouldTurnColor = this.checkAvailableMoves(!this.state.xIsNext, changedSquares).length > 0
			? !this.state.xIsNext : this.state.xIsNext;

		this.setState({
			history: history.concat([{
				squares: changedSquares,
				xNumbers,
				oNumbers,
				xWasNext: shouldTurnColor,
				winner: (xNumbers + oNumbers < 64) ? null : (xNumbers === oNumbers) ? 'XO' : (xNumbers > oNumbers ? 'X' : 'O'),
			}]),
			stepNumber: history.length,
			xIsNext: shouldTurnColor,
			notificationTour: false,
			notificationTourIa: true,
			xNumber: xNumbers,
			oNumber: oNumbers,
			savePositions: this.state.history !== 0
				? this.state.history[this.state.history.length - 1].squares
				: this.state.history,
			xNumbersSaving: this.state.history !== 0
				? this.state.history[this.state.history.length - 1].xNumbers
				: xNumbers,
			oNumbersSaving: this.state.history !== 0
				? this.state.history[this.state.history.length - 1].oNumbers
				: oNumbers,
			winner: (xNumbers + oNumbers < 64) ? '' : (xNumbers === oNumbers) ? 'XO' : (xNumbers > oNumbers ? 'X' : 'O'),
			goToDashboard: 'recharge'
		},
			this.doRobotMove);
	}

	doRobotMove() {
		if ((this.state.piecewhiteIA) && (!this.state.xIsNext)) {
			const bestMove = this.ai.doMove();
			if (bestMove !== null) {
				setTimeout(() => {
					this.handleClick(bestMove);
					this.setState({
						notificationTour: true,
						notificationTourIa: false,
						savePositions: this.state.history !== 0 ? this.state.history[this.state.history.length - 1].squares : '',
						xNumbersSaving: this.state.history !== 0 ? this.state.history[this.state.history.length - 1].xNumbers : '',
						oNumbersSaving: this.state.history[this.state.history.length - 1].oNumbers,

					});
					this.handleUpdate();
				}, 2000);
			}
		}
	}

	jumpTo(step) {
		this.setState({
			stepNumber: parseInt(step, 0),
			xIsNext: this.state.history[step].xWasNext,
		});
	}

	resetGame() {
		this.jumpTo(0);
		this.setState({
			history: this.state.history.slice(0, 1),
		});
	}


	render() {
		const history = this.state.history.slice();
		const current = history[this.state.stepNumber];

		let winner = this.calculateWinner(current.xNumbers, current.oNumbers);


		const availableMoves = this.checkAvailableMoves(
			current.xWasNext, this.state.availablePosition.length !== 0
			? this.state.availablePosition
			: current.squares
		);
		const availableMovesOpposite = this.checkAvailableMoves(
			!current.xWasNext, this.state.availablePosition.length !== 0
			? this.state.availablePosition
			: current.squares
		);

		if ((availableMoves.length === 0) && (availableMovesOpposite.length === 0)) {
			winner = current.xNumbers === current.oNumbers ? 'XO' : current.xNumbers > current.oNumbers ? 'X' : 'O';
		}

		const status = winner
			? (winner === 'XO') ? 'Match nul' : (winner === 'X' ? 'Vous êtes le vainqueur' : 'Vous avez perdu!')
			: '';
		const { show } = this.state;
		const showModal = (
			<Modal show={show} onHide={() => handleCloseModal(this.setState.bind(this))}>
				<Modal.Header closeButton>
					<Modal.Title>Quitter la partie ?</Modal.Title>
				</Modal.Header>
				<Modal.Body>Voulez vous quitter la partie ?</Modal.Body>
				<Modal.Body>
					La partie sera sauvegardé.
					Vous pouriez y revenir à tout moment depuis votre tableau de bord
				</Modal.Body>
				<Modal.Body>En validant, vous seriez redirigé vers votre page d&apos;accueil</Modal.Body>
				<Modal.Footer>
					<Button variant="success" onClick={() => handleCloseModal(this.setState.bind(this))}>
						Continuer la partie
     </Button>
					<Button variant="danger" onClick={() => window.location = 'http://localhost:9000/dashboard'}>
						Quitter la partie
     </Button>
				</Modal.Footer>
			</Modal>
		);
		return (
			<div>
				<header>
					<NavBarComponent />
				</header>
				{showModal}
				<article className="col-md-12 col-sm-12 col-xs-12">
					<div className="mt-2 section-button-exit-game">

						<button type="submit" className="button-game-exit-style" onClick={() => exitModalShow(this.setState.bind(this))}>Quitter la partie</button>
					</div>


				</article>
				<div className="game">


					<article className="col-md-6 col-sm-12 col-xs-12 mt-2">
						{this.state.gameByID && this.state.availablePosition !== ''
							? (
								<Board
									squares={this.state.availablePosition.length !== 0
										? this.state.availablePosition
										: current.squares}
									availableMoves={availableMoves}
									onClick={(i) => this.handleClick(i)}
								/>
							)
							: 'Chargement en cours...'}

						<div className="game-status">
							{status}
							&nbsp;
        {winner ? <button onClick={() => this.resetGame()}>Play again</button> : ''}
						</div>
						<div />
					</article>
					<article className=" col-md-6 col-sm-12 col-xs-12 mt-3 ">
						<section className="col-md-12 col-sm-12 col-xs-12  section-notification ">
							{this.state.notificationTour
								? (
									<Alert variant={status === 'Vous avez perdu!' ? 'danger' : 'success'} onClose={() => this.setState({ alert: false, notificationTour: false })} dismissible>
										<Alert.Heading>
											{status}
											{' '}
										</Alert.Heading>
										{status === 'Vous avez perdu!' || status === 'Vous êtes le vainqueur' || status === 'Match nul' ? ''
											: <p>À vous !</p>}

									</Alert>
								) : (
									<Alert variant="danger" onClose={() => this.setState({ alert: false, notificationTour: false })} dismissible>
										<Alert.Heading>
											{status}
											{' '}
										</Alert.Heading>

										<p>Veuillez patientez, votre adversaire joue !</p>

									</Alert>
								)}
						</section>
						<section className="col-md-12 col-sm-12 col-xs-12   ">
							<Card className="bg-dark text-white">
								<Card.Title className="d-flex justify-content-center">
									{' '}
									<p className="name-game-style">Nom de la partie: </p>
									{' '}
									&nbsp;
            {' '}
									<p className="title-game">
										{' '}
										{this.state.positionGame
											? this.state.positionGame.name
											: this.state.positionGame}
									</p>
								</Card.Title>
								<Card.Title>Tableau de jeu</Card.Title>

								<Card.Body className="d-flex">
									<section className=" col-md-6 col-sm-12 col-xs-12 mt-2 row1-style">
										<table>
											<thead>
												<tr>
													<th />
													<th />
													<span>Nombre de pièces</span>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>Vous:</td>
													<td className="border-style "><img src={pieceBlack} alt="piece-black" /></td>
													<td className="text-position">
														{' '}
														{this.state.gameByID
															? this.state.gameByID.saveScoreIA && this.state.xNumbersSaving === '' ? this.state.gameByID.saveScorePlayer1 : current.xNumbers : null}
													</td>
												</tr>
												<tr>
													<td>I.A:  </td>
													<td><img src={pieceWhite} alt="piece-white" className="piece-white-dashboard" /></td>
													<td className="text-position">
														{' '}
														{this.state.gameByID
															? this.state.gameByID.saveScoreIA && this.state.oNumbersSaving === '' ? this.state.gameByID.saveScoreIA : current.oNumbers : null}
													</td>
												</tr>
											</tbody>
										</table>
									</section>

									<section className="col-md-6 col-sm-12 col-xs-12 mt-2 row2-style">
										<span> Nombre de pièces</span>
										<p>{current.xNumbers}</p>
										<p>
											{' '}
											{current.oNumbers}
										</p>
									</section>
								</Card.Body>


								<Card.Footer>

								</Card.Footer>
							</Card>


						</section>


						<section className="col-md-12 col-sm-12 col-xs-12 mt-2 ">

							{this.state.alert && status !== ''
								? (
									<Alert variant={status === 'Vous êtes le vainqueur' ? 'success' : 'danger'} onClose={() => this.setState({ alert: false })} dismissible>
										<Alert.Heading>
											{status}
											{' '}
										</Alert.Heading>
										{winner
											? (
												<Button
													onClick={() => this.setState({
														savePositions: this.state.savePositions,
														saveScorePlayer1: this.state.xNumber,
														saveScoreIA: this.state.oNumber,
														saveWinners: this.state.winner,
														goToDashboard: 'tupeux'
													})}
													className="single-player-link"
												>
													Se rediriger sur la page d'accueil
            </Button>
											)
											: ''}
									</Alert>
								)
								: null}
						</section>
						{this.state.goToDashboard === 'tupeux' ? window.location = 'http://localhost:9000/dashboard' : null}
						{/* {this.state.goToDashboard === 'recharge' ? window.location = `http://localhost:9000/${this.state.urlID}` : null} */}

					</article>
				</div>
			</div>
		);
	}
}
