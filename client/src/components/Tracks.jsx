import React, { useState, useEffect } from 'react';
import * as spotify from '../utils/spotify';

function Tracks({ match }) {
	const [tracks, setTracks] = useState([]);

	useEffect(() => {
		const id = match.params.id;

		if (id === 'library') {
			// Get user's saved library
			spotify
				.getLibrary()
				.then((results) => {
					setTracks(results.items);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			// Get playlist tracks
			spotify
				.getPlaylistTracks(id)
				.then((results) => {
					setTracks(results.items);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	return <div>{tracks.length}</div>;
}

export default Tracks;
