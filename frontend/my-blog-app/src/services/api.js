const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

const handleResponse = async (response) => {
    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error("Session expired. Please login again.");
    }

    if (response.status === 204) return null;

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
    }

    return data;
};


// User API
export const registerApi = async (email, password, firstName, lastName) => {
    const response = await fetch('/api/Auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email, Password: password, FirstName: firstName, LastName: lastName }),
    });

    return handleResponse(response);
};

export const loginApi = async (email, password) => {
    const response = await fetch('/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: email, Password: password }),
    });

    return handleResponse(response);
};

// Post API
export const getPostsApi = async (offset = 0, limit = 5) => {
    const response = await fetch(`/api/Post?offset=${offset}&limit=${limit}`, {
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
};

export const createPostApi = async (postData) => {
    const response = await fetch('/api/Post', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(postData),
    });

    return handleResponse(response);
};

export const updatePostApi = async (id, postData) => {
    const response = await fetch(`/api/Post/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ...postData, id }),
    });

    return handleResponse(response);
};

export const deletePostApi = async (id) => {
    const response = await fetch(`/api/Post/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });

    return handleResponse(response);
};

// Comment API
export const getCommentsApi = async (postId) => {
    const response = await fetch(`/api/Comment/post/${postId}`, {
        headers: getAuthHeaders(),
    });

    return handleResponse(response);
};

export const createCommentApi = async (commentData) => {
    const response = await fetch('/api/Comment', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(commentData),
    });

    return handleResponse(response);
};

export const deleteCommentApi = async (id) => {
    const response = await fetch(`/api/Comment/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    
    return handleResponse(response);
};

export const updateCommentApi = async (id, commentData) => {
    const response = await fetch(`/api/Comment/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ...commentData, id }),
    });

    return handleResponse(response);
};
