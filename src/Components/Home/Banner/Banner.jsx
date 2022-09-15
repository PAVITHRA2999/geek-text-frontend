import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Banner.css';
import Carousel, {CarouselItem} from '../../Cart/Carousel/Carousel';

import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import SavedItem from '../../Cart/SavedItem/SavedItem';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import FortOutlinedIcon from '@mui/icons-material/FortOutlined';
import Book from '../../Book/Book';

export const Banner = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const offset = 4;

	const handleUpdateIndexCallback = (newIdx) => {
		const newIndex = newIdx;
		setActiveIndex(newIndex);
	};
	const val = false;

	return (
		<div>
			<div className='banner-text'>
				<div className='banner-wrap banner-wrap-small'>
					<p>Free Shipping on Orders of $40 or More</p>
				</div>
				<Link to='/browse'>
					<div className='banner-wrap banner-wrap-medium'>
						<h3 className='banner-text-header'>Check out our top sellers</h3>
					</div>
				</Link>

				<div className='banner-items'>
					<div className='banner-item'>
						<div className='banner-icon'>
							<TheaterComedyOutlinedIcon fontSize='inherit' />
							<p>Novel</p>
						</div>
					</div>
					<div className='banner-item'>
						<div className='banner-icon'>
							<SentimentVerySatisfiedOutlinedIcon fontSize='inherit' />
							<p>Humour</p>
						</div>
					</div>
					<div className='banner-item'>
						<div className='banner-icon'>
							<PortraitOutlinedIcon fontSize='inherit' />
							<p>Autobiography</p>
						</div>
					</div>

					<div className='banner-item'>
						<div className='banner-icon'>
							<FortOutlinedIcon fontSize='inherit' />
							<p>Fantasy</p>
						</div>
					</div>

					<div className='banner-item'>
						<div className='banner-icon'>
							<BiotechOutlinedIcon fontSize='inherit' />
							<p>Non-Fiction</p>
						</div>
					</div>
					<div className='banner-item'>
						<div className='banner-icon'>
							<HistoryEduOutlinedIcon fontSize='inherit' />
							<p>Poetry</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
