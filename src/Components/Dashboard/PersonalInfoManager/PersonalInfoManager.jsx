import React, {useState} from 'react';
import './PersonalInfoManager.css';
import axios from 'axios';

export const PersonalInfoManager = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [nickname, setNickname] = useState('');
	const [homeAddress, setHomeAddress] = useState('');

	const BlankValidation = () => {
		if (!name && !email && !nickname && !homeAddress) {
			alert('At least 1 field is required');
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
		window.location.replace('http://localhost:3000/dashboard');
	};

	const UpdateInfo = (e) => {
		e.preventDefault();

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
				console.log(res);
				alert('Personal Information successfully updated');
				window.location.reload();
			})
			.catch((err) => {
				console.log(err.response.data.msg);
			});
	};

	return (
		<div className=''>
			<form className='personal-info-update-form'>
				<h2>Update Personal Information</h2>
				<label>Full Name</label>
				<input
					onChange={handleChange}
					id='name'
					type='text'
					placeholder='Enter new full name'
				/>
				<label>Email</label>
				<input
					onChange={handleChange}
					id='email'
					type='email'
					placeholder='Enter new email'
				/>
				<label>Nickname</label>
				<input
					onChange={handleChange}
					id='nickname'
					type='text'
					placeholder='Enter new nickname'
				/>
				<label>Home Address</label>
				<input
					onChange={handleChange}
					id='homeAddress'
					type='text'
					placeholder='Enter new home address'
				/>
				<p className='btn-wrapper'>
					<span onClick={UpdateInfo} className='btn-update-info'>
						{/*Inline element*/}
						Update Information
					</span>
					<span onClick={cancelFunc} className='btn-cancel'>
						{/*Inline element*/}
						Cancel
					</span>
				</p>
			</form>
		</div>
	);
};
