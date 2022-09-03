import React, {useState} from 'react';
import "../PersonalInfoManager/PersonalInfoManager.css";
import axios from 'axios';
import "../CreditCardManager/ManageCreditCard.css"

export const ManageShippingAddress = () => {
    const [employees, setEmployees] = useState([]);

    const getDataPay = async () => { // const response = await axios.post("http://localhost:3001/payment/getpayment", {IdEmail: decoded.EmailAddressReg});
        const form_data = new FormData();
        const token = localStorage.getItem('token');
        const url = "https://lea-geek-text.herokuapp.com/api/managing-shipping-adress";
        axios.post(url, form_data, {
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            console.log(res);
            console.log(res.data.shippingAddress);
            setEmployees(res.data.shippingAddress);
            // window.location.reload();
        }).catch(err => {
            console.log(err.response.data.msg);
        })
    };

    const renderHeader = () => {
        let headerElement = [
            "street     ",
            "city       ",
            "state      ",
            "postalCode ",
            "country    ",
            "Update     ",
            "Delete     ",

        ];

        return headerElement.map((key, index) => {
            return <th key={index}>
                {
                key.toUpperCase()
            }</th>;
        });
    };

    // Remove Credit card info.
    const removeData = async (cardNumber) => { /*
        window.location.reload();
        */
        console.log('id', cardNumber)

        const form_data = new FormData();
        const token = localStorage.getItem('token');
        form_data.append('id', cardNumber)
        const url = "https://lea-geek-text.herokuapp.com/api/deleting-shipping-adress";
        axios.post(url, form_data, {
            headers: {
                "x-auth-token": token
            }
        }).then(res => {
            console.log(res);
            console.log(res.data.creditCards);
            // setEmployees(res.data.creditCards);
            // window.location.reload();
        }).catch(err => {
            console.log(err.response.data.msg);
        })
        /*
        window.location.reload();
        */
        const del = employees.filter(employee => cardNumber !== employee.cardNumber);
        setEmployees(del);
    };
    const updateData = (street, city, state, postalCode, country, _id) => {
        console.log(postalCode);
        const data = {
            street,
            city,
            state,
            postalCode,
            country,
            _id
        }
        localStorage.setItem('shippingAdress', JSON.stringify({data}))
        // '/dashboard/updating-shipping-adress'
        window.location = '/dashboard/updating-shipping-adress'
    }
    const renderBody = () => {
        return(employees && employees.map(({
            street,
            city,
            state,
            postalCode,
            country,
            _id
        }) => {
            return (
                <tr key={street}>
                    <td>{street}</td>
                    <td>{city}</td>
                    <td>{state}</td>
                    <td>{postalCode}</td>
                    <td>{country}</td>
                    <td className="operation">
                        <button type='button' className="buttonUpdate"
                            onClick={
                                () => updateData(street, city, state, postalCode, country, _id)
                        }>
                            Update
                        </button>
                    </td>
                    <td className="operation">
                        <button type='button' className="button"
                            onClick={
                                () => removeData(_id)
                        }>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        }));
    };

    return (
        <div>
            <form className="personal-info-update-form">
                <h2>
                    Update shipping address(es)
                </h2>

                <div className="container">
                    <table id="employee">
                        <thead>
                            <tr>{
                                renderHeader()
                            }</tr>
                        </thead>
                        <tbody>{
                            renderBody()
                        }</tbody>
                    </table>
                </div>

                <p className="btn-wrapper">
                    <span className="btn-cancel"
                        onClick={getDataPay}>
                        {/*Inline element*/}
                        Show
                    </span>
                </p>
            </form>

        </div>
    )
}