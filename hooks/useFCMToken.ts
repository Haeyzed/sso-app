'use client'

import { useEffect, useState } from 'react'
import { getToken, isSupported } from 'firebase/messaging'
import useNotificationPermission from './useNotificationPermission'
import { messaging } from '@/utils/firebase'

const useFCMToken = () => {
  const permission = useNotificationPermission()
  const [fcmToken, setFcmToken] = useState<string | null>(null)

  useEffect(() => {
    const retrieveToken = async () => {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        if (permission === 'granted') {
          const isFCMSupported = await isSupported()
          if (!isFCMSupported) return
          const fcmToken = await getToken(messaging(), {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
          })
          setFcmToken(fcmToken)
        }
      }
    }
    retrieveToken()
  }, [permission])

  return fcmToken
}

export default useFCMToken
