import React, {useState, useEffect} from 'react';
import './ManagePersonalInfo.css';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Notification from '../../Cart/UI/Notification';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export const ManagePersonalInfo = () => {
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
	const history = useHistory();

	const getDataPay = async () => {
		const form_data = new FormData();
		const token = localStorage.getItem('token');
		const baseURL = {
			dev: 'http://localhost:5000/api/managing-personal-info',
			prod: `${process.env.REACT_APP_BACKEND_URL}/api/managing-personal-info`,
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

	return (
		<div className='profile-form'>
			<div className='col-1-2'>
				<form className='account__form'>
					<div className='credit-card-compressed'>
						<h3 className='account__form-header inline-info-header'>
							Personal Information
							<div className='operation'>
								<EditOutlinedIcon
									fontSize='inherit'
									onClick={() => history.push('/dashboard/update-info')}
								/>
							</div>
						</h3>
					</div>
					<div className='divTable credit-card-compressed'>
						<div>
							<div className='inLine'>
								<b>Full Name: </b>
								<p>{name}</p>
							</div>
							<div className='inLine'>
								<b>Email: </b>
								<p>{email}</p>
							</div>
							<div className='inLine'>
								<b>Nickname: </b>
								<p>{nickname}</p>
							</div>

							{homeAddress && (
								<div className='inLine'>
									<b>Home Address: </b>
									<p>{homeAddress}</p>
								</div>
							)}
						</div>
					</div>
				</form>
			</div>
			<Notification notify={notify} setNotify={setNotify} />
		</div>
	);
};
