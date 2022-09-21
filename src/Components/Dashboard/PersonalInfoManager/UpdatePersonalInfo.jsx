import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './ManagePersonalInfo.css';
import axios from 'axios';
import Notification from '../../Cart/UI/Notification';

export const UpdatePersonalInfo = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [nickname, setNickname] = useState('');
	const [homeAddress, setHomeAddress] = useState('');

	// Notification
	const [notify, setNotify] = useState({
		isOpen: false,
		message: '',
		type: '',
		typeStyle: '',
	});

	const getDataPay = async () => {
		const form_data = new FormData();
		const token = localStorage.getItem('token');
		const baseURL = {
			dev: 'http://localhost:5000/api/managing-personal-info',
			prod: 'https://lea-geek-text.herokuapp.com/api/managing-personal-info',
		};

		const url =
			process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;

		axios
			.post(url, form_data, {
				headers: {
					'x-auth-token': token,
				},
			})
			.then((res) => {
				setName(res.data.name);
				setEmail(res.data.email);
				setHomeAddress(res.data.homeAddress);
				setNickname(res.data.nickname);
			})
			.catch((err) => {
				console.log(err);
				errorHandler(
					err && err.response && err.response.data && err.response.data.msg
						? err.response.data.msg
						: 'Something unexpected happened. Please try again later'
				);
			});
	};

	useEffect(() => {
		getDataPay();
	}, []);

	const errorHandler = (message) => {
		setNotify({
			isOpen: true,
			message: message || 'Sorry, there was an error. Plase try again later.',
			type: 'error',
			typeStyle: '',
		});
	};

	const history = useHistory();

	const BlankValidation = () => {
		if (!name && !email && !nickname && !homeAddress) {
			throw 'At least 1 field is required';
		}
	};

	const handleChange = (e) => {
		switch (e.target.id) {
			case 'name':
				setName(e.target.value);
				break;
			case 'email':
				setEmail(e.target.value);
				break;
			case 'nickname':
				setNickname(e.target.value);
				break;
			case 'homeAddress':
				setHomeAddress(e.target.value);
				break;
			default:
				break;
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
				dev: 'http://localhost:5000/api/personal-info',
				prod: 'https://lea-geek-text.herokuapp.com/api/personal-info',
			};

			const url =
				process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;

			const form_data = new FormData();
			// name,email,nickname,home_address
			form_data.append('name', name);
			form_data.append('email', email);
			form_data.append('nickname', nickname);
			form_data.append('home_address', homeAddress);
			const token = localStorage.getItem('token');
			axios
				.post(url, form_data, {
					headers: {
						'x-auth-token': token,
					},
				})
				.then((res) => {
					window.location = '/dashboard';
				})
				.catch((err) => {
					console.log(err);
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
		<div>
			<div className='profile-form'>
				<div className='col-1-2'>
					<form className='account__form'>
						<h3 className='account__form-header'>
							Update Personal Information
						</h3>
						<div className='form-control'>
							<label>Full Name</label>
							<input
								onChange={handleChange}
								id='name'
								type='text'
								value={name}
							/>
						</div>
						<div className='form-control'>
							<label>Email</label>
							<input
								onChange={handleChange}
								id='email'
								type='email'
								value={email}
							/>
						</div>
						<div className='form-control'>
							<label>Nickname</label>
							<input
								onChange={handleChange}
								id='nickname'
								type='text'
								value={nickname}
								// placeholder='Nickname'
							/>
						</div>
						<div className='form-control'>
							<label>Home Address</label>
							<input
								onChange={handleChange}
								id='homeAddress'
								type='text'
								value={homeAddress}
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
					</form>{' '}
				</div>
			</div>
			<Notification notify={notify} setNotify={setNotify} />
		</div>
	);
};
