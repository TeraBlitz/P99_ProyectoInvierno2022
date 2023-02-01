
const host = "https://p99test.fly.dev"

export const login = async (data = {}) => {
    console.log(data)
    const response = await fetch(host +"/v1/auth/login", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams(data)
    });
    return response.json();
}

export const postData = async (url = '', data = {}) => {
    const response = await fetch(host+url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams(data)
    });
    return response
}

export const putData = async (url = '', data = {}) => {
    const response = await fetch(host+url, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams(data)
    });
    return response
}

export const getData = async (url = '') => {
    const response = await fetch(host+url, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response
}

export const deleteData = async (url = '', data = {}) => {
    const response = await fetch(host+url, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams(data)
    });
    return response
}
