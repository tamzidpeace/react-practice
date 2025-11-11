import { useMemo, useState } from 'react'
import { useUser } from '../context/UserContext.jsx'

const CONTENT_LIMIT = 280

export default function PostForm({ onSubmit }) {
  const user = useUser()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const charactersLeft = useMemo(
    () => CONTENT_LIMIT - content.length,
    [content],
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError('Please add both a title and some content.')
      return
    }

    setError('')
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      author: user?.name ?? 'Anonymous',
    })

    setTitle('')
    setContent('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 text-slate-100 shadow-2xl shadow-slate-950/40"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">Create a Post</h2>
        <p className="text-sm text-slate-400">
          Posting as <span className="font-medium text-emerald-300">{user?.name}</span>
        </p>
      </div>

      <label className="block text-sm font-semibold text-slate-200" htmlFor="title">
        Title
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="React Hooks Deep Dive"
        className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      />

      <label
        className="mt-6 block text-sm font-semibold text-slate-200"
        htmlFor="content"
      >
        Content
      </label>
      <textarea
        id="content"
        value={content}
        onChange={(event) => setContent(event.target.value.slice(0, CONTENT_LIMIT))}
        placeholder="Share what you learned, a question, or a useful resource..."
        rows={5}
        maxLength={CONTENT_LIMIT}
        className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      />
      <div className="mt-2 flex items-center justify-between text-sm">
        <span
          className={`${
            charactersLeft < 40 ? 'text-amber-300' : 'text-slate-400'
          }`}
        >
          {charactersLeft} characters left
        </span>
        {error && <span className="text-rose-300">{error}</span>}
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-2xl bg-emerald-500/90 px-4 py-3 text-base font-semibold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300/60"
      >
        Publish post
      </button>
    </form>
  )
}
