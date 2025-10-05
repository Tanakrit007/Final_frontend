import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { JournalsAPI } from '../../api/journals.api'

const empty = { title:'', publisher:'', status:'AVAILABLE' }

export default function JournalForm(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [model, setModel] = useState(empty)
  const isEdit = Boolean(id)

  useEffect(()=>{
    if(isEdit){
      JournalsAPI.get(id).then(res => {
        const data = res.data?.data || res.data || {}
        setModel({ ...empty, ...data })
      })
    }
  }, [id])

  const save = async (e) => {
    e.preventDefault()
    if(isEdit) await JournalsAPI.update(id, model)
    else await JournalsAPI.create(model)
    navigate('/journals')
  }

  return (
    <div className="bg-base-100 shadow-xl rounded-xl p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">{isEdit? 'Edit Journal' : 'New Journal'}</h2>
      <form onSubmit={save} className="grid gap-4">
        <label className="form-control">
          <span className="label-text">Title</span>
          <input className="input input-bordered" value={model.title} onChange={e=>setModel({...model, title:e.target.value})} required/>
        </label>
        <label className="form-control">
          <span className="label-text">Publisher</span>
          <input className="input input-bordered" value={model.publisher} onChange={e=>setModel({...model, publisher:e.target.value})} required/>
        </label>
        <label className="form-control">
          <span className="label-text">Status</span>
          <select className="select select-bordered" value={model.status} onChange={e=>setModel({...model, status:e.target.value})}>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="UNAVAILABLE">UNAVAILABLE</option>
          </select>
        </label>
        <div className="flex gap-2">
          <button className="btn btn-secondary" type="submit">Save</button>
          <button className="btn" type="button" onClick={()=>navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
