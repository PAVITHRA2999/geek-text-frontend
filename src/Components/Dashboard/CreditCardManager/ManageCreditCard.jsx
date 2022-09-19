import React, {useState, useEffect} from 'react';
import '../PersonalInfoManager/PersonalInfoManager.css';
import '../CreditCardManager/ManageCreditCard.css';
import axios from 'axios';
import Notification from '../../Cart/UI/Notification';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export const ManageCreditCard = (props) => {
	const [employees, setEmployees] = useState([]);
	const [deletedCard, setDeletedCard] = useState([]);

	useEffect(() => {
		getDataPay();
	}, [deletedCard]);

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
		const url = 'https://lea-geek-text.herokuapp.com/api/managing-credit-cardd';
		axios
			.post(url, form_data, {
				headers: {
					'x-auth-token': token,
				},
			})
			.then((res) => {
				setEmployees(res.data.creditCards);
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
			'Card Holder',
			'Card Number',
			'Expiration Month',
			'Expiration Year',
			'CVC',
			'Edit',
			'Delete',
		];

		return headerElement.map((key, index) => {
			return <th key={index}>{key}</th>;
		});
	};
	// updating data

	const updateData = (
		cardHolder,
		cardNumber,
		cardExpMonth,
		cardExpYear,
		cardCVC,
		_id
	) => {
		const data = {
			cardHolder,
			cardNumber,
			cardExpMonth,
			cardExpYear,
			cardCVC,
			_id,
		};
		localStorage.setItem('data', JSON.stringify({data}));
		window.location = '/dashboard/updating-credit-card';
	};
	// Remove Credit card info.
	const removeData = async (cardNumber) => {
		const form_data = new FormData();
		form_data.append('id', cardNumber);

		const token = localStorage.getItem('token');
		const url = 'https://lea-geek-text.herokuapp.com/api/testing-deleteCC';
		axios
			.post(url, form_data, {
				headers: {
					'x-auth-token': token,
				},
			})
			.then((res) => {
				setEmployees(del);
				setDeletedCard(del);
			})
			.catch((err) => {
				errorHandler(
					err && err.response && err.response.data && err.response.data.msg
						? err.response.data.msg
						: 'Something unexpected happened. Please try again later'
				);
			});

		const del = employees.filter(
			(employee) => cardNumber !== employee.cardNumber
		);
	};

	const renderBody = () => {
		return (
			employees &&
			employees.map(
				({cardHolder, cardNumber, cardExpMonth, cardExpYear, cardCVC, _id}) => {
					return (
						<tr key={cardNumber}>
							<td>{cardHolder}</td>
							<td>{cardNumber}</td>
							<td>{cardExpMonth}</td>
							<td>{cardExpYear}</td>
							<td>{cardCVC}</td>
							<td className='operation'>
								<EditOutlinedIcon
									onClick={() =>
										updateData(
											cardHolder,
											cardNumber,
											cardExpMonth,
											cardExpYear,
											cardCVC,
											_id
										)
									}
								/>
							</td>
							<td className='operation'>
								<ClearOutlinedIcon onClick={() => removeData(_id)} />
							</td>
						</tr>
					);
				}
			)
		);
	};

	return (
		<div className='profile-form'>
			<div className='col-1-2'>
				<form className='account__form'>
					<h3 className='account__form-header'>Manage Credit Cards</h3>
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
