import { useEffect, useMemo, useState } from 'react'
import PostForm from './components/PostForm.jsx'
import PostList from './components/PostList.jsx'
import { UserProvider, useUser } from './context/UserContext.jsx'
import './App.css'

const DEFAULT_POSTS = [
  {
    id: 'welcome',
    title: 'Welcome to the mini forum 👋',
    content:
      'Share what you are learning, tips that helped you understand a React concept, or even blockers so others can help.',
    author: 'Community Bot',
  },
  {
    id: 'hooks-day-1',
    title: 'First impressions of React Hooks',
    content:
      'useState and useEffect took some time to click, but now composition feels so much cleaner than rewriting class lifecycle methods.',
    author: 'Lina',
  },
  {
    id: 'tailwind-setup',
    title: 'Tailwind setup tips',
    content:
      'If your styles are not applying, confirm the @import path and restart the dev server after installing Tailwind.',
    author: 'Marco',
  },
]

function ForumApp() {
  const user = useUser()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(DEFAULT_POSTS)
      setLoading(false)
    }, 650)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!toast) return
    const toastTimer = setTimeout(() => setToast(''), 2200)
    return () => clearTimeout(toastTimer)
  }, [toast])

  const stats = useMemo(
    () => ({
      totalPosts: posts.length,
      authoredByYou: posts.filter((post) => post.author === user?.name).length,
    }),
    [posts, user?.name],
  )

  const handleAddPost = (newPost) => {
    const id = globalThis.crypto?.randomUUID?.() ?? Date.now().toString()
    setPosts((prev) => [{ ...newPost, id }, ...prev])
    setToast('Post published')
  }

  const handleDeletePost = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id))
    setToast('Post removed')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-950/70 px-4 py-6 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
              React practice lab
            </p>
            <h1 className="text-3xl font-semibold text-white">
              Blog Post / Mini Forum
            </h1>
          </div>
          <div className="flex gap-4 text-sm text-slate-400">
            <span className="rounded-full border border-slate-800 px-4 py-2">
              {stats.totalPosts} posts
            </span>
            <span className="rounded-full border border-slate-800 px-4 py-2">
              {stats.authoredByYou} by you
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[280px,1fr]">
        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-center">
            <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-2 border-emerald-400/60">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">
              {user.name}
            </h2>
            <p className="text-sm text-slate-400">{user.role}</p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 text-sm text-slate-300">
            <h3 className="text-base font-semibold text-white">Practice tips</h3>
            <ul className="mt-3 space-y-2 text-slate-400">
              <li>Break UI into reusable components.</li>
              <li>Use controlled inputs to keep form state predictable.</li>
              <li>Lift shared state up or place it in context.</li>
            </ul>
          </div>
        </aside>

        <section className="space-y-6">
          <PostForm onSubmit={handleAddPost} />

          <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6 shadow-inner shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Recent posts</h2>
              <span className="text-sm text-slate-400">
                {loading ? 'Loading...' : `${posts.length} entries`}
              </span>
            </div>

            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-6 rounded-full bg-slate-800/70" />
                <div className="h-28 rounded-2xl bg-slate-800/70" />
                <div className="h-28 rounded-2xl bg-slate-800/60" />
              </div>
            ) : (
              <PostList posts={posts} onDelete={handleDeletePost} />
            )}
          </div>
        </section>
      </main>

      {toast && (
        <div className="fixed bottom-6 right-6 rounded-2xl border border-emerald-500/40 bg-slate-900 px-4 py-3 text-sm text-emerald-200 shadow-xl shadow-emerald-500/20">
          {toast}
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <UserProvider>
      <ForumApp />
    </UserProvider>
  )
}
