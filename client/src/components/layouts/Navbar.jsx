import React, { useState, useLayoutEffect } from 'react';

import { Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import * as spotify from '../../utils/spotify';
import { githubRepo } from '../../utils/variables';
import colors from '../../utils/colors';

const useStyles = makeStyles({
	container: {
		backgroundColor: colors.darkGray,
		width: '100%',
		height: '2rem',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '1rem 0 1rem',
		zIndex: '15',
		position: 'relative',
	},

	profile: (props) => ({
		display: 'inline-flex',
		alignItems: 'center',
		visibility: props.loggedIn ? 'visible' : 'hidden',

		'& p': {
			color: colors.white,
			paddingRight: '1.5rem',
		},
	}),

	github: {
		color: colors.white,
		border: 'none',
		backgroundColor: 'inherit',
		marginLeft: '.5rem',
		fontSize: '2.5rem',
		cursor: 'pointer',
		transition: '.2s ease-in',

		'&:hover': {
			color: '#bbb',
		},

		'&:active': {
			color: '#999',
		},
	},
});

const LogoutButton = withStyles({
	root: {
		color: colors.white,
		borderRadius: '2rem',
		transition: '.2s ease-in',
		marginRight: '1rem',

		'&:hover': {
			backgroundColor: colors.white,
			color: colors.black,
		},
	},
	outlined: {
		border: `2px ${colors.white} solid`,
	},
	text: {
		display: 'flex',
		alignItems: 'center',

		'& .image-container': {
			display: 'flex',
			marginRight: '.5rem',
			'& > img': {
				height: '1.5rem',
			},
		},
	},
})(Button);

export default function Navbar({ loggedIn }) {
	const [displayName, setDisplayName] = useState('');

	useLayoutEffect(() => {
		if (loggedIn) {
			spotify
				.setProfile()
				.then((result) => {
					setDisplayName(result);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [loggedIn]);

	const handleLogOut = () => {
		spotify.logOut();
		window.location.replace('/');
	};

	const classes = useStyles({ loggedIn });
	return (
		<div className={`${classes.container}`}>
			<a
				href={githubRepo}
				className={`${classes.github}`}
				target='_blank'
				rel='noopener noreferrer'>
				<FontAwesomeIcon icon={faGithub} />
			</a>

			{displayName && (
				<div className={`${classes.profile}`}>
					<p>Logged in as {displayName}</p>
					<LogoutButton
						id='spotify-menu'
						variant='outlined'
						size='medium'
						disableElevation={true}
						disableRipple={true}
						onClick={handleLogOut}>
						Log Out
					</LogoutButton>
				</div>
			)}
		</div>
	);
}
