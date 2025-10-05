import { http } from './client'

const base = '/api/journals'

export const JournalsAPI = {
  list: (params={}) => http.get(base, { params }),
  get: (id) => http.get(`${base}/${id}`),
  create: (data) => http.post(base, data),
  update: (id, data) => http.put(`${base}/${id}`, data),
  remove: (id) => http.delete(`${base}/${id}`),
}
