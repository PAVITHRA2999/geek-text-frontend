import React, { useState, useLayoutEffect, useRef } from 'react';
import { Link } from "react-router-dom";

import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import TheaterComedyOutlinedIcon from '@mui/icons-material/TheaterComedyOutlined';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import FortOutlinedIcon from '@mui/icons-material/FortOutlined';
import Carousel from '../../Components/Carousel/Carousel';

const GenreCategories = () => {

    const [, setActiveIndex] = useState(0);

    const handleUpdateIndexCallback = (newIdx) => {
        const newIndex = newIdx;
        setActiveIndex(newIndex);
    };
    // We listen to the resize event
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--my-vh', `${vh}px`);
    });

    const autobiography = useRef(null);
    const fantasy = useRef(null);
    const nonFict = useRef(null);
    const humor = useRef(null);
    const poetry = useRef(null);

    const [autobiographyWidth, setAutobiographyWidth] = useState(0);
    const [fantasyWidth, setFantasyWidth] = useState(0);
    const [nonFictWidth, setNonFictWidth] = useState(0);
    const [humorWidth, setHumorWidth] = useState(0);
    const [poetryWidth, setPoetryWidth] = useState(0);

    const [autobiographyOffsetLeft, setAutobiographyOffsetLeft] = useState(0);
    const [fantasyOffsetLeft, setFantasyOffsetLeft] = useState(0);
    const [nonFictOffsetLeft, setNonFictOffsetLeft] = useState(0);
    const [humorOffsetLeft, setHumorOffsetLeft] = useState(0);
    const [poetryOffsetLeft, setPoetryOffsetLeft] = useState(0);

    useLayoutEffect(() => {
        setAutobiographyWidth(autobiography.current.clientWidth);
        setFantasyWidth(fantasy.current.clientWidth);
        setNonFictWidth(nonFict.current.clientWidth);
        setHumorWidth(humor.current.clientWidth);
        setPoetryWidth(poetry.current.clientWidth);

        setAutobiographyOffsetLeft(autobiography.current.offsetLeft);
        setFantasyOffsetLeft(fantasy.current.offsetLeft);
        setNonFictOffsetLeft(nonFict.current.offsetLeft);
        setHumorOffsetLeft(humor.current.offsetLeft);
        setPoetryOffsetLeft(poetry.current.offsetLeft);
    }, []);

    const findOffset = () => {
        if (isOverflown(autobiographyOffsetLeft, autobiographyWidth)) return 1;
        else if (isOverflown(fantasyOffsetLeft, fantasyWidth)) return 2;
        else if (isOverflown(nonFictOffsetLeft, nonFictWidth)) return 3;
        else if (isOverflown(humorOffsetLeft, humorWidth)) return 4;
        else if (isOverflown(poetryOffsetLeft, poetryWidth)) return 5;
        else return 6;
    };

    function isOverflown(leftWidth, selfWidth) {
        return window.innerWidth < leftWidth + selfWidth;
    }

    return (<div id='bottom-height'>
        <Carousel
            offset={findOffset()}
            handleUpdateIndexCallback={handleUpdateIndexCallback}
            totalLength={6}
            auto
        >
            <div className='carousel-item'>
                <div className='banner-item'>
                    <Link to={`/browse/Novel/getByTS`}>
                        <div className='banner-icon'>
                            <TheaterComedyOutlinedIcon fontSize='inherit' />
                            <p>Novel</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='carousel-item'>
                <div className='banner-item'>
                    <Link to={`/browse/Autobiography/getByTS`}>
                        <div className='banner-icon' ref={autobiography}>
                            <PortraitOutlinedIcon fontSize='inherit' />
                            <p>Autobiography</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='carousel-item'>
                <div className='banner-item'>
                    <Link to={`/browse/Fantasy/getByTS`}>
                        <div className='banner-icon' ref={fantasy}>
                            <FortOutlinedIcon fontSize='inherit' />
                            <p>Fantasy</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='carousel-item'>
                <div className='banner-item'>
                    <Link to={`/browse/Non-Fiction/getByTS`}>
                        <div className='banner-icon' ref={nonFict}>
                            <BiotechOutlinedIcon fontSize='inherit' />
                            <p>Non-Fiction</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='carousel-item'>
                <div className='banner-item'>
                    <Link to={`/browse/Humor/getByTS`}>
                        <div className='banner-icon' ref={humor}>
                            <SentimentVerySatisfiedOutlinedIcon fontSize='inherit' />
                            <p>Humor</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='carousel-item'>
                <div className='banner-item'>
                    <Link to={`/browse/Poetry/getByTS`}>
                        <div className='banner-icon' ref={poetry}>
                            <HistoryEduOutlinedIcon fontSize='inherit' />
                            <p>Poetry</p>
                        </div>
                    </Link>
                </div>
            </div>
        </Carousel>
    </div>
    );
};

export default GenreCategories;
