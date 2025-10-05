import { http } from './client'

const base = '/api/comics'

export const ComicsAPI = {
  list: (params={}) => http.get(base, { params }),
  get: (id) => http.get(`${base}/${id}`),
  create: (data) => http.post(base, data),
  update: (id, data) => http.put(`${base}/${id}`, data),
  remove: (id) => http.delete(`${base}/${id}`),
}
