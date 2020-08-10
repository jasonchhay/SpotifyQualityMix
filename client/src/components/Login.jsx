import React from 'react';

import Button from './Button';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

function Login(props) {
	return (
		<div>
			<h1>QualityMix</h1>
			<Button
				title='Login to Spotify'
				backgroundColor='#1DB954'
				href='http://localhost:8888/api/login'
			/>
			<Button
				title='View on Github'
				image={<AccessAlarmIcon />}
				href='http://localhost:8888/api/login'
			/>
		</div>
	);
}

export default Login;
