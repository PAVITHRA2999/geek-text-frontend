import React, {useState} from 'react';
import '../PersonalInfoManager/PersonalInfoManager.css';
import axios from 'axios';

export const NewShippingAddress = () => {
	const [street, setStreet] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [country, setCountry] = useState('');

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
			alert('At least 1 field is required');
		}
	};

	const testingVars = () => {
		try {
			console.log(street);
			console.log(city);
			console.log(state);
			console.log(postalCode);
			console.log(country);
		} catch (e) {
			alert(e);
			window.location.reload();
			return;
		}
	};

	const cancelFunc = () => {
		window.location.replace('http://localhost:3000/dashboard');
	};

	const UpdateInfo = (e) => {
		e.preventDefault();
		// console.log("gafsdafsadfsfdsfsafdsafassafsafa");
		BlankValidation();

		const baseURL = {
			dev: 'https://lea-geek-text.herokuapp.com/api/insert-shipping-address',
			prod: '',
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
		const token = localStorage.getItem('token');
		axios
			.post(url, form_data, {
				headers: {
					'x-auth-token': token,
				},
			})
			.then((res) => {
				console.log(res);
				alert('Information successfully updated');
				// window.location.reload();
			})
			.catch((err) => {
				console.log(err.response.data.msg);
			});
	};

	return (
		<div>
			<form className='personal-info-update-form'>
				<h2>Add new Shipping Address</h2>
				<label>Street</label>
				<input
					onChange={handleChangeLoginManager}
					type='text'
					id='street'
					placeholder='4 Yawkey Way'
				/>
				<label>City</label>
				<input
					onChange={handleChangeLoginManager}
					type='text'
					id='city'
					placeholder='Boston'
				/>
				<label>State</label>
				<input
					onChange={handleChangeLoginManager}
					type='text'
					id='state'
					placeholder='MA'
				/>
				<label>Postal Code</label>
				<input
					onChange={handleChangeLoginManager}
					type='text'
					id='postalCode'
					placeholder='02225'
				/>
				<label style={{marginTop: '1rem'}}>Country</label>
				<input
					onChange={handleChangeLoginManager}
					type='text'
					id='country'
					placeholder='USA'
				/>
				<p className='btn-wrapper'>
					<span onClick={UpdateInfo} className='btn-update-info'>
						{/*Inline element*/}
						Add New Address
					</span>
					<span onClick={cancelFunc} className='btn-cancel'>
						{/*Inline element*/}
						Cancel
					</span>
				</p>
			</form>
			<h2></h2>
			<h2></h2>
			<h2></h2>
		</div>
	);
};
