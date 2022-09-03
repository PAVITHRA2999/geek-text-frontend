import React, {useState, useEffect} from 'react';
import "../PersonalInfoManager/PersonalInfoManager.css";
import axios from 'axios';

export const UpdateShippingAddress = () => {

    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [id, setId] = useState(null);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('shippingAdress'));
        console.log(data.data)
        setStreet(data.data.street)
        setCity(data.data.city);
        setState(data.data.state);
        setPostalCode(data.data.postalCode);
        setCountry(data.data.country);
        setId(data.data._id)
    }, [])
    const handleChangeLoginManager = (e) => {
        switch (e.target.id) {
            case "street":
                setStreet(e.target.value);
                break;
            case "city":
                setCity(e.target.value);
                break;
            case "state":
                setState(e.target.value);
                break;
            case "postalCode":
                setPostalCode(e.target.value);
                break;
            case "country":
                setCountry(e.target.value);
                break;
            default:
                break;
        }
    }

    const BlankValidation = () => {
        if (!street && !city && !state && !postalCode && !country) {
            alert('At least 1 field is required');
        }
    }

    const testingVars = () => {
        try {
            console.log(street);
            console.log(city);
            console.log(state);
            console.log(postalCode);
            console.log(country);

        } catch (e) {
            alert(e);
            window.location.reload();
            return;
        }

    }

    const cancelFunc = () => {
        window.location.replace("http://localhost:3000/dashboard");
    }


    const UpdateInfo = (e) => {
        e.preventDefault();
        // console.log("gafsdafsadfsfdsfsafdsafassafsafa");
        BlankValidation();

        const baseURL = {
            dev: "http://localhost:5000/api/updating-shipping-adress",
            prod: ''
        }
        const url = process.env.NODE_ENV === "production" ? baseURL.prod : baseURL.dev;
        const form_data = new FormData();


        // street, cardNumber, expirationMonth, expirationYear, securityNumber
        form_data.append('street', street);
        form_data.append('city', city);
        form_data.append('state', state);
        form_data.append('postalCode', postalCode);
        form_data.append('country', country);
        form_data.append('id', id);
        const token = localStorage.getItem('token')
        console.log('we are firing this');

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
                    Update Shipping Address
                </h2>
                <label>Street</label>
                <input onChange={handleChangeLoginManager}
                    type="text"
                    id="street"
                    value={street}
                    placeholder="4 Yawkey Way"/>
                <label>City</label>
                <input onChange={handleChangeLoginManager}
                    type="text"
                    value={city}
                    id="city"
                    placeholder="Boston"/>
                <label>State</label>
                <input onChange={handleChangeLoginManager}
                    type="text"
                    id="state"
                    value={state}
                    placeholder="MA"/>
                <label>Postal Code</label>
                <input onChange={handleChangeLoginManager}
                    type="text"
                    id="postalCode"
                    value={postalCode}
                    placeholder="02225"/>
                <label style={
                    {marginTop: "1rem"}
                }>Country</label>
                <input onChange={handleChangeLoginManager}
                    type="text"
                    id="country"
                    value={country}
                    placeholder="USA"/>
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