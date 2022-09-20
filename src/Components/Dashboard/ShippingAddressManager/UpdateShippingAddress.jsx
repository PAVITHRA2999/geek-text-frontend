import React, {useState, useEffect} from 'react';
import Notification from '../../Cart/UI/Notification';
import {useHistory} from 'react-router-dom';
import '../PersonalInfoManager/PersonalInfoManager.css';
import axios from 'axios';

export const UpdateShippingAddress = () => {
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [country, setCountry] = useState('');
	const [id, setId] = useState(null);
	const history = useHistory();

	const [notify, setNotify] = useState({
		isOpen: false,
		message: '',
		type: '',
		typeStyle: '',
	});

	const errorHandler = (message) => {
		setNotify({
			isOpen: true,
			message: message || 'Sorry, there was an error. Plase try again later.',
			type: 'error',
			typeStyle: '',
		});
	};

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('shippingAdress'));
		console.log(data.data);
		setStreet(data.data.street);
		setCity(data.data.city);
		setState(data.data.state);
		setPostalCode(data.data.postalCode);
		setCountry(data.data.country);
		setId(data.data._id);
	}, []);
	const handleChangeLoginManager = (e) => {
		switch (e.target.id) {
			case 'street':
				setStreet(e.target.value);
				break;
			case 'city':
				setCity(e.target.value);
				break;
			case 'state':
				setState(e.target.value);
				break;
			case 'postalCode':
				setPostalCode(e.target.value);
				break;
			case 'country':
				setCountry(e.target.value);
				break;
			default:
				break;
		}
	};

	const BlankValidation = () => {
		if (!street && !city && !state && !postalCode && !country) {
			throw 'At least 1 field is required';
		}
	};

	const cancelFunc = () => {
		history.push('/dashboard');
	};

	const UpdateInfo = (e) => {
		e.preventDefault();
		try {
			BlankValidation();

			const baseURL = {
				dev: 'http://localhost:5000/api/updating-shipping-adress',
				prod: 'http://lea-geek-text.herokuapp.com/api/updating-shipping-adress',
			};
			const url =
				process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;
			const form_data = new FormData();

			// street, cardNumber, expirationMonth, expirationYear, securityNumber
			form_data.append('street', street);
			form_data.append('city', city);
			form_data.append('state', state);
			form_data.append('postalCode', postalCode);
			form_data.append('country', country);
			form_data.append('id', id);
			const token = localStorage.getItem('token');
			console.log('we are firing this');

			axios
				.post(url, form_data, {
					headers: {
						'x-auth-token': token,
					},
				})
				.then((res) => {
					history.push('/dashboard');
				})
				.catch((err) => {
					errorHandler(
						err && err.response && err.response.data && err.response.data.msg
							? err.response.data.msg
							: 'Something unexpected happened. Please try again later'
					);
				});
		} catch (e) {
			errorHandler(
				e ? e : 'Something unexpected happened. Please try again later'
			);
			return;
		}
	};

	return (
		<div className='profile-form'>
			<div className='col-1-2'>
				<form className='account__form'>
					<h3 className='account__form-header'>Update Shipping Address</h3>
					<div className='form-control'>
						<label>Street</label>
						<input
							onChange={handleChangeLoginManager}
							type='text'
							id='street'
							value={street}
							placeholder='4 Yawkey Way'
						/>
					</div>
					<div className='form-control'>
						<label>City</label>
						<input
							onChange={handleChangeLoginManager}
							type='text'
							value={city}
							id='city'
							placeholder='Boston'
						/>
					</div>
					<div className='form-control'>
						<label>State</label>
						<input
							onChange={handleChangeLoginManager}
							type='text'
							id='state'
							value={state}
							placeholder='MA'
						/>
					</div>
					<div className='form-control'>
						<label>Postal Code</label>
						<input
							onChange={handleChangeLoginManager}
							type='text'
							id='postalCode'
							value={postalCode}
							placeholder='02225'
						/>
					</div>
					<div className='form-control'>
						<label>Country</label>
						<input
							onChange={handleChangeLoginManager}
							type='text'
							id='country'
							value={country}
							placeholder='USA'
						/>
					</div>
					<div className='account__forgotpassword-buttons'>
						<button
							type='submit'
							onClick={UpdateInfo}
							className='btn btn-primary auth'
						>
							Submit
						</button>
						<button onClick={cancelFunc} className='btn btn-light auth'>
							Cancel
						</button>
					</div>
				</form>
			</div>
			<Notification notify={notify} setNotify={setNotify} />
		</div>
	);
};
