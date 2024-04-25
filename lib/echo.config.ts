import Echo from "laravel-echo";
import Pusher from "pusher-js";
import Env from "./env";

// Extend the Window interface to include Pusher
declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

// Assign Pusher to window if running in a client-side environment
if (typeof window !== "undefined") {
  window.Pusher = Pusher;
}

export const pvtlaraEcho = (token: string): Echo => {
  return new Echo({
    broadcaster: "reverb",
    authEndpoint: Env.API_URL + "/api/broadcasting/auth",
    auth: {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
    encrypted: false,
    key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
    wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
    wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
    forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
    enabledTransports: ["ws", "wss"],
  });
};

// Create Echo instance for client-side usage
export const laraEcho = typeof window !== "undefined" && window.Pusher
  ? new Echo({
      broadcaster: "reverb",
      encrypted: false,
      key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
      wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
      wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
      wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
      forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? "https") === "https",
      enabledTransports: ["ws", "wss"],
    })
  : null;
