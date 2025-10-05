export default function TableCard({ title, actions, children }){
  return (
    <div className="bg-base-100 shadow-xl rounded-xl p-6">
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">{actions}</div>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  )
}
