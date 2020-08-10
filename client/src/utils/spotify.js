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
	spotifyApi
		.getUserPlaylists()
		.then((data) => {
			console.log('User playlists', data);
			return data;
		})
		.catch((err) => {
			console.error(err);
		});
};

export const logOut = () => {
	localStorage[accessTokenKey] = '';
	localStorage[refreshTokenKey] = '';
};
