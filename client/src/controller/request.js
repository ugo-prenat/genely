const backendUrl = process.env.REACT_APP_BACKEND_URL
const token = localStorage.getItem('token')

const get = async url => {
  const req = await fetch(
    `${backendUrl}${url}`,
    {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }
  )
  const res = await req.json()
  return res
}
const post = async (url, data) => {
  const req = await fetch(
    `${backendUrl}${url}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 
        'Content-Type': 'Application/json',
        'authorization': `Bearer ${token ? token : ''}`
      }
    }
  )
  const res = await req.json()
  return res
}

export const request = { get, post }