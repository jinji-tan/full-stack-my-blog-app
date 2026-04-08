const handleResponse = async (response) => {
    if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login';
        throw new Error("Session expired. Please login again.")
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message) || "Something went wrong. Please try again.";
    }

    return data
}

export const registerApi = async (email, password, firstName, lastName) => {
    const response = await fetch('/api/Auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Password: password, FirstName: firstName, LastName: lastName }),
    })

    return handleResponse(response);
}

export const loginApi = async (email, password) => {
    const response = await fetch('/api/Auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Password: password }),
    })

    return handleResponse(response);
}