export const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}
