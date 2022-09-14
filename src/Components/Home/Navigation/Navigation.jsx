import React from 'react';
import Logo from '../../../Assets/geek-text-logo.png';
import './Navigation.css';
import {Link} from 'react-router-dom';

import {Avatar} from '@material-ui/core';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {DropDownMenu} from '../UserDropDownMenu/DropDownMenu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CartIcon from '../../Cart/CartIcon/CartIcon';
export const Navigation = () => {
	const SignOut = () => {
		localStorage.removeItem('token');
		window.location.replace('http://localhost:3000/');
	};
	const token = localStorage.getItem('token') || false;

	return (
		<div className='nav nav-top'>
			<div className='nav-left'>
				<Link to='/' className='Router_Link'>
					<img className='resize' src={Logo} alt='logo' />
					<h1 className='inlineheader app-name'>Geek Text</h1>
				</Link>
			</div>

			<div className='nav-right'>
				<div className='nav-link'>
					<Link to='/browse' className='Router_Link'>
						<SearchIcon />
						<h4 className='links inlineheader'>View Books</h4>
					</Link>
				</div>
				{token ? null : (
					<div className='nav-link'>
						<Link to='/auth' className='Router_Link'>
							<PermIdentityIcon />
							<h4 className='links inlineheader'>Sign In</h4>
						</Link>
					</div>
				)}

				<div className='nav-link'>
					<Link to='/wishlist' className='Router_Link'>
						<FavoriteBorderIcon></FavoriteBorderIcon>
						<h4 className='links inlineheader'>Wishlist</h4>
					</Link>
				</div>
				{token ? (
					<div className='nav-link-user'>
						{' '}
						<Popup
							trigger={
								<Avatar
									src=''
									alt='User Profile'
									style={{height: '30px', width: '30px'}}
								/>
							}
							position='bottom right'
						>
							<DropDownMenu />
						</Popup>
						{/*<div className="menu-option">
                        <h3 className="menu-text"
                            onClick={SignOut}></h3>
            </div>*/}{' '}
					</div>
				) : null}

				<div className='nav-right-cart nav-link'>
					<Link to='/cart' className='Router_Link'>
						<CartIcon />
					</Link>
				</div>
			</div>
		</div>
	);
};
