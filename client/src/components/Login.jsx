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
			<AppButton
				title='View on Github'
				image={
					<img src={require('../images/github_logo.png')} alt='GitHub Logo' />
				}
				href={githubRepo}
			/>
		</div>
	);
}

export default Login;
