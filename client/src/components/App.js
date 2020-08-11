import React, { useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import * as spotify from '../utils/spotify';

import { getHashParams } from '../utils/helpers';
import { accessTokenKey, refreshTokenKey } from '../utils/variables';

import AppContainer from './layouts/AppContainer';
import Login from './Login';
import Playlists from './Playlists';
import Tracks from './Tracks';

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	useLayoutEffect(() => {
		const token = spotify.getAccessToken();

		if (token) {
			spotify.setAccessToken(token);
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
	}, []);
	// Check if authentication token exists or not

	return (
		<Router>
			<AppContainer loggedIn={loggedIn}>
				<Route exact path='/' component={loggedIn ? Playlists : Login} />
				<Route exact path='/tracks/:id' component={Tracks} />
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
			</AppContainer>
		</Router>
	);
}

export default App;
