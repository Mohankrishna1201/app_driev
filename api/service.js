import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const baseURL = 'https://community-test.driev.bike/driev';

const headers = {
    'Content-Type': 'application/json',
};

const bodyType = JSON.stringify({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

let token = '';


console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);

const fetchToken = async () => {
    try {
        const response = await fetch(`${baseURL}/api/auth/token`, {
            method: 'POST',
            headers: headers,
            body: bodyType
        });
        const responseBody = await response.json();

        if (response.ok) {
            token = responseBody.accessToken;
            console.log('Token stored successfully', token);
            return token;
        } else {
            console.error('Failed to fetch token:', responseBody);
        }
    } catch (error) {
        console.error('Error fetching token:', error);
    }
    return null;
};

fetchToken()

const axiosRequest = async () => {
    const token = await fetchToken();
    return axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getRequest = async (path) => {
    const axiosInstance = await axiosRequest();
    if (axiosInstance) {
        try {
            const response = await axiosInstance.get(path);
            console.log(response.data);
        } catch (error) {
            console.error('Error making request:', error);
        }
    } else {
        console.error('Failed to create Axios instance due to missing token.');
    }

}

export default { axiosRequest, getRequest }

