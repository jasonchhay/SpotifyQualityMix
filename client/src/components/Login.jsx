import React from 'react';

import AppButton from './AppButton';

import { githubRepo } from '../utils/variables';

function Login(props) {
	return (
		<div>
			<h1>QualityMix</h1>
			<AppButton
				title='Login to Spotify'
				backgroundColor='#1DB954'
				href='/login'
			/>
		</div>
	);
}

export default Login;
