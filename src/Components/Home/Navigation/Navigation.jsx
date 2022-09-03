import React from 'react'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Logo from '../../../Assets/geek-text-logo.png'
import './Navigation.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import {Avatar} from '@material-ui/core';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {DropDownMenu} from '../UserDropDownMenu/DropDownMenu'

export const Navigation = () => {

    // Get Number of items in Shopping Cart
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const getCartCount = () => {
        return cartItems.filter(({ saved }) => saved !== true)
            .reduce((qty, item) => Number(item.qty) + qty, 0);
    };

    const SignOut = () => {
        localStorage.removeItem('token');
        window.location.replace("http://localhost:3000/");
    }
    const token = localStorage.getItem('token') || false;

    return (
        <div className="nav">
            <div className="nav-left">
                <Link to="/" className="Router_Link">
                    <img className="resize" src={Logo} alt="logo" />
                    <h1 className="inlineheader">Geek Text</h1>
                </Link>
            </div>

            <div className="nav-right">
                
                <div className="nav-right-booklist nav-link">
                <Link to ="/browse" className = "Router_Link">
                    <h4 className="links">View Books</h4>
                    </Link>
                </div>
                <div className="nav-right-booklist nav-link">
                <Link to ="/listofbooks" className = "Router_Link">
                    <h4 className="links">View Books (new)</h4>
                    </Link>
                </div>
                {
                    token ? null : 
                <div className="nav-right-auth nav-link">
                    <Link to="/auth" className="Router_Link">
                        <h4 className="links">Sign-up/Sign-in</h4>
                    </Link>
                 </div>
                 }

                {/* <div className="nav-right-addBook nav-link">
                    <Link to="/listofbooks" className="Router_Link">
                        <h4 className="links">Add New Book</h4>
                    </Link>
                </div> */}

                <div className="nav-right-addBook nav-link">
                    <Link to="/wishlist" className="Router_Link">
                        <h4 className="links">Wishlist</h4>
                    </Link>
                </div>
                {
                    token ? 
                <div className="nav-link-user"> <Popup trigger={
                            <Avatar
                        src=""
                        alt="User Profile"
                        style={{ height: '30px', width: '30px' }}
                        />
                        }
                        position="bottom right">
                        <DropDownMenu/>
                    </Popup> 
                    {/*<div className="menu-option">
                        <h3 className="menu-text"
                            onClick={SignOut}></h3>
            </div>*/} </div>
            : null
                }

                <div className="nav-right-cart nav-link">
                    <Link to="/cart" className="Router_Link">
                        <div className="cartlogo_badge">{getCartCount()}</div>
                        <ShoppingCartOutlinedIcon fontSize="small" />
                    </Link>
                </div>  
            </div>
        </div>
    )
}