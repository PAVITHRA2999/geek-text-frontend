import React from 'react'
import BannerImg from '../../../Assets/Banner2.png'
import { Link } from "react-router-dom";
import './Banner.css'
export const Banner = () =>{
    return(
        <div>
            <div className="banner-container">
                {/* <img src={BannerImg} alt="Home Banner" className="home-banner"/> */}
            </div>
            <div className="banner-text">
                <h3 className="banner-text-header">Books are life</h3>
                <Link to ="/browse" className = "Router_Link">
                <button className="btn btn-check-newbooks">Check the latest releases</button>
                </Link>
            </div>
        </div>
        
    )
}