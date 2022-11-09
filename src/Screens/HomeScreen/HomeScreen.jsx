import React from 'react';

import './HomeScreen.css';
import {Link} from 'react-router-dom';
import GenreCategories from '../../Components/GenreCategories/GenreCategories';

const HomeScreen = () => {
	return (
		<div id='home'>
			<Link to='/auth'>
				<div id='fixed-height-1'>
					<p>
						Not registered? Sign up now for a faster checkout and more perks!
					</p>
				</div>
			</Link>
			<div id='fixed-height-2'>
				<p>Free Shipping on Orders of $40 or More</p>
			</div>
			<div
				id='remaining-height'
				onClick={(event) => (window.location.href = '/browse')}
			>
				<h3 className='banner-text-header'>Check out our top picks</h3>
				<Link to='/browse'>
					<div className='banner-button'>
						<button className='btn btn-dark'>Shop Now</button>
					</div>
				</Link>
			</div>
			<GenreCategories />
		</div>
	);
};

export default HomeScreen;
