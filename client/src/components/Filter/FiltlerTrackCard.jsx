import React from 'react';
import { makeStyles } from '@material-ui/styles';
import HoverButton from '../layouts/HoverButton';

import colors from '../../utils/colors';

const useStyles = makeStyles({
	container: {
		width: '10vw',
		paddingBottom: '1rem',
		paddingRight: '1.5rem',
		textAlign: 'center',

		'& a': {
			textDecoration: 'none',
			color: colors.black,

			'& .image-wrapper': {
				padding: 0,
				height: '10vw',
				overflow: 'hidden',
				boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
				borderRadius: 0,

				'& img': {
					width: '100%',
				},

				'& .track-title': {
					marginTop: '1rem',
					color: colors.black,
					textDecoration: 'none',
				},
			},

			'& .track-title': {
				marginTop: '.5rem',
				marginBottom: '0',
			},

			'& .artist': {
				marginTop: '0',
				marginBottom: '.25rem',
			},
		},
	},
});

export default function FiilterTrackCard({
	title,
	url,
	image = require('../../images/default_playlist.png'),
	artist,
}) {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<a href={url} target='_blank' rel='noopener noreferrer'>
				<HoverButton className='image-wrapper'>
					<img src={image} alt={`${title} Cover Art`} />
				</HoverButton>
				<h4 className='track-title'>{title}</h4>
				<h5 className='artist'>{artist}</h5>
			</a>
		</div>
	);
}
