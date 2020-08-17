import SpotifyWebApi from 'spotify-web-api-js';
import { accessTokenKey, refreshTokenKey, featureTypes } from './variables';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi();

export const getAccessToken = () => {
	return localStorage[accessTokenKey];
};

const getRefreshToken = () => {
	return localStorage[refreshTokenKey];
};

const refreshToken = async () => {
	axios
		.get(`/refresh_token${getRefreshToken()}`)
		.then(({ access_token }) => {
			localStorage[accessTokenKey] = access_token;
			spotifyApi.setAccessToken(access_token);
		})
		.catch((err) => {
			console.error(err);
		});
};

export const setAccessToken = (token) => {
	spotifyApi.setAccessToken(token);
};

export const getProfileName = async () => {
	try {
		const result = await spotifyApi.getMe();
		return result.display_name;
	} catch (err) {
		console.error(err);
		logOut();
	}
};

export const getGenreSeeds = async () => {
	try {
		const results = (await spotifyApi.getAvailableGenreSeeds()).genres;

		return results.map((genre) => ({
			category: 'genres',
			id: genre,
			name: genre
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.substring(1))
				.join(' '),
		}));
	} catch (err) {
		console.error(err);
	}
};

export const searchTrack = async (query) => {
	try {
		const results = await (await spotifyApi.searchTracks(query, { limit: 10 }))
			.tracks.items;

		return results.map((track) => ({
			category: 'tracks',
			id: track.id,
			name: track.name,
			artist: track.artists.map((artist) => artist.name),
			image: track.album.images.length > 0 && track.album.images[0].url,
		}));
	} catch (err) {
		console.error(err);
	}
};

export const searchArtist = async (query) => {
	try {
		const results = (await spotifyApi.searchArtists(query, { limit: 5 }))
			.artists.items;

		return results.map((artist) => ({
			category: 'artists',
			id: artist.id,
			name: artist.name,
			image: artist.images.length > 0 && artist.images[0].url,
		}));
	} catch (err) {
		console.error(err);
	}
};

export const getRecommendations = async (limit, max, min, seeds) => {
	try {
		console.log({
			limit,
			...max,
			...min,
			seed_artists: seeds.artists.join(','),
			seed_genres: seeds.genres.join(','),
			seed_tracks: seeds.tracks.join(','),
		});

		const response = await spotifyApi.getRecommendations({
			limit,
			...max,
			...min,
			seed_artists: seeds.artists.join(','),
			seed_genres: seeds.genres.join(','),
			seed_tracks: seeds.tracks.join(','),
		});

		return response.tracks;
	} catch (err) {
		console.error(err);
	}
};

export const createPopulatedPlaylist = async (
	{ name, isPublic, collaborative, description },
	uris
) => {
	try {
		const result = await spotifyApi.createPlaylist(
			name,
			isPublic,
			collaborative,
			description
		);

		return await spotifyApi.addTracksToPlaylist(result.id, uris);
	} catch (err) {
		console.error(err);
	}
};

export const getTracksFeatureAverages = async (tracks) => {
	// Combine values for all features
	var featureValues = [];

	const trackFeatures = (
		await spotifyApi.getAudioFeaturesForTracks(tracks.map((track) => track.id))
	).audio_features;

	featureTypes.forEach((feature) => {
		featureValues = [...featureValues, { ...feature, value: 0 }];
	});

	trackFeatures.forEach((track) => {
		if (track) {
			featureValues.forEach((item) => {
				item.value += track[item.type];
			});
		}
	});

	const totalPopularity = (
		await spotifyApi.getTracks(tracks.map((track) => track.id))
	).tracks
		.map((track) => track.popularity)
		.reduce((total, currentValue) => {
			return total + currentValue;
		});
	featureValues[0].value = totalPopularity;

	featureValues.forEach((feature) => {
		feature.value /= tracks.length;
	});

	return featureValues;
};

export const logOut = () => {
	localStorage[accessTokenKey] = '';
	localStorage[refreshTokenKey] = '';
	window.location.href = '/';
};
