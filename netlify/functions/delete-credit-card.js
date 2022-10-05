const axios = require("axios");

exports.handler = async function (event) {
    try {
        const bod = JSON.parse(event.body);
        const form_data = (bod.formData).toString("utf-8");
        const token = bod.token;
        const baseURL = {
            dev: 'http://localhost:5000/api/testing-deleteCC',
            prod: `${process.env.REACT_APP_BACKEND_URL}/api/testing-deleteCC`,
        };

        const url =
            process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;

        const { data } = await axios.post(url, form_data, {
            headers: {
                'x-auth-token': token,
            },
        });
        console.log("line 22:");
        console.log(data);
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 404,
            body: err.toString(),
        };
    }
};
