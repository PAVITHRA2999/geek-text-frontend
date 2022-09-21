import React, {useState, useEffect} from 'react';
import '../PersonalInfoManager/ManagePersonalInfo.css';
import axios from 'axios';
import '../CreditCardManager/ManageCreditCard.css';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import Notification from '../../Cart/UI/Notification';

export const ManageShippingAddress = () => {
	const [employees, setEmployees] = useState([]);
	const [deletedEmployee, setDeletedEmployee] = useState([]);

	useEffect(() => {
		getDataPay();
	}, [deletedEmployee]);

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

	const getDataPay = async () => {
		const form_data = new FormData();
		const token = localStorage.getItem('token');
		const baseURL = {
			dev: 'http://localhost:5000/api/managing-shipping-adress',
			prod: 'https://lea-geek-text.herokuapp.com/api/managing-shipping-adress',
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
				setEmployees(res.data.shippingAddress);
			})
			.catch((err) => {
				errorHandler(
					err && err.response && err.response.data && err.response.data.msg
						? err.response.data.msg
						: 'Something unexpected happened. Please try again later'
				);
			});
	};

	const renderHeader = () => {
		let headerElement = [
			'Street',
			'City',
			'State',
			'Postal Code',
			'Country',
			'Edit',
			'Delete',
		];

		return headerElement.map((key, index) => {
			return <th key={index}>{key}</th>;
		});
	};

	// Remove Credit card info.
	const removeData = async (cardNumber) => {
		const form_data = new FormData();
		const token = localStorage.getItem('token');
		form_data.append('id', cardNumber);

		const baseURL = {
			dev: 'http://localhost:5000/api/deleting-shipping-adress',
			prod: 'https://lea-geek-text.herokuapp.com/api/deleting-shipping-adress',
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
				const del = employees.filter(
					(employee) => cardNumber !== employee.cardNumber
				);
				setDeletedEmployee(del);
				setEmployees(del);
			})
			.catch((err) => {
				errorHandler(
					err && err.response && err.response.data && err.response.data.msg
						? err.response.data.msg
						: 'Something unexpected happened. Please try again later'
				);
			});
	};
	const updateData = (street, city, state, postalCode, country, _id) => {
		const data = {
			street,
			city,
			state,
			postalCode,
			country,
			_id,
		};
		localStorage.setItem('shippingAdress', JSON.stringify({data}));
		window.location = '/dashboard/updating-shipping-adress';
	};

	const CompactShipping = () => {
		return (
			employees &&
			employees.map(({street, city, state, postalCode, country, _id}, i) => {
				return (
					<div key={_id}>
						<div className='credit-card-compressed'>
							<div>
								<div className='inLine'>
									<b>Street: </b>
									<p>{street}</p>
								</div>
								<div className='inLine'>
									<b>City: </b>
									<p>{city}</p>
								</div>
								<div className='inLine'>
									<b>State: </b>
									<p>{state}</p>
								</div>
								<div className='inLine'>
									<b>Postal Code: </b>
									<p>{postalCode}</p>
								</div>

								<div className='inLine'>
									<b>Country: </b>
									<p>{country}</p>
								</div>
							</div>
							<div className='inline-buttons'>
								<div>
									<div className='operation'>
										<EditOutlinedIcon
											fontSize='inherit'
											onClick={() =>
												updateData(
													street,
													city,
													state,
													postalCode,
													country,
													_id
												)
											}
										/>
									</div>
								</div>
								<div>
									<div className='operation'>
										<ClearOutlinedIcon
											fontSize='inherit'
											onClick={() => removeData(_id)}
										/>
									</div>
								</div>
							</div>
						</div>
						{i < employees.length - 1 && <hr></hr>}
					</div>
				);
			})
		);
	};

	return (
		<div className='profile-form'>
			<div className='col-1-2'>
				<form className='account__form'>
					<h3 className='account__form-header'>Manage Shipping Address</h3>
					{(employees || []).length > 0 ? (
						<div className='form-control'>
							<CompactShipping />
						</div>
					) : (
						<p>
							You haven't added any shipping address. If you add a new shipping
							address it will appear here.
						</p>
					)}
				</form>
			</div>
			<Notification notify={notify} setNotify={setNotify} />
		</div>
	);
};
