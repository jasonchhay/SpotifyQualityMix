import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import HoverButton from '../layouts/HoverButton';

import colors from '../../utils/colors';

const useStyles = makeStyles({
	container: {
		width: '100%',
		borderBottom: `1px ${colors.darkGray} solid`,

		'& .content': {
			textAlign: 'left',
			width: '100%',
			textDecoration: 'none',
			color: colors.black,
			padding: '1rem',

			'& .image-wrapper': {
				overflow: 'hidden',
				width: '4vw',
				height: '4vw',
				paddingRight: '1rem',

				'& .album-art': {
					width: '100%',
				},
			},
		},
	},

	text: {
		color: colors.white,
		lineHeight: '1',
		marginBottom: '.5rem',
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
			<HoverButton
				hoverColor='hsla(0, 0%, 100%, .2)'
				href={url}
				target='_blank'
				rel='noopener noreferrer'>
				<div className='content'>
					<Box display='flex'>
						<div className='image-wrapper'>
							<img
								className='album-art'
								src={image}
								alt={`${title} Cover Art`}
							/>
						</div>
						<Box textAlign='left' lineHeight='0'>
							<Typography
								variant='h6'
								className={`track-title ${classes.text}`}
								gutterBottom>
								{title}
							</Typography>
							<Typography
								variant='subtitle1'
								className={`artist ${classes.text}`}>
								{artist}
							</Typography>
						</Box>
					</Box>
				</div>
			</HoverButton>
		</div>
	);
}
