import React from 'react';
import FilterTrackCard from './FiltlerTrackCard';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export default function FilterTracks({ tracks, total }) {
	return (
		<div>
			<h2>Tracks</h2>
			<Grid container space={1}>
				{tracks.length > 0 &&
					tracks.map(({ track }) => (
						<Grid item key={track.id}>
							<FilterTrackCard
								title={track.name}
								url={track.external_urls.spotify}
								image={
									track.album.images.length > 0 && track.album.images[0].url
								}
								artist={track.album.artists
									.map((artist) => artist.name)
									.join(', ')}
							/>
						</Grid>
					))}
			</Grid>
		</div>
	);
}
