const axios = require("axios");

exports.handler = async function (event) {
    try {
        const form_data = event.body;
        const contentType = event.headers['content-type'];

        const newForm = Buffer.from(form_data, 'base64').toString('utf8');
        const baseURL = {
            dev: 'http://localhost:5000/api/signin',
            prod: `${process.env.REACT_APP_BACKEND_URL}/api/signin`,
        };

        const url =
            process.env.NODE_ENV === 'production' ? baseURL.prod : baseURL.dev;

        const { data } = await axios.post(url, newForm, {
            headers: {
                'Content-Type': contentType
            },
        });
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (err) {
        return {
            statusCode: 404,
            body: err.response.data.msg.toString(),
        };
    }
};
