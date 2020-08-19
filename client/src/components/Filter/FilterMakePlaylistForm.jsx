import React, { useState } from 'react';
import * as spotify from '../../utils/spotify';

import {
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	TextField,
	Button,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';
import Loading from '../layouts/Loading';

function FilterMakePlaylistForm({ open, setOpen, tracks, seeds }) {
	const [playlistForm, setPlayListForm] = useState({
		name: '',
		description: '',
		collaborative: false,
		private: false,
	});

	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleClose = () => {
		setOpen(false);
		setLoading(false);
		setSuccess(false);
	};

	const handlePlaylistFormChange = (event) => {
		setPlayListForm({
			...playlistForm,
			[event.target.name]:
				event.target.type === 'checkbox'
					? event.target.checked
					: event.target.value,
		});
	};

	const handlePlaylistFormSubmit = (event) => {
		if (playlistForm.name === '') {
			return undefined;
		}

		setLoading(true);

		(async () => {
			const { name, isPrivate, isCollaborative, description } = playlistForm;
			const result = await spotify.createPopulatedPlaylist(
				name,
				isPrivate,
				isCollaborative,
				description,
				tracks.map((track) => track.uri)
			);

			if (result.snapshot_id) {
				setLoading(false);
				setSuccess(true);
			}
		})();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>Create a Playlist</DialogTitle>
			<DialogContent>
				<TextField
					required
					autoFocus
					variant='filled'
					name='name'
					label='Playlist Name'
					fullWidth
					value={playlistForm.name}
					onChange={handlePlaylistFormChange}
				/>
				<TextField
					variant='filled'
					name='description'
					label='Playlist Description'
					multiline
					fullWidth
					value={playlistForm.description}
					onChange={handlePlaylistFormChange}
					style={{ marginBottom: '.5rem' }}
				/>
				<FormGroup row>
					<FormControlLabel
						control={
							<Checkbox
								checked={playlistForm.isPrivate || false}
								onChange={handlePlaylistFormChange}
								name='isPrivate'
								color='primary'
							/>
						}
						label='Private'
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={playlistForm.isCollaborative || false}
								disabled={!playlistForm.isPrivate}
								onChange={handlePlaylistFormChange}
								name='isCollaborative'
								color='primary'
							/>
						}
						label='Collaborative'
					/>
				</FormGroup>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='primary'>
					Cancel
				</Button>
				<Button onClick={handlePlaylistFormSubmit} color='primary'>
					Create
				</Button>
			</DialogActions>
			{(loading || success) && (
				<Loading
					position='absolute'
					loading={loading}
					success={success}
					successMessage={'Playlist created successfully'}
				/>
			)}
		</Dialog>
	);
}

export default FilterMakePlaylistForm;
