const backendUrl = process.env.REACT_APP_BACKEND_URL

const get = async url => {
  // Make a GET request
  const req = await fetch(`${backendUrl}${url}`)
  const res = await req.json()
  return res
}
const post = async (url, data) => {
  // Make a POST request
  const req = await fetch(
    `${backendUrl}${url}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'Application/json' }
    }
  )
  const res = await req.json()
  return res
}

export const request = { get, post }