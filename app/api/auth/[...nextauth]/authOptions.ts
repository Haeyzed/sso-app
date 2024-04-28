import { LOGIN_URL } from '@/lib/apiEndPoints'
import myAxios from '@/lib/axios.config'
import { AuthOptions, ISODateString, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

export interface CustomSession {
  user?: CustomUser
  expires: ISODateString
}

export interface CustomUser {
  token?: string | null
  id?: number | null
  title?: any | null
  name?: string | null
  email?: string | null
  username?: string | null
  phone_number?: any | null
  image?: string | null
  country?: any | null
  state?: any | null
  city?: any | null
  fcm_token?: string | null
  is_active?: boolean | null
  is_banned?: boolean | null
  otp?: number | null
  otp_expires_at?: string | null
  email_verified_at?: any | null
  last_login_at?: any | null
  current_login_at?: any | null
  last_login_ip?: any | null
  current_login_ip?: any | null
  login_count?: number | null
  created_at?: string | null
  updated_at?: string | null
  deleted_at?: any | null
  blocked_ips?: any[] | null
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session?.image) {
        const user: CustomUser = token.user as CustomUser
        user.image = session?.image
        console.log('The token is', token)
      }
      if (user) {
        token.user = user
      }
      return token
    },

    async session({
      session,
      token,
      user
    }: {
      session: CustomSession
      token: JWT
      user: User
    }) {
      session.user = token.user as CustomUser
      return session
    }
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
        fcm_token: {}
      },
      async authorize(credentials, req) {
        const res = await myAxios.post(LOGIN_URL, credentials)
        const response = res.data
        const user = response?.user
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ]
}
