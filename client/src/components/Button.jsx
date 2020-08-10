import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import colors from '../utils/colors';

const useStyles = makeStyles({
	container: (props) => ({
		backgroundColor: props.backgroundColor,
		color: props.color,
		padding: '.5rem 1.5rem',
		borderRadius: '2rem',
		margin: '1em',
		boxShadow: '0 2px 2px rgba(0, 0, 0, 0.25)',
		transition: '.2s ease-in',

		'&:hover': {
			color: colors.black,
		},
	}),
});

function AppButton({
	title,
	image,
	color = colors.white,
	backgroundColor = colors.black,
	...otherProps
}) {
	const classes = useStyles({ color, backgroundColor });
	return (
		<Button className={`${classes.container}`} {...otherProps}>
			{image}
			{title}
		</Button>
	);
}

export default AppButton;
