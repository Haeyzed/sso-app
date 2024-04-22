import NextAuth from 'next-auth/next'; // Import NextAuth library
import { authOptions } from './authOptions'; // Import authentication options

// Initialize NextAuth with the specified authOptions
const nextAuth = NextAuth(authOptions);

// Export nextAuth for both GET and POST requests (dummy export)
export { nextAuth as GET, nextAuth as POST };

