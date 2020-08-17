import React, { useState, useEffect } from 'react';

import * as spotify from '../../utils/spotify';

import AppButton from '../layouts/AppButton';

import { Typography, Slider, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, withStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { FilterSearchResult } from './FilterSearchItems';

import { featureTypes } from '../../utils/variables';
import colors from '../../utils/colors';

const FilterSlider = withStyles({
	root: {
		height: 8,
	},
	thumb: {
		height: 20,
		width: 20,
		backgroundColor: colors.white,
		border: '2px solid currentColor',
		marginTop: -6,
		marginLeft: -10,
		'&:focus, &:hover, &$active': {
			boxShadow: 'inherit',
		},
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 4px)',
	},
	track: {
		height: 8,
		borderRadius: 4,
	},
	rail: {
		height: 8,
		borderRadius: 4,
	},
})(Slider);

const useStyles = makeStyles({
	searchBar: {
		width: '100%',
	},
});

export default function FilterForm({
	limit,
	setLimit,
	filters,
	setFilters,
	seeds,
	setSeeds,
	onFilterClick,
	onMakePlaylistClick,
}) {
	const [query, setQuery] = useState('');

	const [genreSeeds, setGenreSeeds] = useState([]);

	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState({});
	const loading = open && Object.keys(options) === 0;

	// Sliders don't let you use target name for now
	// Need to set a specific handler for every slider
	useEffect(() => {
		var isSubscribed = true;

		(async () => {
			const items = await spotify.getGenreSeeds();
			if (isSubscribed) {
				setGenreSeeds(items);
				setOptions({ genres: [], artists: [], tracks: [] });
			}
		})();

		return () => {
			isSubscribed = false;
		};
	}, []);

	useEffect(() => {
		var isSubscribed = true;

		if (query === '') {
			setOptions({});
			return undefined;
		}

		(async () => {
			const artists = spotify.searchArtist(query);
			const tracks = spotify.searchTrack(query);
			const genres = (async () =>
				genreSeeds.filter((genre) =>
					genre.name.toLowerCase().includes(query.toLowerCase())
				))();

			if (isSubscribed) {
				setOptions({
					genres: await genres,
					artists: await artists,
					tracks: await tracks,
				});
			}
		})();

		return () => {
			isSubscribed = false;
		};
	}, [genreSeeds, query]);

	useEffect(() => {
		if (!open) {
			setOptions({});
		}
	}, [open]);

	const onSliderChange = (event, newValue, type) => {
		setFilters({ ...filters, [type]: newValue });
	};

	const onSearchBarChange = (event, newValue) => {
		setQuery(newValue);
	};

	const onSeedsChange = (event, newValue) => {
		if (newValue.length <= 5) {
			setSeeds(newValue);
		}
	};

	const classes = useStyles();

	return (
		<div>
			<h2>Filter</h2>
			<Autocomplete
				multiple
				id='seed-search-bar'
				className={classes.searchBar}
				open={open}
				onOpen={() => {
					setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				getOptionLabel={(option) => `${option.name}`}
				options={(() => {
					var optionsList = [];

					if (options.genres) optionsList = [...options.genres];
					if (options.artists)
						optionsList = [...optionsList, ...options.artists];
					if (options.tracks) optionsList = [...optionsList, ...options.tracks];

					return optionsList;
				})()}
				filterOptions={(options, state) => options}
				getOptionSelected={(option, value) => option.id === value.id}
				groupBy={(option) =>
					option.category.charAt(0).toUpperCase() + option.category.substring(1)
				}
				loading={loading}
				inputValue={query}
				onInputChange={onSearchBarChange}
				value={seeds}
				onChange={onSeedsChange}
				renderOption={(option) => <FilterSearchResult option={option} />}
				renderInput={(params) => (
					<TextField
						{...params}
						label='Enter a track, artist, or genre to use a seed (Up to 5 total for all)'
						variant='outlined'
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{loading ? (
										<CircularProgress color='inherit' size={20} />
									) : null}
									{params.InputProps.endAdornment}
								</React.Fragment>
							),
						}}
					/>
				)}
			/>

			<div>
				{featureTypes.map(({ type, color, range, step }) => {
					return (
						<div key={type}>
							<Typography id='range-slider' gutterBottom>
								{type.charAt(0).toUpperCase() + type.substring(1)}
							</Typography>
							<FilterSlider
								min={range[0]}
								max={range[1]}
								value={filters[type]}
								step={step}
								name={type}
								onChange={(event, newValue) =>
									onSliderChange(event, newValue, type)
								}
								style={{ color: color }}
								valueLabelDisplay='auto'
								aria-labelledby='range-slider'
							/>
						</div>
					);
				})}
			</div>
			<TextField
				value={limit}
				onChange={(event) => setLimit(event.target.value)}
				label='Enter number of tracks'
			/>

			<AppButton
				title='Filter'
				onClick={onFilterClick}
				disabled={seeds.length == 0}
			/>
			<AppButton
				title='Make New Playlist'
				backgroundColor='#0FE2FF'
				onClick={onMakePlaylistClick}
			/>
		</div>
	);
}
