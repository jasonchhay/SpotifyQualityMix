import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import colors from '../utils/colors';

const useStyles = makeStyles({
	container: (props) => ({
		backgroundColor: props.backgroundColor,
		color: props.color,
		padding: '.5rem 1.25rem',
		marginRight: '1.5rem',
		borderRadius: '2rem',
		boxShadow: '0 1px 1px rgba(0, 0, 0, 0.5)',
		transition: '.2s ease-in',
		position: 'relative',
		overflow: 'hidden',

		'&:hover': {
			backgroundColor: props.backgroundColor,
		},

		'& .overlay': {
			position: 'absolute',
			top: '0',
			left: '0',
			right: '0',
			bottom: '0',
			transition: '.1s ease-in',

			'&:hover': {
				backgroundColor: 'hsla(0, 0%, 100%, 0.3)',
			},
		},

		'& .button-content': {
			display: 'flex',
			alignItems: 'center',

			'& .image-container': {
				display: 'flex',
				marginRight: '.5rem',
				'& > img': {
					height: '1.5rem',
				},
			},
		},
	}),
});

function AppButton({
	title,
	color = colors.white,
	backgroundColor = colors.black,
	...otherProps
}) {
	const classes = useStyles({ color, backgroundColor });

	return (
		<Button className={`${classes.container}`} {...otherProps}>
			<div className='button-content'>
				{title}
				<div className='overlay' />
			</div>
		</Button>
	);
}

export default AppButton;
