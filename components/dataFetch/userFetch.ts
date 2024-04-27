import { API_URL, USERS_URL } from '@/lib/apiEndPoints'
import { toast } from 'sonner'

export async function getUsers(token: string, nextPage?: string) {
  const res = await fetch(API_URL + USERS_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return await res.json()
}
