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
	const [filters, setFilters] = useState(() => {
		var defaultFilters = {};

		featureTypes.forEach(({ type }) => {
			defaultFilters = { ...defaultFilters, [type]: [0, 100] };
		});

		console.log(defaultFilters);
		return defaultFilters;
	});

	const [tracks, setTracks] = useState([]);
	const [seeds, setSeeds] = useState([]);

	const [features, setFeatures] = useState([]);

	const [total, setTotal] = useState(20);

	const [isSubscribed, setIsSubscribed] = useState(true);

	/*
	const getAverageFeatures = (id) => {
		if (id === 'library') {
			// Get user's saved library
			spotify
				.getEntireLibraryFeatures()
				.then((results) => {
					if (isSubscribed) {
						const featureResults = spotify.getTracksFeatureAverages(results);
						setFeatures(featureResults.features);
						setTempo(featureResults.tempo);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			// Get playlist tracks
			spotify
				.getEntirePlaylistFeatures(id)
				.then((results) => {
					if (isSubscribed) {
						const featureResults = spotify.getTracksFeatureAverages(results);
						setFeatures(featureResults.features);
						setTempo(featureResults.tempo);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
  */

	const classes = useStyles();

	return (
		<div className={`${classes.container}`}>
			<FilterForm
				filters={filters}
				setFilters={setFilters}
				seeds={seeds}
				setSeeds={setSeeds}
			/>
			{features.length > 0 && <FilterAnalysis features={features} />}
			{tracks.length > 0 && <FilterTracks tracks={tracks} total={total} />}
		</div>
	);
}
