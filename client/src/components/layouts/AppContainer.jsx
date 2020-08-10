import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Sidebar from './Sidebar';

const useStyles = makeStyles({
	container: {
		marginLeft: '5rem',
	},
});

function AppContainer({ loggedIn, children }) {
	const classes = useStyles();

	return (
		<>
			{loggedIn && <Sidebar />}
			<Container className={`${classes.container}`} maxWidth='lg'>
				{children}
			</Container>
		</>
	);
}

export default AppContainer;
