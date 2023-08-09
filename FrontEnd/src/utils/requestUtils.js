
const host = "https://p99test.fly.dev"
// const host = "http://127.0.0.1:8080"

export const login = async (data = {}) => {
    
    const response = await fetch(host +"/v1/auth/login", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams(data)
    });
    return response.json();
}

export const postData = async (url = '', data = {}) => {
    const response = await fetch(host+url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization':  `Bearer ${sessionStorage.getItem("p99-auth-token")}`
        },
        body: new URLSearchParams(data)
    });
    return response
}

export const putData = async (url = '', data = {}) => {
    const response = await fetch(host+url, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            "p99-auth-token": `Bearer ${sessionStorage.getItem("p99-auth-token")}`

        },
        body: new URLSearchParams(data)
    });
    return response
}

export const getData = async (url = '') => {
    const response = await fetch(host+url, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            // "p99-auth-token":sessionStorage.getItem("p99-auth-token"),
            'Authorization':  `Bearer ${sessionStorage.getItem("p99-auth-token")}`


        }
    });
    return response
}

export const deleteData = async (url = '', data = {}) => {
    const response = await fetch(host+url, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization':  `Bearer ${sessionStorage.getItem("p99-auth-token")}`
        },
        body: new URLSearchParams(data)
    });
    return response
}
