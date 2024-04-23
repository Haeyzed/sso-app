import Echo from 'laravel-echo' // Import the 'Echo' class from 'laravel-echo'
import Pusher from 'pusher-js' // Import the 'Pusher' class from 'pusher-js'
import Env from './env' // Import the 'Env' module from './env'

// Define global types for Pusher and Echo (optional)
declare global {
  interface Window {
    Pusher: typeof Pusher // Define Pusher type on the global Window object
    Echo: Echo // Define Echo type on the global Window object
  }
}

// Assign Pusher to the global Window object
window.Pusher = Pusher

// Function to create a private Echo instance with a provided token
export const pvtlaraEcho = (token: string): Echo => {
  return new Echo({
    broadcaster: 'reverb',
    authEndpoint: Env.API_URL + '/api/broadcasting/auth', // Define the authEndpoint using API_URL from Env
    auth: {
      headers: {
        Authorization: 'Bearer ' + token // Set Authorization header with the provided token
      }
    },
    encrypted: false,
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY, // Set the Echo key using environment variables
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST, // Set the WebSocket host using environment variables
    wsPort: process.env.NEXT_PUBLIC_REVERB_PORT, // Set the WebSocket port using environment variables
    wssPort: process.env.NEXT_PUBLIC_REVERB_PORT, // Set the secure WebSocket port using environment variables
    forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https', // Determine if TLS is forced based on environment variables
    enabledTransports: ['ws', 'wss'] // Enable WebSocket and secure WebSocket transports
  })
}

// Create a global Echo instance
export const laraEcho = new Echo({
  broadcaster: 'reverb',
  encrypted: false,
  key: process.env.NEXT_PUBLIC_REVERB_APP_KEY, // Set the Echo key using environment variables
  wsHost: process.env.NEXT_PUBLIC_REVERB_HOST, // Set the WebSocket host using environment variables
  wsPort: process.env.NEXT_PUBLIC_REVERB_PORT, // Set the WebSocket port using environment variables
  wssPort: process.env.NEXT_PUBLIC_REVERB_PORT, // Set the secure WebSocket port using environment variables
  forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https', // Determine if TLS is forced based on environment variables
  enabledTransports: ['ws', 'wss'] // Enable WebSocket and secure WebSocket transports
})
