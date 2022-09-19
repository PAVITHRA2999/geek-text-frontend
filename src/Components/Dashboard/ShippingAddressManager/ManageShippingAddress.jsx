import React, {useState, useEffect} from 'react';
import '../PersonalInfoManager/PersonalInfoManager.css';
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
		const url =
			'https://lea-geek-text.herokuapp.com/api/managing-shipping-adress';
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
		const url =
			'https://lea-geek-text.herokuapp.com/api/deleting-shipping-adress';
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
	const renderBody = () => {
		return (
			employees &&
			employees.map(({street, city, state, postalCode, country, _id}) => {
				return (
					<tr key={street}>
						<td>{street}</td>
						<td>{city}</td>
						<td>{state}</td>
						<td>{postalCode}</td>
						<td>{country}</td>
						<td className='operation'>
							<EditOutlinedIcon
								onClick={() =>
									updateData(street, city, state, postalCode, country, _id)
								}
							/>
						</td>
						<td className='operation'>
							<ClearOutlinedIcon onClick={() => removeData(_id)} />
						</td>
					</tr>
				);
			})
		);
	};

	return (
		<div className='profile-form'>
			<div className='col-1-2'>
				<form className='account__form'>
					<h3 className='account__form-header'>Manage Shipping Address</h3>
					<div className='form-control'>
						<div className='container'>
							<table id='employee'>
								<thead>
									<tr>{renderHeader()}</tr>
								</thead>
								<tbody>{renderBody()}</tbody>
							</table>
						</div>
					</div>
				</form>
			</div>
			<Notification notify={notify} setNotify={setNotify} />
		</div>
	);
};
