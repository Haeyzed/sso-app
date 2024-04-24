// Import necessary modules and types
import { LOGIN_URL } from '@/lib/apiEndPoints' // Import the LOGIN_URL constant
import myAxios from '@/lib/axios.config' // Import the configured axios instance
import { AuthOptions, ISODateString, User } from 'next-auth' // Import necessary types from next-auth
import { JWT } from 'next-auth/jwt' // Import the JWT type
import CredentialsProvider from 'next-auth/providers/credentials' // Import the CredentialsProviderImport the FacebookProvider

// Define a custom session interface
export interface CustomSession {
  user?: CustomUser // Optional user object of CustomUser type
  expires: ISODateString // ISO date string for expiration
}

// Define a custom user interface
export interface CustomUser {
  token?: string | null // Optional token string
  id?: number | null // Optional user ID
  title?: any | null // Optional title
  name?: string | null // Optional name
  email?: string | null // Optional email
  username?: string | null // Optional username
  phone_number?: any | null // Optional phone number
  image?: string | null // Optional image URL
  country?: any | null // Optional country
  state?: any | null // Optional state
  city?: any | null // Optional city
  is_active?: boolean | null // Optional active status
  is_banned?: boolean | null // Optional banned status
  otp?: number | null // Optional one-time password
  otp_expires_at?: string | null // Optional OTP expiration date/time
  email_verified_at?: any | null // Optional email verification date/time
  last_login_at?: any | null // Optional last login date/time
  current_login_at?: any | null // Optional current login date/time
  last_login_ip?: any | null // Optional last login IP address
  current_login_ip?: any | null // Optional current login IP address
  login_count?: number | null // Optional login count
  created_at?: string | null // Optional creation date/time
  updated_at?: string | null // Optional last update date/time
  deleted_at?: any | null // Optional deletion date/time
  blocked_ips?: any[] | null // Optional array of blocked IPs
}

// Define authentication options
export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login' // Specify the sign-in page
  },
  callbacks: {
    // Define JWT callback function
    async jwt({ token, user, trigger, session }) {
      // Update user image in the token if session has image data
      if (trigger === 'update' && session?.image) {
        const user: CustomUser = token.user as CustomUser
        user.image = session?.image
        console.log('The token is', token)
      }
      if (user) {
        token.user = user
      }
      return token // Return updated token
    },

    // Define session callback function
    async session({
      session,
      token,
      user
    }: {
      session: CustomSession
      token: JWT
      user: User
    }) {
      session.user = token.user as CustomUser // Set session user from token user
      return session // Return updated session
    }
  },

  providers: [
    // Define CredentialsProvider
    CredentialsProvider({
      name: 'Credentials', // Specify provider name
      credentials: {
        email: {}, // Specify email as a credential
        password: {} // Specify password as a credential
      },
      async authorize(credentials, req) {
        // Authorization logic using myAxios to POST to LOGIN_URL
        const res = await myAxios.post(LOGIN_URL, credentials) // Perform login request
        const response = res.data // Get response data
        const user = response?.user // Extract user from response
        if (user) {
          return user // Return user if found
        } else {
          return null // Return null if user not found
        }
      }
    })
    // Add other providers here (e.g., GithubProvider, GoogleProvider, FacebookProvider)
  ]
}
