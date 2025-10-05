import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BooksAPI } from '../../api/books.api'
import TableCard from '../../components/TableCard'

export default function BooksList(){
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const load = () => {
    setLoading(true)
    BooksAPI.list().then(res => {
      const data = res.data?.data || res.data || []
      setRows(Array.isArray(data) ? data : (data.items || []))
    }).finally(()=>setLoading(false))
  }

  const remove = async (id) => {
    if(!confirm('Delete this book?')) return
    await BooksAPI.remove(id)
    load()
  }

  useEffect(load, [])

  return (
    <TableCard
      title="📚 Books"
      actions={<Link to="/books/new" className="btn btn-primary">+ New Book</Link>}
    >
      {loading ? <div className="p-4 text-center text-gray-500">Loading...</div> : (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.price}</td>
                <td>
                  <span className={`badge ${b.status==='AVAILABLE'?'badge-success':'badge-error'}`}>{b.status}</span>
                </td>
                <td className="flex gap-2">
                  <button className="btn btn-sm" onClick={()=>navigate(`/books/${b.id}/edit`)}>Edit</button>
                  <button className="btn btn-sm btn-error" onClick={()=>remove(b.id)}>Delete</button>
                </td>
              </tr>
            )): <tr><td colSpan="6" className="text-center text-gray-500">No data</td></tr>}
          </tbody>
        </table>
      )}
    </TableCard>
  )
}
