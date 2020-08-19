import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
	container: {
		padding: 0,
		position: 'relative',
		overflow: 'hidden',
		textTransform: 'none',
		borderRadius: 0,
		width: '100%',
	},

	overlay: (props) => ({
		position: 'absolute',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		transition: '.1s ease-in',

		'&:hover, h4:hover &': {
			background: props.hoverColor,
		},
	}),
});

function Hover({
	hoverColor = 'hsla(0, 0%, 0%, .3)',
	children,
	...otherProps
}) {
	const classes = useStyles({ hoverColor });

	return (
		<Button className={`${classes.container}`} {...otherProps}>
			{children}
			<div className={`${classes.overlay}`} />
		</Button>
	);
}

export default Hover;
