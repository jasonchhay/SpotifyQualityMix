import React from 'react';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const featureClasses = makeStyles({
	barGraph: {
		'& h4': {
			margin: 0,
		},
		'& .bar': {
			height: '15px',
			marginBottom: '5px',
			width: '0',
			transition: 'width 1s ease-in-out',
		},
	},
});

const useStylesBootstrap = makeStyles({
	arrow: {
		color: '#000',
	},
	tooltip: {
		backgroundColor: '#000',
	},
});

function BootstrapTooltip(props) {
	const classes = useStylesBootstrap();
	return <Tooltip arrow classes={classes} {...props} />;
}

export default function FilterAnalysis({ features }) {
	const classes = featureClasses();

	return (
		<div className='playlist-info-features'>
			<h2>Analysis</h2>
			{features.length > 0 &&
				features.map(({ type, value, color, range }) => (
					<div key={type} className={classes.barGraph}>
						<h4>
							{type}{' '}
							{type === 'tempo' ? `${Math.ceil(value)} BPM` : value.toFixed(3)}
						</h4>
						<BootstrapTooltip title={`${type}: ${value}`} placement='top'>
							<div
								className='bar'
								style={{
									width: `${100 * (value / range[1])}%`,
									backgroundColor: color,
								}}
							/>
						</BootstrapTooltip>
					</div>
				))}
		</div>
	);
}
