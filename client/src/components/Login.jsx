import React from 'react';
import AppButton from './layouts/AppButton';

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
