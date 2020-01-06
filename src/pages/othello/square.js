/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/* eslint-disable no-tabs */
import React from 'react';
import pieceBlack from '../../assets/Pieces (Black)/pieceBlack_multi10.png';
import pieceWhite from '../../assets/Chips/chipWhite.png';

export default function Square(props) {
	const squareClasses = `square ${props.isAvailable ? 'available-square' : 'not-available-square'}`;
	const colorMarkerClasses = props.value === 'X'
		? <img src={pieceBlack} alt="piece-black" />
		: props.value === 'O' ? (
			<img
				src={pieceWhite}
				alt="piece-white"
				className="piece-white-style"
			/>
		) : '';

	return (
		<div className={squareClasses} onClick={props.onClick}>
			{props.value ? <div className={colorMarkerClasses}>{colorMarkerClasses}</div> : ''}
		</div>
	);
}
