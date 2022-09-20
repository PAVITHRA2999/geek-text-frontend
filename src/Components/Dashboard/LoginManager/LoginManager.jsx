import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import '../PersonalInfoManager/PersonalInfoManager.css';
import axios from 'axios';
import Notification from '../../Cart/UI/Notification';

export const LoginManager = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	// Notification
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

	const BlankValidation = () => {
		if (!email && !password) {
			throw 'At least 1 field is required';
		}
	};

	const handleChangeLoginManager = (e) => {
		switch (e.target.id) {
			case 'email':
				setEmail(e.target.value);
				break;
			case 'password':
				setPassword(e.target.value);
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
				dev: 'http://localhost:5000/api/update-login',
				prod: 'http://lea-geek-text.herokuapp.com/api/update-login',
			};

			const url =
				process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;

			const form_data = new FormData();

			form_data.append('email', email);
			form_data.append('password', password);

			const token = localStorage.getItem('token');
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
					return;
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
					<h3 className='account__form-header'>Update Login Credentials</h3>

					<div className='form-control'>
						<label>Email</label>
						<input
							onChange={handleChangeLoginManager}
							id='email'
							type='email'
							placeholder='Email'
						/>
					</div>

					<div className='form-control'>
						<label>Password</label>
						<input
							onChange={handleChangeLoginManager}
							id='password'
							type='password'
							placeholder='Password'
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
