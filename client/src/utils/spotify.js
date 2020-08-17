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
		return await spotifyApi.getRecommendations(
			limit,
			max,
			min,
			seeds.artists,
			seeds.genres,
			seeds.tracks
		).tracks;
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

export const getTracksFeatureAverages = (tracks) => {
	// Combine values for all features
	var featureValues = [];
	var tempoValue = 0;

	featureTypes.forEach((feature) => {
		featureValues = [...featureValues, { ...feature, value: 0 }];
	});

	tracks.forEach((track) => {
		if (track) {
			featureValues.forEach((item) => {
				item.value += track[item.type];
			});

			tempoValue += track.tempo;
		}
	});

	featureValues.forEach((feature) => {
		feature.value /= tracks.length;
	});

	tempoValue /= tracks.length;

	return { features: featureValues, tempo: tempoValue };
};

export const logOut = () => {
	localStorage[accessTokenKey] = '';
	localStorage[refreshTokenKey] = '';
	window.location.href = '/';
};
