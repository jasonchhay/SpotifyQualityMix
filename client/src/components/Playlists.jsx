import React, { useState, useLayoutEffect } from 'react';
import * as spotify from '../utils/spotify';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import PlaylistsCard from './PlaylistsCard';

const useStyles = makeStyles({});

function Playlists(props) {
	const [playlists, setPlaylists] = useState([]);
	const [loading, setLoading] = useState(true);

	const classes = useStyles();

	useLayoutEffect(() => {
		spotify
			.getPlaylists()
			.then((result) => {
				setPlaylists(result.items);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
				setLoading(false);
			});
	}, []);

	return (
		<div>
			<h1>Choose a playlist </h1>
			{!loading && (
				<Grid container space={3}>
					<Grid item xs={3}>
						<PlaylistsCard
							id={'library'}
							name={'Liked songs'}
							image={require('../images/liked_songs.png')}
						/>
					</Grid>
					{playlists.map(({ id, name, images, tracks }) => {
						return (
							<Grid item xs={3} key={id}>
								<PlaylistsCard
									id={id}
									name={name}
									image={images[0] && images[0].url}
									numberTracks={tracks.total}
								/>
							</Grid>
						);
					})}
				</Grid>
			)}
		</div>
	);
}

export default Playlists;
