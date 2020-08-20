import React, { useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import * as spotify from '../utils/spotify';

import { getHashParams } from '../utils/helpers';
import { accessTokenKey } from '../utils/variables';

import AppContainer from './layouts/AppContainer';
import Login from './Login';
import Filter from './Filter/Filter';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
	typography: {
		fontFamily: 'DM Sans, Roboto, Arial',
	},
});

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	useLayoutEffect(() => {
		const params = getHashParams();

		if (params.accessToken && params.refreshToken) {
			localStorage[accessTokenKey] = accessToken;
			localStorage[refreshToken] = refreshToken;
		}

		const token = spotify.getAccessToken();

		if (token) {
			spotify.setAccessToken(token);
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}

		setLoading(false);
	}, []);
	// Check if authentication token exists or not

	return (
		<ThemeProvider theme={theme}>
			<Router>
				{!loading && (
					<AppContainer loggedIn={loggedIn}>
						<Route exact path='/' component={loggedIn ? Filter : Login} />
					</AppContainer>
				)}
			</Router>
		</ThemeProvider>
	);
}

export default App;
