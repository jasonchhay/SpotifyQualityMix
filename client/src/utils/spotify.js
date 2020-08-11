import SpotifyWebApi from 'spotify-web-api-js';
import { getHashParams } from './helpers';
import { accessTokenKey, refreshTokenKey } from './variables';

const spotifyApi = new SpotifyWebApi();

export const getAccessToken = () => {
	return localStorage[accessTokenKey];
};

export const setAccessToken = (token) => {
	spotifyApi.setAccessToken(token);
};

export const getPlaylists = async () => {
	try {
		return await spotifyApi.getUserPlaylists();
	} catch (err) {
		console.error(err);
	}
};

export const getLibrary = async () => {
	try {
		console.log('Reached library');
		return await spotifyApi.getMySavedTracks();
	} catch (err) {
		console.error(err);
	}
};

export const getPlaylistTracks = async (id) => {
	try {
		return await spotifyApi.getPlaylistTracks(id);
	} catch (err) {
		console.error(err);
	}
};

export const logOut = () => {
	localStorage[accessTokenKey] = '';
	localStorage[refreshTokenKey] = '';
};
