import React, {useState, useEffect} from 'react';
import "../PersonalInfoManager/PersonalInfoManager.css";
import axios from 'axios';

export const UpdateCreditCard = () => {
    const [cardHolder, setcardHolder] = useState("");
    const [cardNumber, setcardNumber] = useState("");
    const [cardExpMonth, setcardExpMonth] = useState("");
    const [cardExpYear, setcardExpYear] = useState("");
    const [cardCVC, setcardCVC] = useState("");
    const [employees, setEmployees] = useState([]);
    const [id, setId] = useState(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        console.log(data)
        setcardHolder(data.data.cardHolder);
        setcardNumber(data.data.cardNumber);
        setcardExpMonth(data.data.cardExpMonth);
        setcardExpYear(data.data.cardExpYear);
        setcardCVC(data.data.cardCVC);
        setId(data.data._id);


    }, []);
    const handleChangeLoginManager = (e) => {
        switch (e.target.id) {
            case "cardHolder":
                setcardHolder(e.target.value);
                break;
            case "cardNumber":
                setcardNumber(e.target.value);
                break;
            case "cardExpMonth":
                setcardExpMonth(e.target.value);
                break;
            case "cardExpYear":
                setcardExpYear(e.target.value);
                break;
            case "cardCVC":
                setcardCVC(e.target.value);
                break;
            default:
                break;
        }
    }

    const BlankValidation = () => {
        if (!cardHolder && !cardNumber && !cardExpMonth && !cardExpYear && !cardCVC) {
            throw "At least 1 field is required";
        }
    }

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

    }
    // Check CreditCard Arrow Function.
    const checkCreditCardValidation = () => {
        /* Initialization.*/
        /* Date Class Import statement. */
        var today = new Date();
        const CreditCardNumberTmp = cardNumber;
        const ExpMonthTmp = cardExpMonth;
        const ExpYearTmp = cardExpYear;
        const lowercase = /[a-z]/;
        const upercase = /[A-Z]/;
        const symbol = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        /* Credit Card Number can be only Numbers */
        if (lowercase.test(CreditCardNumberTmp) || upercase.test(CreditCardNumberTmp) || symbol.test(CreditCardNumberTmp)) {
            throw "CreditCardNumber Must be numbers";
        }

        /* Getting month. */
        var mm = today.getMonth() + 1;

        /* Getting Full Year. */
        var yyyy = today.getFullYear();

        console.log("Year by user:" + ExpYearTmp);
        console.log("Year by PC:" + yyyy);

        /* Checking the year. */
        if (ExpYearTmp < yyyy) {
            throw "Credit Card has expired check your year.";
        }

        /* Checking for the month */
        if (ExpYearTmp == yyyy && ExpMonthTmp < mm) {
            throw "Credit Card has expired check your month.";
        }
    };


    const cancelFunc = () => {
        window.location.replace("http://localhost:3000/dashboard");
    };

    const InsertInfo = (e) => {
        e.preventDefault();

        var CreditCard = [{
                cardHolder: cardHolder,
                cardNumber: cardNumber,
                cardExpMonth: cardExpMonth,
                cardExpYear: cardExpYear,
                cardCVC: cardCVC,
                id: id
            },];

        console.log("Arrayyyyyyyyyyyyyyyyyyyyyy");
        console.log(CreditCard[0]);
        var email = "bloodfear@arete.com";

        const form_data = new FormData();
        form_data.append('creditCards', CreditCard);

        const token = localStorage.getItem('token');
        const url = "http://localhost:3000/api/updating-credit-card";

        axios.post(url, form_data, {
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            console.log(res);
            alert('Credit card updated');
            // window.location.reload();
        }).catch(err => {
            console.log(err.response.data.msg);
        })
    };

    const UpdateInfo = (e) => {
        e.preventDefault();

        testingVars();
        const baseURL = {
            dev: "https://lea-geek-text.herokuapp.com/api/updating-credit-card",
            prod: ''
        }
        const url = process.env.NODE_ENV === "production" ? baseURL.prod : baseURL.dev;
        const form_data = new FormData();

        // cardHolder, cardNumber, expirationMonth, expirationYear, securityNumber
        form_data.append('cardHolder', cardHolder);
        form_data.append('cardNumber', cardNumber);
        form_data.append('cardExpMonth', cardExpMonth);
        form_data.append('cardExpYear', cardExpYear);
        form_data.append('cardCVC', cardCVC);
        form_data.append('id', id);
        console.log('id', id);
        const token = localStorage.getItem('token')
        axios.post(url, form_data, {
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            console.log(res);
            alert('Information successfully updated');
            // window.location.reload();
        }).catch(err => {
            console.log(err.response.data.msg);
        })

    }

    return (
        <div>
            <form className="personal-info-update-form">
                <h2>
                    Update credit card
                </h2>
                <label>Card Holder</label>
                <input onChange={handleChangeLoginManager}
                    type="text"
                    id="cardHolder"
                    value={cardHolder}
                    placeholder="Enter card holder"/>
                <label>Card Number</label>
                <input onChange={handleChangeLoginManager}
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    placeholder="Enter Card Number"/>
                <label>Expiration date</label>
                <span>
                    <input onChange={handleChangeLoginManager}
                        type="text"
                        id="cardExpMonth"
                        value={cardExpMonth}
                        placeholder="Enter exp month"/>
                    <input onChange={handleChangeLoginManager}
                        type="text"
                        id="cardExpYear"
                        value={cardExpYear}
                        placeholder="Enter exp year"/>
                </span>
                <label style={
                    {marginTop: "1rem"}
                }>CVC</label>
                <input onChange={handleChangeLoginManager}
                    type="text"
                    id="cardCVC"
                    value={cardCVC}
                    placeholder="Enter security number"/>


                <p className="btn-wrapper">
                    <span onClick={UpdateInfo}
                        className="btn-update-info">
                        {/*Inline element*/}
                        Update
                    </span>
                    <span onClick={cancelFunc}
                        className="btn-cancel">
                        {/*Inline element*/}
                        Cancel
                    </span>
                </p>
            </form>
            <h2></h2>
            <h2></h2>
            <h2></h2>

        </div>
    )
}