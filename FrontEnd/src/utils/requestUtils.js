export const postData = async (url = '', data = {}) => {
    console.log(data)
    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: data
    });
    return response.json();
}

export const putData = async (url = '', data = {}) => {
    console.log(data)
    const response = await fetch(url, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: data
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

export const deleteData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: data
    });
    return response.json();
}
