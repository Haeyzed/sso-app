import Env from './env' // Import the 'Env' module from './env'

// Define constants for API URLs and endpoints
export const API_URL = Env.API_URL + '/api' // Construct the API base URL using the 'API_URL' from 'Env'
export const LOGIN_URL = '/auth/login' // Define the login endpoint
export const REGISTER_URL = '/auth/register' // Define the register endpoint
export const CHECK_CREDENTIALS = '/auth/check-credentials' // Define the check-credentials endpoint
export const LOGOUT_URL = '/logout' // Define the logout endpoint
export const RESET_PASSWORD_URL = '/auth/reset-password' // Define the reset password endpoint
export const CHANGE_PASSWORD_URL = '/auth/change-password' // Define the change password endpoint
export const VERIFY_URL = '/auth/verify' // Define the verify endpoint
export const SEND_OTP_URL = '/auth/send-otp' // Define the verify endpoint

// The following endpoints are currently commented out:
export const USERS_URL = '/users' // Example: Define a users endpoint
// export const COMMENT_URL = "/comment"; // Example: Define a COMMENT endpoint
// export const UPDATE_PROFILE = "/update/profile"; // Example: Define an UPDATE PROFILE endpoint
