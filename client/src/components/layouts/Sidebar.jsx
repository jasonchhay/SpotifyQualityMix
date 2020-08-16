import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import * as spotify from '../../utils/spotify';

import colors from '../../utils/colors';
import { githubRepo } from '../../utils/variables';

const useStyles = makeStyles({
	container: {
		backgroundColor: colors.darkGray,
		width: '4.5rem',
		position: 'fixed',
		zIndex: 1,
		left: 0,
		top: 0,
		bottom: 0,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '1rem 0 1rem',
	},

	avatarContainer: (props) => ({
		width: '2.5rem',
		height: '2.5rem',
		borderRadius: '2rem',
		overflow: 'hidden',
		visibility: props.loggedIn ? 'visible' : 'hidden',

		'& img': {
			width: '100%',
		},

		'&:hover': {
			backgroundColor: 'hsla(0, 0%, 100%, 1)',
		},
	}),

	githubLogo: {
		width: '2.5rem',
	},
});

function Sidebar({ loggedIn, avatar }) {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogOut = () => {
		spotify.logOut();
		window.location.replace('/');
	};

	const classes = useStyles({ loggedIn });
	return (
		<div className={`${classes.container}`}>
			<Button
				aria-controls='spotify-menu'
				aria-haspopup='true'
				onClick={handleClick}>
				<div className={`${classes.avatarContainer}`}>
					<img
						src={'https://avatars3.githubusercontent.com/u/28989541?s=460&v=4'}
						alt='Spotify Avatar'
					/>
				</div>
			</Button>
			<Menu
				id='spotify-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<MenuItem onClick={handleLogOut}>Logout</MenuItem>
			</Menu>

			<a href={githubRepo} target='_blank' rel='noopener noreferrer'>
				<img
					className={`${classes.githubLogo}`}
					src={require('../../images/github_logo.png')}
					alt='GitHub Repository Link'
				/>
			</a>
		</div>
	);
}

export default Sidebar;
