import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ComicsAPI } from '../../api/comics.api'

const empty = { title:'', author:'', status:'AVAILABLE' }

export default function ComicForm(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [model, setModel] = useState(empty)
  const isEdit = Boolean(id)

  useEffect(()=>{
    if(isEdit){
      ComicsAPI.get(id).then(res => {
        const data = res.data?.data || res.data || {}
        setModel({ ...empty, ...data })
      })
    }
  }, [id])

  const save = async (e) => {
    e.preventDefault()
    if(isEdit) await ComicsAPI.update(id, model)
    else await ComicsAPI.create(model)
    navigate('/comics')
  }

  return (
    <div className="bg-base-100 shadow-xl rounded-xl p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">{isEdit? 'Edit Comic' : 'New Comic'}</h2>
      <form onSubmit={save} className="grid gap-4">
        <label className="form-control">
          <span className="label-text">Title</span>
          <input className="input input-bordered" value={model.title} onChange={e=>setModel({...model, title:e.target.value})} required/>
        </label>
        <label className="form-control">
          <span className="label-text">Author</span>
          <input className="input input-bordered" value={model.author} onChange={e=>setModel({...model, author:e.target.value})} required/>
        </label>
        <label className="form-control">
          <span className="label-text">Status</span>
          <select className="select select-bordered" value={model.status} onChange={e=>setModel({...model, status:e.target.value})}>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="UNAVAILABLE">UNAVAILABLE</option>
          </select>
        </label>
        <div className="flex gap-2">
          <button className="btn btn-accent" type="submit">Save</button>
          <button className="btn" type="button" onClick={()=>navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
