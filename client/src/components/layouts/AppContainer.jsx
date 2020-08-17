import React from 'react';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import Navbar from './Navbar';

import { githubRepo } from '../../utils/variables';
import colors from '../../utils/colors';

const useStyles = makeStyles({
	container: {
		paddingTop: '3.5rem',
	},
	github: {
		color: colors.black,
		border: 'none',
		backgroundColor: 'inherit',
		fontSize: '2.5rem',
		position: 'fixed',
		bottom: 0,
		right: 0,
		cursor: 'pointer',
		margin: '1rem 1rem',
		transition: '.2s ease-in',

		'&:hover': {
			color: '#999',
		},

		'&:active': {
			color: '#555',
		},
	},
});

function AppContainer({ loggedIn, children }) {
	const classes = useStyles();

	return (
		<>
			<Navbar loggedIn={loggedIn} />
			<Container className={`${classes.container}`} maxWidth='lg'>
				<div>{children}</div>
			</Container>
			<button
				href={githubRepo}
				className={`${classes.github}`}
				target='_blank'
				rel='noopener noreferrer'>
				<FontAwesomeIcon icon={faGithub} />
			</button>
		</>
	);
}

export default AppContainer;
