import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import colors from '../../utils/colors';

const StyledButton = withStyles({
	root: {
		backgroundColor: colors.black,
		color: colors.white,
		padding: '.5rem 1.25rem',
		marginRight: '1.5rem',
		borderRadius: '2rem',
		transition: '.2s ease-in',
		position: 'relative',
		overflow: 'hidden',
	},
})(Button);

const useStyles = makeStyles({
	container: (props) => ({
		backgroundColor: props.backgroundColor,
		color: props.color,
		border: props.border,

		'&:hover': {
			backgroundColor: props.backgroundColor || colors.black,
		},

		'& .overlay': {
			position: 'absolute',
			top: '0',
			left: '0',
			right: '0',
			bottom: '0',
			transition: '.2s ease-in',

			'&:hover': {
				backgroundColor: 'hsla(0, 0%, 0%, 0.1)',
			},
		},
	}),
});

function AppButton({ title, color, backgroundColor, border, ...otherProps }) {
	const classes = useStyles({ color, backgroundColor, border });

	return (
		<StyledButton className={`${classes.container}`} {...otherProps}>
			{title}
			<div className='overlay' />
		</StyledButton>
	);
}

export default AppButton;
