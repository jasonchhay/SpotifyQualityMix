import React from 'react';
import { Button, Box, CircularProgress, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/styles';
import { green } from '@material-ui/core/colors';
import CheckIcon from '@material-ui/icons/Check';

import { CSSTransition } from 'react-transition-group';

import colors from '../../utils/colors';

const useStyles = makeStyles({
	overlay: (props) => ({
		position: props.position,
		top: '0',
		bottom: '0',
		left: '0',
		right: '0',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: colors.white,
		zIndex: 10,
		transition: '.5s ease-in-out',
		flexDirection: 'column',
	}),

	buttonSuccess: {
		backgroundColor: green[500],
		width: 56,
		height: 56,
		padding: 0,
		fontSize: '0.875rem',
		minWidth: 0,
		minHeight: 36,
		boxSizing: 'border-box',
		fontWeight: 500,
		lineHeight: 1.75,
		borderRadius: '50%',
		letterSpacing: '0.02857em',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		transition: 'all 1s ease-in',
		marginBottom: '1rem',
	},

	fabProgress: {
		position: 'absolute',
		zIndex: 1,
	},

	successMessage: {
		position: 'absolute',
		bottom: '5rem',
	},
});

export default function Loading({
	position = 'fixed',
	loading,
	success,
	successMessage,
}) {
	const classes = useStyles({ position });

	return (
		<Box className={classes.overlay}>
			{loading && (
				<CircularProgress size={56} className={classes.fabProgress} />
			)}
			{success && (
				<CSSTransition
					transitionName='fade'
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
					<>
						<Box color='primary' className={classes.buttonSuccess}>
							<CheckIcon />
						</Box>
						<Typography variant='h6' className={classes.successMessage}>
							{successMessage}
						</Typography>
					</>
				</CSSTransition>
			)}
		</Box>
	);
}
