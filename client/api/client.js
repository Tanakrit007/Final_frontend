import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE || 'https://bookshop-api-er7t.onrender.com'
export const http = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
})
