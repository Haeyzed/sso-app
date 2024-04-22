// Define a class to manage environment variables
export default class Env {
    // Define a static property for the API URL based on the NEXT_PUBLIC_API_URL environment variable
    static API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;
  
    // Define a static property for the application URL based on the NEXT_PUBLIC_NEXTAUTH_URL environment variable
    static APP_URL: string = process.env.NEXT_PUBLIC_NEXTAUTH_URL as string;
  }
  