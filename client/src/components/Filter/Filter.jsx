import React, { useState, useEffect } from 'react';
import * as spotify from '../../utils/spotify';
import { makeStyles, withStyles } from '@material-ui/styles';
import { featureTypes } from '../../utils/variables';

import { Box, CircularProgress, Grid } from '@material-ui/core';

import FilterForm from './FilterForm';
import FilterAnalysis from './FilterAnalysis';
import FilterTracks from './FilterTracks';
import FilterMakePlaylistForm from './FilterMakePlaylistForm';

const useStyles = makeStyles({
	container: {
		'& h2': {
			marginBottom: '.5em',
			paddingBottom: '.1em',
			width: '100%',
			borderBottom: '2px solid #ccc',
			fontSize: '2rem',
		},
	},
});

const LoadingOverlay = withStyles({
	root: {
		position: 'fixed',
		top: '0',
		bottom: '0',
		left: '0',
		right: '0',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: 'hsla(0, 0%, 100%, .8)',
		zIndex: 10,
		transition: '.5s ease-in-out',
	},
})(Box);

export default function Filter() {
	const [filters, setFilters] = useState(
		(() => {
			var defaultFilters = {};

			featureTypes.forEach(({ type, range }) => {
				defaultFilters = { ...defaultFilters, [type]: range };
			});

			return defaultFilters;
		})()
	);

	const [tracks, setTracks] = useState([]);
	const [seeds, setSeeds] = useState([]);
	const [features, setFeatures] = useState([]);
	const [limit, setLimit] = useState(20);
	const [loading, setLoading] = useState(false);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		var isSubscribed = true;

		if (tracks.length === 0) {
			return undefined;
		}

		(async () => {
			const featureResults = await spotify.getTracksFeatureAverages(tracks);
			console.log(featureResults);

			if (isSubscribed) {
				setFeatures(featureResults);
				setLoading(false);
			}
		})();

		return () => {
			isSubscribed = false;
		};
	}, [tracks]);

	const onFilterClick = () => {
		setLoading(true);
		const seedsObject = { artists: [], genres: [], tracks: [] };

		const max = {};
		const min = {};

		seeds.forEach((seed) => {
			seedsObject[seed.category].push(seed.id);
		});

		console.log(filters);

		Object.keys(filters).forEach((key) => {
			max[`max_${key}`] = filters[key][1];
			min[`min_${key}`] = filters[key][0];
		});

		(async () => {
			setTracks(await spotify.getRecommendations(limit, max, min, seedsObject));
		})();
	};

	const onMakePlaylistClick = () => {
		setOpen(true);
	};

	const classes = useStyles();

	return (
		<div className={`${classes.container}`}>
			{loading && (
				<LoadingOverlay>
					<CircularProgress />
				</LoadingOverlay>
			)}
			<Grid container spacing={10}>
				<FilterMakePlaylistForm
					open={open}
					setOpen={setOpen}
					tracks={tracks}
					seeds={seeds}
				/>
				<Grid item xs={12}>
					<FilterForm
						limit={limit}
						setLimit={setLimit}
						filters={filters}
						setFilters={setFilters}
						seeds={seeds}
						setSeeds={setSeeds}
						onFilterClick={onFilterClick}
						onMakePlaylistClick={onMakePlaylistClick}
						tracks={tracks}
					/>
					{features.length > 0 && tracks.length > 0 && (
						<FilterAnalysis features={features} />
					)}
					{features.length > 0 && tracks.length > 0 && (
						<FilterTracks tracks={tracks} />
					)}
				</Grid>
			</Grid>
		</div>
	);
}
