import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ComicsAPI } from '../../api/comics.api'
import TableCard from '../../components/TableCard'

export default function ComicsList(){
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const load = () => {
    setLoading(true)
    ComicsAPI.list().then(res => {
      const data = res.data?.data || res.data || []
      setRows(Array.isArray(data) ? data : (data.items || []))
    }).finally(()=>setLoading(false))
  }

  const remove = async (id) => {
    if(!confirm('Delete this comic?')) return
    await ComicsAPI.remove(id)
    load()
  }

  useEffect(load, [])

  return (
    <TableCard
      title="🦸 Comics"
      actions={<Link to="/comics/new" className="btn btn-accent">+ New Comic</Link>}
    >
      {loading ? <div className="p-4 text-center text-gray-500">Loading...</div> : (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.title}</td>
                <td>{r.author}</td>
                <td>
                  <span className={`badge ${r.status==='AVAILABLE'?'badge-success':'badge-error'}`}>{r.status}</span>
                </td>
                <td className="flex gap-2">
                  <button className="btn btn-sm" onClick={()=>navigate(`/comics/${r.id}/edit`)}>Edit</button>
                  <button className="btn btn-sm btn-error" onClick={()=>remove(r.id)}>Delete</button>
                </td>
              </tr>
            )): <tr><td colSpan="5" className="text-center text-gray-500">No data</td></tr>}
          </tbody>
        </table>
      )}
    </TableCard>
  )
}
