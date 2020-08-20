import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { featureTypes } from '../../utils/variables';

function HeaderBar(props) {
	return (
		<Grid container>
			{featureTypes.map(({ color }) => (
				<Grid item xs key={color}>
					<Box bgcolor={color} height={12} />
				</Grid>
			))}
		</Grid>
	);
}

export default HeaderBar;
