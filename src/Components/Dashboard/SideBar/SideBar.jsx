import React, {useState} from 'react';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import {SideBarLayOut} from './SideBarLayOut';
import './SideBar.css';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';

export const SideBar = () => {
	const location = useLocation();
	const path = location.pathname;

	const [isCreditCardMenuOpened, setIsCreditCardMenuOpened] = useState(
		path === '/dashboard/add-new-credit-card' ||
			path === '/dashboard/manage-credit-card'
	);
	const [isShippingMenuOpened, setIsShippingMenuOpened] = useState(
		path === '/dashboard/add-new-shipping-address' ||
			path === '/dashboard/manage-shipping-address'
	);

	const [isPersonalInfoMenuOpened, setIsPersonalInfoMenuOpened] = useState(
		path === '/dashboard/update-info'
	);
	const [isLogginMenuOpened, setIsLoggingMenuOpened] = useState(
		path === '/dashboard/update-login-details'
	);

	const OpenCreditCardMenu = () => {
		setIsCreditCardMenuOpened(!isCreditCardMenuOpened);
		setIsShippingMenuOpened(false);
		setIsPersonalInfoMenuOpened(false);
		setIsLoggingMenuOpened(false);
	};
	const OpenShippingMenu = () => {
		setIsShippingMenuOpened(!isShippingMenuOpened);
		setIsCreditCardMenuOpened(false);
		setIsPersonalInfoMenuOpened(false);
		setIsLoggingMenuOpened(false);
	};
	const OpenLoggingMenu = () => {
		setIsLoggingMenuOpened(!isLogginMenuOpened);
		setIsCreditCardMenuOpened(false);
		setIsPersonalInfoMenuOpened(false);
		setIsShippingMenuOpened(false);
	};
	const OpenPersonalInfoMenu = () => {
		setIsPersonalInfoMenuOpened(!isPersonalInfoMenuOpened);
		setIsCreditCardMenuOpened(false);
		setIsShippingMenuOpened(false);
		setIsLoggingMenuOpened(false);
	};
	return (
		<div className='sidebar'>
			<div
				className={`${isPersonalInfoMenuOpened && 'selected-menu'}`}
				onClick={OpenPersonalInfoMenu}
			>
				<Link to='/dashboard/update-info' className='sidebar-icon'>
					<SideBarLayOut
						Icon={BadgeOutlinedIcon}
						text={`Manage Personal Information`}
					/>
					{/* We give the key(Icon) and the value(PersonPin..) + text with the text that will be showed  */}{' '}
				</Link>
			</div>
			<div
				className={`${isLogginMenuOpened && 'selected-menu'}`}
				onClick={OpenLoggingMenu}
			>
				<Link to='/dashboard/update-login-details' className='sidebar-icon'>
					<SideBarLayOut
						Icon={VpnKeyOutlinedIcon}
						text={`Manage Logging Details`}
					/>
				</Link>
			</div>

			<div
				className={`credit-menu-option ${
					isCreditCardMenuOpened && 'selected-menu'
				}`}
			>
				<div onClick={OpenCreditCardMenu} className='sidebar-icon'>
					<SideBarLayOut
						Icon={CreditCardOutlinedIcon}
						text={`Manage Credit Card Information`}
					/>
				</div>
				{isCreditCardMenuOpened && (
					<div className='credit-card-menu'>
						<Link to='/dashboard/add-new-credit-card'>
							<div className='account-menu-option sidebar-icon'>
								{' '}
								<AddCardOutlinedIcon fontSize='inherit' />
								<h4>Add New Credit Card</h4>
							</div>
						</Link>
						<Link to='/dashboard/manage-credit-card'>
							<div className='account-menu-option sidebar-icon'>
								{' '}
								<CreditScoreOutlinedIcon fontSize='inherit' />
								<h4>Manage Credit Cards</h4>
							</div>
						</Link>
					</div>
				)}{' '}
			</div>
			<div
				className={`shipping-menu-option ${
					isShippingMenuOpened && 'selected-menu'
				}`}
			>
				<div onClick={OpenShippingMenu} className='sidebar-icon'>
					<SideBarLayOut
						Icon={LocalShippingOutlinedIcon}
						text={`Manage Shipping Addresses`}
					/>
				</div>
				{!isShippingMenuOpened ? null : (
					<div className='shipping-menu'>
						<Link
							to='/dashboard/add-new-shipping-address'
							className='Router__link'
						>
							<div className='account-menu-option sidebar-icon'>
								{' '}
								<AddOutlinedIcon fontSize='inherit' />
								<h4>Add New Shipping Address</h4>
							</div>
						</Link>
						<Link
							to='/dashboard/manage-shipping-address'
							className='Router__link'
						>
							<div className='account-menu-option sidebar-icon'>
								{' '}
								<CheckOutlinedIcon fontSize='inherit' />
								<h4>Manage Shipping Address</h4>
							</div>
						</Link>
					</div>
				)}{' '}
			</div>
		</div>
	);
};
