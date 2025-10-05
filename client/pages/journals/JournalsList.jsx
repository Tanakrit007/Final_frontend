import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { JournalsAPI } from '../../api/journals.api'
import TableCard from '../../components/TableCard'

export default function JournalsList(){
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const load = () => {
    setLoading(true)
    JournalsAPI.list().then(res => {
      const data = res.data?.data || res.data || []
      setRows(Array.isArray(data) ? data : (data.items || []))
    }).finally(()=>setLoading(false))
  }

  const remove = async (id) => {
    if(!confirm('Delete this journal?')) return
    await JournalsAPI.remove(id)
    load()
  }

  useEffect(load, [])

  return (
    <TableCard
      title="📖 Journals"
      actions={<Link to="/journals/new" className="btn btn-secondary">+ New Journal</Link>}
    >
      {loading ? <div className="p-4 text-center text-gray-500">Loading...</div> : (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Publisher</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.title}</td>
                <td>{r.publisher}</td>
                <td>
                  <span className={`badge ${r.status==='AVAILABLE'?'badge-success':'badge-error'}`}>{r.status}</span>
                </td>
                <td className="flex gap-2">
                  <button className="btn btn-sm" onClick={()=>navigate(`/journals/${r.id}/edit`)}>Edit</button>
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
