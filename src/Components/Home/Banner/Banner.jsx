import React from 'react';
import {Link} from 'react-router-dom';
import './Banner.css';
export const Banner = () => {
	return (
		<div>
			<div className='banner-container'></div>
			<div className='banner-text'>
				<h3 className='banner-text-header'>Find your new favorite book!</h3>
				<Link to='/browse' className='Router_Link'>
					<button className='btn btn-check-newbooks'>
						Check our top picks
					</button>
				</Link>
			</div>
		</div>
	);
};
