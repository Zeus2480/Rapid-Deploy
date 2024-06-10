import axios from 'axios'
import router from '../router/index'  // Adjust the path according to your file structure

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9000',  // Replace with your API base URL
    // You can add other default configurations here if needed
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
    config => {
        // Get the token from local storage
        const token = localStorage.getItem('auth_token')

        // If the token exists, add it to the headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    error => {
        // Handle the error
        return error
    }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
    response => {
        // If the response is successful, just return the response
        return response.data
    },
    error => {
        // If the response is an error, check if it is a 401 (Unauthorized)

        if (error.response && error.response.status === 401) {
            // Remove the auth token from local storage
            localStorage.removeItem('auth_token')

            // Redirect to the login page
            router.push('/login')
        }

        // Return the error to the calling code
        return error
    }
)

export default axiosInstance
