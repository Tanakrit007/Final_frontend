import { useEffect, useState } from 'react'
import { ItemsAPI } from '../api/items.api'
import { Link } from 'react-router-dom'

export default function Home(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ItemsAPI.list().then(res => {
      setItems(res.data?.data || res.data || [])
    }).finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-base-100 shadow-xl rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">📦 All Products</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <Link to="/books" className="btn btn-sm btn-primary">📚 View Books</Link>
        <Link to="/journals" className="btn btn-sm btn-secondary">📖 View Journals</Link>
        <Link to="/comics" className="btn btn-sm btn-accent">🦸 View Comics</Link>
      </div>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title || item.name || '-'}</td>
                  <td>{item.type}</td>
                  <td>
                    <span className={`badge ${item.status === 'AVAILABLE' ? 'badge-success' : 'badge-error'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="text-center text-gray-500">No items found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
