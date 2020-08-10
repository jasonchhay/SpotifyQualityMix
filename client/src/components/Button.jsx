import React from 'react';
import { Button } from '@material-ui/core';

function AppButton({
	title,
	image = null,
	color = '#fff',
	backgroundColor = '#000',
	...otherProps
}) {
	const style = {
		container: {
			backgroundColor: backgroundColor,
			color: color,
			padding: '.5rem 1.5rem',
			borderRadius: '2rem',
			margin: '1em',
			boxShadow: '0 2px 2px rgba(0, 0, 0, 0.25)',
		},
	};

	return (
		<Button className='button' {...otherProps} style={style.container}>
			{image}
			{title}
		</Button>
	);
}

export default AppButton;
