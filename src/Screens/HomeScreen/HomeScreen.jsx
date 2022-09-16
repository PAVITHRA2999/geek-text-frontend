import React, {useEffect, useState, useLayoutEffect, useRef} from 'react';

import './HomeScreen.css';
import {Link} from 'react-router-dom';

import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import FortOutlinedIcon from '@mui/icons-material/FortOutlined';
import Carousel from '../../Components/Carousel/Carousel';

const HomeScreen = () => {
	const [, setActiveIndex] = useState(0);

	const handleUpdateIndexCallback = (newIdx) => {
		const newIndex = newIdx;
		setActiveIndex(newIndex);
	};

	const autobiography = useRef(null);
	const fantasy = useRef(null);
	const nonFict = useRef(null);
	const humour = useRef(null);
	const poetry = useRef(null);

	const [autobiographyWidth, setAutobiographyWidth] = useState(0);
	const [fantasyWidth, setFantasyWidth] = useState(0);
	const [nonFictWidth, setNonFictWidth] = useState(0);
	const [humourWidth, setHumourWidth] = useState(0);
	const [poetryWidth, setPoetryWidth] = useState(0);

	const [autobiographyOffsetLeft, setAutobiographyOffsetLeft] = useState(0);
	const [fantasyOffsetLeft, setFantasyOffsetLeft] = useState(0);
	const [nonFictOffsetLeft, setNonFictOffsetLeft] = useState(0);
	const [humourOffsetLeft, setHumourOffsetLeft] = useState(0);
	const [poetryOffsetLeft, setPoetryOffsetLeft] = useState(0);

	useLayoutEffect(() => {
		setAutobiographyWidth(autobiography.current.clientWidth);
		setFantasyWidth(fantasy.current.clientWidth);
		setNonFictWidth(nonFict.current.clientWidth);
		setHumourWidth(humour.current.clientWidth);
		setPoetryWidth(poetry.current.clientWidth);

		setAutobiographyOffsetLeft(autobiography.current.offsetLeft);
		setFantasyOffsetLeft(fantasy.current.offsetLeft);
		setNonFictOffsetLeft(nonFict.current.offsetLeft);
		setHumourOffsetLeft(humour.current.offsetLeft);
		setPoetryOffsetLeft(poetry.current.offsetLeft);
	}, []);

	const findOffset = () => {
		if (isOverflown(autobiographyOffsetLeft, autobiographyWidth)) return 1;
		else if (isOverflown(fantasyOffsetLeft, fantasyWidth)) return 2;
		else if (isOverflown(nonFictOffsetLeft, nonFictWidth)) return 3;
		else if (isOverflown(humourOffsetLeft, humourWidth)) return 4;
		else if (isOverflown(poetryOffsetLeft, poetryWidth)) return 5;
		else return 6;
	};

	function isOverflown(leftWidth, selfWidth) {
		return window.innerWidth < leftWidth + selfWidth;
	}

	return (
		<div id='home'>
			<Link to='/auth'>
				<div id='fixed-height-1'>
					<p>
						Not registered? Sign in now for a faster checkout and more perks!
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

			<div id='bottom-height'>
				<Carousel
					offset={findOffset()}
					handleUpdateIndexCallback={handleUpdateIndexCallback}
					totalLength={6}
					auto
				>
					<div className='carousel-item'>
						<div className='banner-item'>
							<Link to={`/browse/Novel`}>
								<div className='banner-icon'>
									<TheaterComedyOutlinedIcon fontSize='inherit' />
									<p>Novel</p>
								</div>
							</Link>
						</div>
					</div>
					<div className='carousel-item'>
						<div className='banner-item'>
							<Link to={`/browse/Autobiography`}>
								<div className='banner-icon' ref={autobiography}>
									<PortraitOutlinedIcon fontSize='inherit' />
									<p>Autobiography</p>
								</div>
							</Link>
						</div>
					</div>
					<div className='carousel-item'>
						<div className='banner-item'>
							<Link to={`/browse/Fantasy`}>
								<div className='banner-icon' ref={fantasy}>
									<FortOutlinedIcon fontSize='inherit' />
									<p>Fantasy</p>
								</div>
							</Link>
						</div>
					</div>
					<div className='carousel-item'>
						<div className='banner-item'>
							<Link to={`/browse/Non-Fiction`}>
								<div className='banner-icon' ref={nonFict}>
									<BiotechOutlinedIcon fontSize='inherit' />
									<p>Non-Fiction</p>
								</div>
							</Link>
						</div>
					</div>
					<div className='carousel-item'>
						<div className='banner-item'>
							<Link to={`/browse/Humour`}>
								<div className='banner-icon' ref={humour}>
									<SentimentVerySatisfiedOutlinedIcon fontSize='inherit' />
									<p>Humour</p>
								</div>
							</Link>
						</div>
					</div>
					<div className='carousel-item'>
						<div className='banner-item'>
							<Link to={`/browse/Poetry`}>
								<div className='banner-icon' ref={poetry}>
									<HistoryEduOutlinedIcon fontSize='inherit' />
									<p>Poetry</p>
								</div>
							</Link>
						</div>
					</div>
				</Carousel>
			</div>
		</div>
	);
};

export default HomeScreen;
