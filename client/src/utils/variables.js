module.exports = {
	githubRepo: 'https://github.com/jasonchhay/SpotifyQualityMix',
	accessTokenKey: 'spotify_access_token',
	refreshTokenKey: 'spotify_refresh_token',
	userIdKey: 'spotify_user_id',
	featureTypes: [
		{
			type: 'popularity',
			color: '#FF6CB8',
			description:
				'The popularity of a track, based on the total number and recency of plays.',
			labels: ['Very obscure', 'Very popular'],
			range: [0, 100],
			step: 1,
		},
		{
			type: 'acousticness',
			color: '#FFA41C',
			description:
				'Preference for the acousticness/lack of electrical instruments in the track.',
			labels: ['Not acoustic', 'Very acoustic'],
			range: [0, 1],
			step: 0.01,
		},
		{
			type: 'danceability',
			color: '#F93A67',
			description:
				'How suitable a track is for dancing, based on tempo, rhythm, and beat strength.',
			labels: ['Not danceable', 'Very danceable'],
			range: [0, 1],
			step: 0.01,
		},
		{
			type: 'energy',
			color: '#FFE600',
			description:
				'The energy level of a track. The more energetic, the louder, faster, and noisier the track is.',
			labels: ['Not energetic', 'Very energetic'],
			range: [0, 1],
			step: 0.01,
		},
		{
			type: 'instrumentalness',
			color: '#0FE2FF',
			description: 'The likelihood that the track is instrumental.',
			labels: ['Only Vocals', 'Only Instrumental'],
			range: [0, 1],
			step: 0.01,
		},
		{
			type: 'liveness',
			color: '#40FC80',
			description: 'The extent that an audience can be heard in the recording.',
			labels: ['Studio recording', 'Live performance'],
			range: [0, 1],
			step: 0.01,
		},
		{
			type: 'speechiness',
			color: '#1636E1',
			description:
				'The verboseness of a track, specifically with spoken words. Tracks that are in the middle contain both, like rap music.',
			labels: ['Only music/singing', 'Only spoken words'],
			range: [0, 1],
			step: 0.01,
		},
		{
			type: 'valence',
			color: '#BB7EE0',
			description:
				'The positivity of a track, how cheerful does the song sound?',
			labels: ['Very negative', 'Very positive'],
			range: [0, 1],
			step: 0.01,
		},
		{
			type: 'tempo',
			color: '#000',
			description: 'How upbeat the track is.',
			labels: ['Slow', 'Fast'],
			range: [40, 200],
			step: 1,
		},
	],
};
