/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-tabs */
/* eslint-disable indent */
import React from 'react';
// eslint-disable-next-line import/extensions
import Square from './square.js';

export default class Board extends React.Component {
	renderSquare(i) {
		return (
			// eslint-disable-next-line react/jsx-filename-extension
			<Square
				key={i}
				isAvailable={this.props.availableMoves.indexOf(i) > -1}
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		const rows = [];
		for (let j = 0; j < 8; j++) {
			const cols = [];
			for (let i = 0; i < 8; i++) {
				cols.push(this.renderSquare(i + (j * 8)));
			}
			rows.push(<div className="board-row" key={j}>{cols}</div>);
		}
		return (<div>{rows}</div>);
	}
}
