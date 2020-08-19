import React, { useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import * as spotify from '../utils/spotify';

import { getHashParams } from '../utils/helpers';
import { accessTokenKey } from '../utils/variables';

import AppContainer from './layouts/AppContainer';
import Login from './Login';
import Filter from './Filter/Filter';
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
	typography: {
		fontFamily: 'DM Sans, Roboto, Arial',
	},
});

function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	useLayoutEffect(() => {
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

				<Route
					exact
					path='/login'
					component={() => {
						window.location.replace('http://localhost:8888/api/login');
						return null;
					}}
				/>
				<Route
					exact
					path='/redirect'
					component={() => {
						const accessToken = getHashParams().access_token;
						const refreshToken = getHashParams().refresh_token;

						localStorage[accessTokenKey] = accessToken;
						localStorage[refreshToken] = refreshToken;

						return <Redirect to='/' />;
					}}
				/>
			</Router>
		</ThemeProvider>
	);
}

export default App;
