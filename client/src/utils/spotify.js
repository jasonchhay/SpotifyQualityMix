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

export const getGenreSeeds = async (query) => {
	try {
		return await spotifyApi.getGenreSeeds().genres;
	} catch (err) {
		console.error(err);
	}
};

export const searchTrack = async (query) => {
	try {
		return await (await spotifyApi.searchTracks(query)).tracks;
	} catch (err) {
		console.error(err);
	}
};

export const searchArtist = async (query) => {
	try {
		return await spotifyApi.searchArtists(query).artists;
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

export const createPlaylist = async (
	name,
	public,
	collaborative,
	description
) => {
	try {
		return await spotifyApi.createPlaylist(
			name,
			public,
			collaborative,
			description
		);
	} catch (err) {
		console.error(err);
	}
};

export const addTracksToPlaylist = async (uris) => {
	try {
		return await spotifyApi.addTracksToPlaylist(uris);
	} catch (err) {
		console.error(err);
	}
};

/*
    @TODO add implementation for the following:
    * Search query API for seed tracks and artists
    * Get genre seeds
    * Use recommendation API
    * Generate playlist based on results for user
*/

export const logOut = () => {
	localStorage[accessTokenKey] = '';
	localStorage[refreshTokenKey] = '';
	window.location.href = '/';
};
