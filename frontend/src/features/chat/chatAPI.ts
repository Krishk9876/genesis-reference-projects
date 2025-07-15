const API_URL = 'http://localhost:5000/api/messages'

export async function fetchMessages(token: string) {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.json()
}