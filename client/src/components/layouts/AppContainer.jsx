import React from 'react';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Navbar from './Navbar';

import colors from '../../utils/colors';

const useStyles = makeStyles({
	container: {
		padding: '2rem 0 5rem',
	},
});

function AppContainer({ loggedIn, children }) {
	const classes = useStyles();

	return (
		<>
			<Navbar loggedIn={loggedIn} />
			<Container className={`${classes.container}`} maxWidth='md'>
				<div>{children}</div>
			</Container>
		</>
	);
}

export default AppContainer;
