import { API_URL, TITLES_URL } from '@/lib/apiEndPoints'

export async function getTitles(nextPage?: string) {
  const res = await fetch(API_URL + TITLES_URL)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
