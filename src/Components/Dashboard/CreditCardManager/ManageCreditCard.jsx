import React, {useState, useEffect} from 'react';
import '../PersonalInfoManager/ManagePersonalInfo.css';
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
		console.log(token);
		const baseURL = {
			dev: 'http://localhost:5000/api/managing-credit-cardd',
			prod: 'https://lea-geek-text.herokuapp.com/api/managing-credit-cardd',
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
			return <div key={index}>{key}</div>;
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

		const baseURL = {
			dev: 'http://localhost:5000/api/testing-deleteCC',
			prod: 'https://lea-geek-text.herokuapp.com/api/testing-deleteCC',
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

	const CompactCreditCard = () => {
		return (
			employees &&
			employees.map(
				(
					{cardHolder, cardNumber, cardExpMonth, cardExpYear, cardCVC, _id},
					i
				) => {
					return (
						<div key={_id}>
							<div key={cardNumber} className='credit-card-compressed'>
								<div>
									<div className='inLine'>
										<b>Card Number: </b>
										<p>{cardNumber}</p>
									</div>
									<div className='inLine'>
										<b>Card Holder: </b>
										<p>{cardHolder}</p>
									</div>
									<div className='inLine'>
										<b>Expiration Month: </b>
										<p>{cardExpMonth}</p>
									</div>
									<div className='inLine'>
										<b>Expiration Year: </b>
										<p>{cardExpYear}</p>
									</div>

									<div className='inLine'>
										<b>CVC: </b>
										<p>{cardCVC}</p>
									</div>
								</div>
								<div className='inline-buttons'>
									<div>
										<div className='operation'>
											<EditOutlinedIcon
												fontSize='inherit'
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
				}
			)
		);
	};

	return (
		<div className='profile-form'>
			<div className='col-1-2'>
				<form className='account__form'>
					<h3 className='account__form-header'>Manage Credit Cards</h3>
					<div className='divTable'>
						{(employees || []).length > 0 ? (
							<div className='form-control'>
								<CompactCreditCard />
							</div>
						) : (
							<p>
								You haven't added any credit cards. If you add a new credit card
								it will appear here.
							</p>
						)}
					</div>
				</form>
			</div>
			<Notification notify={notify} setNotify={setNotify} />
		</div>
	);
};
