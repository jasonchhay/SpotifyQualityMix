var express = require('express');
var router = express.Router();

var querystring = require('querystring');
var axios = require('axios');

var client_id = '9f52bf78e99142d0985d7027ddadc584'; // Your client id
var client_secret = 'a4529b419153405292d05493e287e66d'; // Your secret

var REDIRECT_URI = 'http://localhost:8888/api/callback'; // Your redirect uri
var FRONTEND_URI = 'http://localhost:3000/redirect';
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
	var text = '';
	var possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

var stateKey = 'spotify_auth_state';

// @route GET api/auth
// @desc Logins to the Spotfiy client
router.get('/login', function (req, res) {
	var state = generateRandomString(16);
	res.cookie(stateKey, state);
	// your application requests authorization
	var scopes = [
		'user-read-private',
		'user-read-email',
		'playlist-read-private',
		'playlist-read-collaborative',
		'playlist-modify-public',
		'playlist-modify-private',
	];

	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: client_id,
				scope: scopes.join(' '),
				redirect_uri: REDIRECT_URI,
				state: state,
			})
	);
});

// @route GET api/callback
// @desc Redirects to callback URL with access token and refresh token

router.get('/callback', function (req, res) {
	// your application requests refresh and access tokens
	// after checking the state parameter

	var code = req.query.code || null;
	var state = req.query.state || null;
	var storedState = req.cookies ? req.cookies[stateKey] : null;

	console.log(req.cookie);

	if (state === null || state !== storedState) {
		res.redirect(
			`${FRONTEND_URI}/#${querystring.stringify({
				error: 'state_mismatch',
			})}`
		);
	} else {
		res.clearCookie(stateKey);

		var authOptions = {
			url: 'https://accounts.spotify.com/api/token',
			method: 'post',
			params: {
				code,
				redirect_uri: REDIRECT_URI,
				grant_type: 'authorization_code',
			},
			headers: {
				Authorization:
					'Basic ' +
					Buffer.from(client_id + ':' + client_secret).toString('base64'),
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		};

		axios(authOptions)
			.then((response) => {
				console.log(response.data);
				const body = response.data;

				// get the access token and refresh token
				var access_token = body.access_token,
					refresh_token = body.refresh_token;

				// Get the user profile
				var options = {
					headers: { Authorization: 'Bearer ' + access_token },
					json: true,
				};

				// use the access token to access the Spotify Web API
				axios.get('https://api.spotify.com/v1/me', options).then((response) => {
					console.log(response.data);
				});

				// we can also pass the token to the browser to make requests from there
				res.redirect(
					`${FRONTEND_URI}/#${querystring.stringify({
						access_token: access_token,
						refresh_token: refresh_token,
					})}`
				);
			})
			.catch((error) => {
				console.log(error);
				res.redirect(
					`${FRONTEND_URI}/#${querystring.stringify({
						error: 'invalid_token',
					})}`
				);
			});
	}
});

router.get('/refresh_token', function (req, res) {
	// requesting access token from refresh token
	var refresh_token = req.query.refresh_token;
	var authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		method: 'post',
		headers: {
			Authorization:
				'Basic ' +
				Buffer.from(client_id + ':' + client_secret).toString('base64'),
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		params: {
			grant_type: 'refresh_token',
			refresh_token,
		},
		json: true,
	};

	axios(authOptions)
		.then((response) => {
			const body = response.data;
			var access_token = body.access_token;
			res.send({
				access_token: access_token,
			});
		})
		.catch((error) => {
			console.log(error.message);
		});
});

module.exports = router;
