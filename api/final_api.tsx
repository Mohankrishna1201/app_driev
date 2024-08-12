import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const baseURL: string = 'https://community-test.driev.bike/driev';

const headers = {
    'Content-Type': 'application/json',
};

const bodyType = JSON.stringify({
    clientId: '070720222304',
    clientSecret: '403222027070'
});

let token: string | null = '';

async function fetchToken(): Promise<string | null> {
    try {
        const response = await fetch(`${baseURL}/api/auth/token`, {
            method: 'POST',
            headers: headers,
            body: bodyType
        });
        const responseBody = await response.json();
        if (response.ok) {
            token = responseBody.accessToken;
            if (token) {
                await AsyncStorage.setItem("storingToken", token);
                await AsyncStorage.setItem("tokenExpiry", (Date.now() + 3 * 3600 * 1000).toString());
                console.log("Token stored", token);
            }
            return token;
        } else {
            console.error('Failed to fetch token:', responseBody);
        }
    } catch (error) {
        console.error('Error fetching token:', error);
    }
    return null;
}

async function getToken(): Promise<string | null> {
    if (!token) {
        token = await AsyncStorage.getItem("storingToken");
    }

    const expiry = await AsyncStorage.getItem("tokenExpiry");
    if (token && expiry && Date.now() < parseInt(expiry)) {
        return token;
    } else {
        return await fetchToken();
    }
}

export async function getRequest(route: string): Promise<any> {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error("No valid token available");
        }
        const response = await fetch(`${baseURL}/${route}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}

export async function getRequestPlusHeaders(route: string, stationId: any): Promise<any> {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error("No valid token available");
        }
        const response = await fetch(`${baseURL}/${route}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Stationid": stationId
            },
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log(error);
    }
    return null;
}

export async function postRequest(route: string, bodyType: any): Promise<any> {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error("No valid token available");
        }
        const response = await fetch(`${baseURL}/${route}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(bodyType)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function putRequest(route: string, bodyType: any): Promise<any> {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error("No valid token available");
        }
        const response = await fetch(`${baseURL}/${route}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(bodyType)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function MapEmployee(route: string, contact: any): Promise<any> {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error("No valid token available");
        }
        const response = await fetch(`${baseURL}/${route}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res: any = await response.json();
        for (let i = 0; i < res.length; i++) {
            if (res[i].contact === contact.toString()) {
                return res[i];
            }
        }
    } catch (error) {
        console.error('Error mapping employee:', error);
    }
    return null;
}






// export async function postRequestplusFormData(route: string, formData: FormData): Promise<any> {
//     try {
//         console.log('Requesting token...');
//         const token = await getToken();
//         if (!token) {
//             throw new Error("No valid token available");
//         }

//         console.log(`Using token: ${token}`);
//         console.log(`Making request to: ${baseURL}/${route}`);
//         console.log('FormData contents:', formData);

//         const response = await axios.post(`${baseURL}/${route}`, formData, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'multipart/form-data',
//             },
//         });

//         console.log('Response data:', response.data);
//         return response.data;
//     } catch (error: any) {
//         console.error('Error in postRequestplusFormData:', error.message);
//         throw error;
//     }
// }






export async function postRequestplusFormDat(formdata: any, ticket: any): Promise<void> {
    const myHeaders = new Headers();
    const token = await getToken();
    myHeaders.append("Authorization", `Bearer ${token}`);



    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    try {
        const response = await fetch(`https://community-test.driev.bike/driev/api/crm/uploadFile/${ticket}`, requestOptions);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// Make sure to call the function when appropriate, for example, on a button click
// document.querySelector("#uploadButton").addEventListener("click", postRequestplusFormData);
