import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BooksAPI } from '../../api/books.api'

const empty = { title:'', author:'', price:0, status:'AVAILABLE' }

export default function BookForm(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [model, setModel] = useState(empty)
  const isEdit = Boolean(id)

  useEffect(()=>{
    if(isEdit){
      BooksAPI.get(id).then(res => {
        const data = res.data?.data || res.data || {}
        setModel({ ...empty, ...data })
      })
    }
  }, [id])

  const save = async (e) => {
    e.preventDefault()
    if(isEdit) await BooksAPI.update(id, model)
    else await BooksAPI.create(model)
    navigate('/books')
  }

  return (
    <div className="bg-base-100 shadow-xl rounded-xl p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">{isEdit? 'Edit Book' : 'New Book'}</h2>
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
          <span className="label-text">Price</span>
          <input type="number" className="input input-bordered" value={model.price} onChange={e=>setModel({...model, price:Number(e.target.value)})} min="0" step="0.01"/>
        </label>
        <label className="form-control">
          <span className="label-text">Status</span>
          <select className="select select-bordered" value={model.status} onChange={e=>setModel({...model, status:e.target.value})}>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="UNAVAILABLE">UNAVAILABLE</option>
          </select>
        </label>
        <div className="flex gap-2">
          <button className="btn btn-primary" type="submit">Save</button>
          <button className="btn" type="button" onClick={()=>navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
