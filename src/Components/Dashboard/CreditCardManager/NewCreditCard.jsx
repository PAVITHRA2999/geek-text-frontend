import React, {useState} from 'react';
import '../PersonalInfoManager/PersonalInfoManager.css';
import axios from 'axios';

export const NewCreditCard = () => {
	const [cardHolder, setcardHolder] = useState('');
	const [cardNumber, setcardNumber] = useState('');
	const [cardExpMonth, setcardExpMonth] = useState('');
	const [cardExpYear, setcardExpYear] = useState('');
	const [cardCVC, setcardCVC] = useState('');

	const handleChangeLoginManager = (e) => {
		switch (e.target.id) {
			case 'cardHolder':
				setcardHolder(e.target.value);
				break;
			case 'cardNumber':
				setcardNumber(e.target.value);
				break;
			case 'cardExpMonth':
				setcardExpMonth(e.target.value);
				break;
			case 'cardExpYear':
				setcardExpYear(e.target.value);
				break;
			case 'cardCVC':
				setcardCVC(e.target.value);
				break;
			default:
				break;
		}
	};

	const BlankValidation = () => {
		if (
			!cardHolder &&
			!cardNumber &&
			!cardExpMonth &&
			!cardExpYear &&
			!cardCVC
		) {
			throw 'At least 1 field is required';
		}
	};

	const testingVars = () => {
		try {
			console.log(cardHolder);
			console.log(cardNumber);
			console.log(cardExpMonth);
			console.log(cardExpYear);
			console.log(cardCVC);
			BlankValidation();
			checkCreditCardValidation();
		} catch (e) {
			alert(e);
			window.location.reload();
			return;
		}
	};
	// Check CreditCard Arrow Function.
	const checkCreditCardValidation = () => {
		/* Initialization.*/
		/* Date Class Import statement. */
		let today = new Date();
		const CreditCardNumberTmp = cardNumber;
		const ExpMonthTmp = cardExpMonth;
		const ExpYearTmp = cardExpYear;
		const lowercase = /[a-z]/;
		const upercase = /[A-Z]/;
		const symbol = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

		/* Credit Card Number can be only Numbers */
		if (
			lowercase.test(CreditCardNumberTmp) ||
			upercase.test(CreditCardNumberTmp) ||
			symbol.test(CreditCardNumberTmp)
		) {
			throw 'CreditCardNumber Must be numbers';
		}

		/* Getting month. */
		let mm = today.getMonth() + 1;

		/* Getting Full Year. */
		let yyyy = today.getFullYear();

		console.log('Year by user:' + ExpYearTmp);
		console.log('Year by PC:' + yyyy);

		/* Checking the year. */
		if (ExpYearTmp < yyyy) {
			throw 'Credit Card has expired check your year.';
		}

		/* Checking for the month */
		if (ExpYearTmp === yyyy && ExpMonthTmp < mm) {
			throw 'Credit Card has expired check your month.';
		}
	};

	const cancelFunc = () => {
		window.location.replace('http://localhost:3000/dashboard');
	};

	const UpdateInfo = (e) => {
		e.preventDefault();

		testingVars();
		const baseURL = {
			dev: 'https://lea-geek-text.herokuapp.com/api/credit-card',
			prod: '',
		};
		const url =
			process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;
		const form_data = new FormData();

		// cardHolder, cardNumber, expirationMonth, expirationYear, securityNumber
		form_data.append('cardHolder', cardHolder);
		form_data.append('cardNumber', cardNumber);
		form_data.append('cardExpMonth', cardExpMonth);
		form_data.append('cardExpYear', cardExpYear);
		form_data.append('cardCVC', cardCVC);
		const token = localStorage.getItem('token');
		axios
			.post(url, form_data, {
				headers: {
					'x-auth-token': token,
				},
			})
			.then((res) => {
				console.log(res);
				alert('Information successfully updated');
			})
			.catch((err) => {
				console.log(err.response.data.msg);
			});
	};

	return (
		<div>
			<form className='personal-info-update-form'>
				<h2>Add new credit card</h2>
				<label>Card Holder</label>
				<input
					onChange={handleChangeLoginManager}
					type='text'
					id='cardHolder'
					placeholder='Enter card holder'
				/>
				<label>Card Number</label>
				<input
					onChange={handleChangeLoginManager}
					type='text'
					id='cardNumber'
					placeholder='Enter Card Number'
				/>
				<label>Expiration date</label>
				<span>
					<input
						onChange={handleChangeLoginManager}
						type='text'
						id='cardExpMonth'
						placeholder='Enter exp month'
					/>
					<input
						onChange={handleChangeLoginManager}
						type='text'
						id='cardExpYear'
						placeholder='Enter exp year'
					/>
				</span>
				<label style={{marginTop: '1rem'}}>CVC</label>
				<input
					onChange={handleChangeLoginManager}
					type='text'
					id='cardCVC'
					placeholder='Enter security number'
				/>

				<p className='btn-wrapper'>
					<span onClick={UpdateInfo} className='btn-update-info'>
						{/*Inline element*/}
						Add Credit Card
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
