import PostItem from './PostItem.jsx'

export default function PostList({ posts, onDelete }) {
  if (!posts.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-400">
        <p>No posts yet. Be the first to share something!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onDelete={onDelete} />
      ))}
    </div>
  )
}
