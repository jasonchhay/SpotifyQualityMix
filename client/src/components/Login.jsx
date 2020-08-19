import React from 'react';
import AppButton from './layouts/AppButton';
import { Typography, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import HeaderBar from './layouts/HeaderBar';

const LoginText = withStyles({
	h1: {
		fontWeight: 700,
		marginBottom: '.5rem',
	},
	h4: {
		marginTop: '2rem',
		marginBottom: '5rem',
	},
})(Typography);

function Login(props) {
	return (
		<Box paddingTop={'5rem'}>
			<LoginText variant='h1'>QualityMix</LoginText>
			<HeaderBar />
			<LoginText variant='h4'>
				Create a playlist based on your favorite artists, tracks, and genres
				along with different audio qualities through Spotify's Recommendation
				API.
			</LoginText>

			<AppButton
				title='Login to Spotify'
				backgroundColor='#1DB954'
				href='/login'
			/>
		</Box>
	);
}

export default Login;
