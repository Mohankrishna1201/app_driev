const baseURL: string = 'https://community-test.driev.bike/driev';

const headers = {
    'Content-Type': 'application/json',
};

const bodyType = JSON.stringify({
    clientId: '070720222304',
    clientSecret: '403222027070'
});

let token = '';

export async function fetchToken(): Promise<any> {
    try {
        const response = await fetch(`${baseURL}/api/auth/token`, {
            method: 'POST',
            headers: headers,
            body: bodyType
        });
        const responseBody = await response.json();
        console.log(bodyType);
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
export async function getRequest(route: string): Promise<any> {

    try {
        await fetchToken();
        const response = await fetch(`${baseURL}/${route}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log(error);
    }

}

export async function getRequestPlusHeaders(route: string, stationId: string): Promise<any> {

    try {
        await fetchToken();
        const response = await fetch(`${baseURL}/${route}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Stationid": stationId
            },
        })
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log(error);
    }

}

export async function postRequest(route: string, bodyType: any): Promise<any> {
    try {
        await fetchToken(); // Ensure this is awaited
        const response = await fetch(`${baseURL}/${route}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(bodyType) // Ensure body is a JSON string
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json(); // Properly parse the JSON response
    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error to allow the calling function to handle it
    }
}
