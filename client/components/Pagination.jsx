export default function Pagination({ page=1, pageSize=10, total=0, onChange }){
  const max = Math.max(1, Math.ceil(total / pageSize))
  const prev = () => onChange && onChange(Math.max(1, page-1))
  const next = () => onChange && onChange(Math.min(max, page+1))
  return (
    <div className="join">
      <button className="btn join-item" onClick={prev} disabled={page<=1}>Prev</button>
      <button className="btn join-item">Page {page} / {max}</button>
      <button className="btn join-item" onClick={next} disabled={page>=max}>Next</button>
    </div>
  )
}
