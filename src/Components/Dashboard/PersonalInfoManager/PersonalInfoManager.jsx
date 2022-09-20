import React, {useState, useEffect, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import './PersonalInfoManager.css';
import axios from 'axios';
import Notification from '../../Cart/UI/Notification';

export const PersonalInfoManager = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [nickname, setNickname] = useState('');
	const [homeAddress, setHomeAddress] = useState('');

	const [personalInfo, setPersonalInfo] = useState({
		name: '',
		email: '',
		homeAddress: '',
		nickname: '',
	});
	const [emailx, setEmailx] = useState('');
	const [nicknamex, setNicknamex] = useState('');
	const [homeAddressx, setHomeAddressx] = useState('');

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
		console.log(token);
		const url =
			'https://lea-geek-text.herokuapp.com/api/managing-personal-info';
		axios
			.post(url, form_data, {
				headers: {
					'x-auth-token': token,
				},
			})
			.then((res) => {
				console.log(res);
				setPersonalInfo({
					name: res.data.name,
					email: res.data.email,
					homeAddress: res.data.homeAddress,
					nickname: res.data.nickname,
				});
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
				dev: 'http://localhost:3000/api/personal-info',
				prod: '',
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
								value={personalInfo.name}
							/>
						</div>
						<div className='form-control'>
							<label>Email</label>
							<input
								onChange={handleChange}
								id='email'
								type='email'
								value={personalInfo.email}
							/>
						</div>
						<div className='form-control'>
							<label>Nickname</label>
							<input
								onChange={handleChange}
								id='nickname'
								type='text'
								value={personalInfo.nickname}
								// placeholder='Nickname'
							/>
						</div>
						<div className='form-control'>
							<label>Home Address</label>
							<input
								onChange={handleChange}
								id='homeAddress'
								type='text'
								value={personalInfo.homeAddress}
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
