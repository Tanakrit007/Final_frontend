import { http } from './client'
export const ItemsAPI = {
  list: () => http.get('/api/items')
}
