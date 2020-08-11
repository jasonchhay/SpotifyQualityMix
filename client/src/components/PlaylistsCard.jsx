import React, { useState, useLayoutEffect } from 'react';
import * as spotify from '../utils/spotify';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

import { makeStyles } from '@material-ui/styles';

import colors from '../utils/colors';
import HoverButton from './HoverButton';

const useStyles = makeStyles({
	container: {
		width: '250px',
		paddingBottom: '1rem',
		textAlign: 'center',

		'& a': {
			textDecoration: 'none',

			'& .image-wrapper': {
				padding: 0,
				height: '250px',
				overflow: 'hidden',
				boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
				borderRadius: 0,

				'& img': {
					width: '100%',
				},
			},

			'& .playlist-title': {
				marginTop: '1rem',
				color: colors.black,
				textDecoration: 'none',

				'&:hover': {
					textDecoration: '2px black underline',
				},
			},
		},
	},
});

function PlaylistsCard({
	id,
	name,
	image = require('../images/default_playlist.png'),
	numberTracks,
}) {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<Link to={`/tracks/${id}`}>
				<HoverButton className='image-wrapper'>
					<img src={image} alt={`${name} Image`} />
				</HoverButton>
				<h4 className='playlist-title'>{name}</h4>
				<h5>{numberTracks} Tracks</h5>
			</Link>
		</div>
	);
}

export default PlaylistsCard;
