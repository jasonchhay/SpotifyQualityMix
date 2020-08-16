import React, { useState, useEffect } from 'react';
import * as spotify from '../utils/spotify';

import AppButton from './AppButton';
import TrackCard from './TrackCard';

import { Grid, Tooltip, Typography, Slider } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/styles';

import { featureTypes } from '../utils/variables';

const headerClasses = makeStyles({
	playlistInfo: {
		display: 'inline-flex',

		'& .playlist-info-image': {
			width: '20vw',
			marginRight: '2vw',
		},

		'& .playlist-info-text': {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-end',
			'& h1': {
				margin: 0,
			},
		},
	},
});

function TracksHeader({ metadata }) {
	const classes = headerClasses();

	return (
		<div className={`${classes.playlistInfo}`}>
			<img
				className='playlist-info-image'
				src={metadata.image}
				alt={`${metadata.title} Image`}
			/>
			<div className='playlist-info-text'>
				<div>
					<h1>{metadata.title}</h1>
					{metadata.owner && (
						<p>
							Made by <a href={metadata.ownerUrl}>{metadata.owner}</a>
						</p>
					)}
					{metadata.description && <p>{metadata.description}</p>}
					<AppButton
						title={'View on Spotify'}
						href={metadata.url}
						backgroundColor='#1DB954'
					/>
				</div>
			</div>
		</div>
	);
}

const featureClasses = makeStyles({
	barGraph: {
		'& h4': {
			margin: 0,
		},
		'& .bar': {
			height: '15px',
			marginBottom: '5px',
			transition: 'width 1s ease-in',
		},
	},
});

function TracksFeatures({ features }) {
	const classes = featureClasses();

	return (
		<div className='playlist-info-features'>
			<h2>Qualities</h2>
			{features.length > 0 &&
				features.map(
					({ type, value, color }) =>
						type !== 'tempo' && (
							<div key={type} className={classes.barGraph}>
								<h4>
									{type} ({`${(value * 100).toFixed(2)}%`})
								</h4>
								<BootstrapTooltip title={`${type}: ${value}`} placement='top'>
									<div
										className='bar'
										style={{
											width: `${100 * value}%`,
											backgroundColor: color,
										}}
									/>
								</BootstrapTooltip>
							</div>
						)
				)}
		</div>
	);
}

function TracksFilters(props) {
	const [filters, setFilters] = useState(() => {
		var defaultFilters = {};

		featureTypes.forEach(({ type }) => {
			defaultFilters = { ...defaultFilters, [type]: [0, 100] };
		});

		console.log(defaultFilters);
		return defaultFilters;
	});

	const [handleChange, setHandleChange] = useState({});

	// Sliders don't let you use target name for now
	// Need to set a specific handler for every slider
	useEffect(() => {
		setHandleChange(() => {
			const handleChangeFunctions = {};

			featureTypes.forEach(({ type }) => {
				handleChangeFunctions[type] = (event, newValue) => {
					setFilters({ ...filters, [type]: newValue });
				};
			});

			return handleChangeFunctions;
		});
	}, []);

	return (
		<div>
			<h2>Filter</h2>
			{featureTypes.map(({ type, color }) => {
				return (
					<div key={type}>
						<Typography id='range-slider' gutterBottom>
							{type}
						</Typography>
						<Slider
							min={0}
							max={100}
							value={[0, 100]}
							step={0.1}
							name={type}
							value={filters[type]}
							onChange={handleChange[type]}
							valueLabelDisplay='auto'
							aria-labelledby='range-slider'
						/>
					</div>
				);
			})}

			<AppButton title='Filter' />
			<AppButton title='Make New Playlist' backgroundColor='#0FE2FF' />
		</div>
	);
}

function TracksList({ tracks, total, limit, onPaginationChange }) {
	return (
		<div>
			<h2>Tracks</h2>
			<Grid container space={1}>
				{tracks.length > 0 &&
					tracks.map(({ track }) => (
						<Grid item key={track.id}>
							<TrackCard
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

			<Pagination
				count={Math.ceil(total / limit)}
				onChange={onPaginationChange}
				showFirstButton
				showLastButton
			/>
		</div>
	);
}

const containerStyles = makeStyles({
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

const useStylesBootstrap = makeStyles({
	arrow: {
		color: '#000',
	},
	tooltip: {
		backgroundColor: '#000',
	},
});

function BootstrapTooltip(props) {
	const classes = useStylesBootstrap();
	return <Tooltip arrow classes={classes} {...props} />;
}

function Tracks({ match }) {
	const [id, setId] = useState('');
	const [tracks, setTracks] = useState([]);
	const [features, setFeatures] = useState([]);
	const [tempo, setTempo] = useState(null);
	const [isSubscribed, setIsSubscribed] = useState(true);
	const [total, setTotal] = useState(0);

	const [metadata, setMetadata] = useState({});

	const [value, setValue] = useState([0, 100]);

	const limit = 48;

	const getMetaData = (id) => {
		if (id === 'library') {
			if (isSubscribed) {
				setMetadata({
					title: 'Liked songs',
					image: require('../images/liked_songs.png'),
				});
			}
		} else {
			spotify.getPlaylist(id).then((results) => {
				if (isSubscribed) {
					console.log(results);

					setMetadata({
						title: results.name,
						image:
							results.images.length > 0
								? results.images[0].url
								: require('../images/default_playlist.png'),
						description: results.description,
						owner: results.owner.display_name,
						ownerUrl: results.owner.external_urls.spotify,
						url: results.external_urls.spotify,
					});
				}
			});
		}
	};
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
					}
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

	const getTracks = (id, offset = 0) => {
		if (id === 'library') {
			spotify
				.getLibrary({ limit, offset })
				.then((results) => {
					if (isSubscribed) {
						setTotal(results.total);
						setTracks(results.items);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			spotify
				.getPlaylistTracks(id, { limit, offset })
				.then((results) => {
					if (isSubscribed) {
						setTotal(results.total);
						setTracks(results.items);
					}
					console.log(results.items);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	useEffect(() => {
		const paramId = match.params.id;

		setId(paramId);
		getMetaData(paramId);
		getAverageFeatures(paramId);
		getTracks(paramId);

		return () => setIsSubscribed(false);
	}, []);

	const handlePaginationChange = (event, value) => {
		getTracks(id, (value - 1) * limit);
	};

	const classes = containerStyles();

	return (
		<div className={`${classes.container}`}>
			<TracksHeader metadata={metadata} />
			<TracksFeatures features={features} />
			<TracksFilters features={features} />
			<TracksList
				tracks={tracks}
				total={total}
				limit={limit}
				onPaginationChange={handlePaginationChange}
			/>
		</div>
	);
}

export default Tracks;
