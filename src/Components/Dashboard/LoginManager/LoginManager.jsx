import React, {useState} from 'react';
import '../PersonalInfoManager/PersonalInfoManager.css';
import axios from 'axios';

export const LoginManager = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const BlankValidation = () => {
		if (!email && !password) {
			alert('At least 1 field is required');
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
		window.location.replace('http://localhost:3000/dashboard');
	};

	const UpdateInfo = (e) => {
		e.preventDefault();
		BlankValidation();
		const baseURL = {
			dev: 'http://localhost:3000/api/update-login',
			prod: '',
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
				console.log(res);
				alert('Login Credentials successfully updated');
				window.location.reload();
			})
			.catch((err) => {
				console.log(err.response.data.msg);
			});
	};
	return (
		<div>
			<form className='personal-info-update-form'>
				<h2>Update Login Credentials</h2>
				<label>Email</label>
				<input
					onChange={handleChangeLoginManager}
					id='email'
					type='email'
					placeholder='Enter new email'
				/>
				<label>Password</label>
				<input
					onChange={handleChangeLoginManager}
					id='password'
					type='password'
					placeholder='Enter new login password'
				/>
				<p className='btn-wrapper'>
					<span onClick={UpdateInfo} className='btn-update-info'>
						{/*Inline element*/}
						Update Login Credentials
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
