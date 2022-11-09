import React from 'react';
import TextLogo from '../../../Assets/text-logo.png';
import IconLogo from '../../../Assets/icon-logo.png';
import './Navigation.css';
import {Link} from 'react-router-dom';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import {DropDownMenu} from '../UserDropDownMenu/DropDownMenu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CartIcon from '../../Cart/CartIcon/CartIcon';

export const Navigation = () => {
	const token = localStorage.getItem('token') || false;

	return (
		<div className='nav nav-top'>
			<div className='nav-left'>
				<Link to='/' className='Router_Link'>
					<img className='logo text-logo' src={TextLogo} alt='logo' />
					<img className='logo icon-logo' src={IconLogo} alt='logo' />
				</Link>
			</div>

			<div className='nav-right'>
				<div className='nav-link'>
					<Link to='/browse' className='Router_Link'>
						<SearchIcon />
						<h4 className='links inlineheader'>View Books</h4>
					</Link>
				</div>

				<div className='nav-link'>
					{!token ? (
						<Link to='/auth' className='Router_Link'>
							<PermIdentityIcon />
							<h4 className='links inlineheader'>Sign In</h4>
						</Link>
					) : (
						<Popup
							trigger={
								<div className='Router_Link'>
									<PermIdentityIcon />
									<h4 className='links inlineheader'>My Account</h4>
								</div>
							}
							position='bottom center'
							on='hover'
							arrow={false}
						>
							<DropDownMenu />
						</Popup>
					)}
				</div>

				<div className='nav-link'>
					<Link to='/wishlist' className='Router_Link'>
						<FavoriteBorderIcon></FavoriteBorderIcon>
						<h4 className='links inlineheader'>Wishlist</h4>
					</Link>
				</div>

				<div className='nav-right-cart nav-link'>
					<Link to='/cart' className='Router_Link'>
						<CartIcon />
					</Link>
				</div>
			</div>
		</div>
	);
};
