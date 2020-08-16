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

export const getPlaylists = async () => {
	try {
		return await spotifyApi.getUserPlaylists();
	} catch (err) {
		console.error(err);

		if (err.status === 401) {
			logOut();
		}
	}
};

export const getLibrary = async (options, filters = null) => {
	try {
		const results = await spotifyApi.getMySavedTracks(options);
		return results;
	} catch (err) {
		console.error(err);

		if (err.status === 401) {
			logOut();
		}
	}
};

export const getEntireLibraryFeatures = async () => {
	try {
		var result;
		var offset = 0;
		const limit = 50;
		var features = [];

		do {
			result = await spotifyApi.getMySavedTracks({ limit, offset });
			features = features.concat(await getAllTrackFeatures(result.items));
			offset += limit;
		} while (result.next != null);

		return features;
	} catch (err) {
		console.error(err);

		if (err.status === 401) {
			logOut();
		}
	}
};

export const getPlaylist = async (id) => {
	try {
		return await spotifyApi.getPlaylist(id);
	} catch (err) {
		console.log(err);
	}
};

export const getPlaylistTracks = async (id, options, filters = null) => {
	try {
		if (filters == null) {
			const results = await spotifyApi.getPlaylistTracks(id, options);
			return results;
		} else {
			var i = options.limit;
			var offset = 0;
			var track = null;
			var tracks = {};
			do {
				const results = await spotifyApi.getPlaylistTracks(id, options);
				offset += 1;

				if (tracks.items.length > 0) {
				} else {
					break;
				}
			} while (track);
		}
	} catch (err) {
		console.error(err);

		if (err.status === 401) {
			logOut();
		}
	}
};

export const getEntirePlaylistFeatures = async (id, filters = null) => {
	try {
		var result;
		var offset = 0;
		const limit = 50;
		var features = [];

		do {
			result = await spotifyApi.getPlaylistTracks(
				id,
				{ limit, offset },
				filters
			);
			features = features.concat(await getAllTrackFeatures(result.items));
			offset += limit;
		} while (result.next != null);

		return features;
	} catch (err) {
		console.error(err);

		if (err.status === 401) {
			logOut();
		}
	}
};

export const getTrackFeatures = async (id) => {
	try {
		return await spotifyApi.getAudioFeaturesForTrack(id);
	} catch (err) {
		console.error(err);

		if (err.status === 401) {
			logOut();
		}
	}
};

export const getAllTrackFeatures = async (tracks) => {
	try {
		var result;
		var features = [];
		const trackIds = tracks.map((item) => item.track.id);
		result = await spotifyApi.getAudioFeaturesForTracks(trackIds);
		features = result.audio_features;

		return features;
	} catch (err) {
		console.error(err);

		if (err.status === 401) {
			logOut();
		}
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

/*
    @TODO add implementation for the following:
    * Retrieve qualities for songs on current page
    * Filter library/playlist down based on qualities
    * Create a playlist and add filtered songs
    * Refresh token when authenticated token is expired
    * Setup Redux
*/

export const logOut = () => {
	localStorage[accessTokenKey] = '';
	localStorage[refreshTokenKey] = '';
	window.location.href = '/';
};
