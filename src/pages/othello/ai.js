/* eslint-disable no-tabs */
/* eslint-disable indent */
export default class Ai {
	constructor(game) {
		this.game = game;
	}

	doMove() {
		const history = this.game.state.history.slice();
		const current = history[this.game.state.stepNumber];

		let moves = [];
		current.squares.forEach((element, index) => {
			if (!element) {
				const newBoard = this.game.flipSquares(current.squares, index, false);
				if (newBoard) {
					// eslint-disable-next-line no-shadow
					const oNumbers = newBoard.reduce((acc, current) => (current === 'O' ? acc + 1 : acc), 0);
					moves.push({ index, number: oNumbers });
				}
			}
		});

		moves = moves.sort((a, b) => b.number - a.number);

		if (moves.length > 0) {
			return moves[0].index;
		}
		return null;
	}
}
