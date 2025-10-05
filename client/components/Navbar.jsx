import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">📚 Bookshop</Link>
      </div>
      <div className="flex-none gap-2">
        <Link to="/books" className="btn btn-sm btn-primary">Books</Link>
        <Link to="/journals" className="btn btn-sm btn-secondary">Journals</Link>
        <Link to="/comics" className="btn btn-sm btn-accent">Comics</Link>
      </div>
    </div>
  )
}
