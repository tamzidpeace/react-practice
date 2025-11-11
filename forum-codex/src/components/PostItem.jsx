import { useUser } from '../context/UserContext.jsx'

export default function PostItem({ post, onDelete }) {
  const user = useUser()
  const isCurrentUser = user?.name === post.author

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 text-slate-100 shadow-lg shadow-slate-900/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{post.title}</h3>
          <p className="mt-1 text-sm text-slate-400">
            {post.author ?? 'Anonymous'}{' '}
            {isCurrentUser && (
              <span className="ml-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-300">
                you
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onDelete(post.id)}
          className="rounded-full border border-transparent bg-rose-500/80 px-3 py-1 text-sm font-medium text-white transition hover:bg-rose-500"
        >
          Delete
        </button>
      </div>
      <p className="mt-3 text-slate-200">{post.content}</p>
    </article>
  )
}
