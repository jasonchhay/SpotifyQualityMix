import React, { useEffect } from 'react';
import * as spotify from '../utils/spotify';
import { Link } from 'react-router-dom';

function Playlists(props) {
	const playlists = spotify.getPlaylists();
	console.log('PLaylists: ' + playlists);

	const playlistItems = playlists.map((playlist) => {
		return (
			<div>
				<Link exact to={`/playlist/${playlist.id}`}>
					<img src={playlist.images[1]} alt={`${playlist.name} Image`} />
					<h2>{playlist.name}</h2>
				</Link>
			</div>
		);
	});

	return <div>Choose a playlist </div>;
}

export default Playlists;
