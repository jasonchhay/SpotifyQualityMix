import React from 'react';
import FilterTrackCard from './FiltlerTrackCard';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import colors from '../../utils/colors';
// import { makeStyles } from '@material-ui/styles';

// 		background: `linear-gradient(${colors.black}, #000)`,
const TracksGrid = withStyles({
	root: {
		background: `linear-gradient(${colors.black}, #000)`,
	},
})(Grid);

export default function FilterTracks({ tracks }) {
	return (
		<div>
			<h2>Tracks</h2>
			<TracksGrid>
				{tracks.length > 0 &&
					tracks.map((track) => (
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
			</TracksGrid>
		</div>
	);
}
