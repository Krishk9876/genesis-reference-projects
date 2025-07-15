const API_URL = 'http://localhost:5000/api/auth'

export async function loginUser({ email, password }: { email: string, password: string }) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error((await res.json()).error)
  return res.json()
}

export async function registerUser({ username, email, password }: { username: string, email: string, password: string }) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  })
  if (!res.ok) throw new Error((await res.json()).error)
  return res.json()
}