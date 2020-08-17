import React, { useState, useEffect } from 'react';
import * as spotify from '../../utils/spotify';
import { makeStyles } from '@material-ui/styles';

import { featureTypes } from '../../utils/variables';

import FilterForm from './FilterForm';
import FilterAnalysis from './FilterAnalysis';
import FilterTracks from './FilterTracks';

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

	useEffect(() => {
		var isSubscribed = true;

		if (tracks.length === 0) {
			return undefined;
		}

		(async () => {
			const featureResults = await spotify.getTracksFeatureAverages(tracks);
			console.log(featureResults);

			if (isSubscribed) setFeatures(featureResults);
		})();

		return () => {
			isSubscribed = false;
		};
	}, [tracks]);

	const onFilterClick = () => {
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

		console.log(min);
		console.log(max);

		(async () => {
			setTracks(await spotify.getRecommendations(limit, max, min, seedsObject));
		})();
	};

	const onMakePlaylistClick = () => {};

	const classes = useStyles();

	return (
		<div className={`${classes.container}`}>
			<FilterForm
				limit={limit}
				setLimit={setLimit}
				filters={filters}
				setFilters={setFilters}
				seeds={seeds}
				setSeeds={setSeeds}
				onFilterClick={onFilterClick}
				onMakePlaylistClick={onMakePlaylistClick}
			/>
			{features.length > 0 && <FilterAnalysis features={features} />}
			{tracks.length > 0 && <FilterTracks tracks={tracks} />}
		</div>
	);
}
