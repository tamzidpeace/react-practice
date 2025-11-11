import PostItem from './PostItem';

export default function PostList({ posts, onDelete }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No posts yet. Be the first to create one!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Recent Posts ({posts.length})
      </h2>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onDelete={onDelete} />
      ))}
    </div>
  );
}

