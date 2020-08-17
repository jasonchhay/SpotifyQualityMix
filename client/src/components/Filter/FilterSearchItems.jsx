import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

import { Chip } from '@material-ui/core';

const useStyles = makeStyles({
	container: {
		display: 'inline-flex',
		alignItems: 'center',
	},

	image: (props) => ({
		fontSize: '1.5rem',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '3.5rem',
		height: '3.5rem',
		overflow: 'hidden',
		borderRadius: props.category === 'artists' && '2rem',

		'& img': {
			width: '3.5em',
		},
	}),

	text: {
		marginLeft: '1rem',
	},
});

export function FilterSearchResult({ option }) {
	const classes = useStyles({ category: option.category });

	return (
		<div className={classes.container}>
			<div className={classes.image}>
				{option.image ? (
					<img src={option.image} alt={option.name} />
				) : (
					<FontAwesomeIcon icon={faMusic} />
				)}
			</div>
			<div className={classes.text}>
				<Typography variant='h6' className={'name'}>
					{option.name}
				</Typography>
				<Typography variant='subtitle1' className={'artists'}>
					{option.artist && option.artist.join(', ')}
				</Typography>
			</div>
		</div>
	);
}

export function FilterSearchChip({ option, ...otherProps }) {
	const classes = useStyles({ category: option.category });

	return (
		<Chip
			label={option.name}
			{...otherProps}
			icon={
				<div className={classes.image}>
					{option.image ? (
						<img src={option.image} alt={option.name} />
					) : (
						<FontAwesomeIcon icon={faMusic} />
					)}
				</div>
			}
		/>
	);
}
