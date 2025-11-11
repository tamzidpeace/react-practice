import { useUser } from '../context/UserContext';

export default function PostItem({ post, onDelete }) {
  const { currentUser } = useUser();
  const isAuthor = post.authorUsername === currentUser.username;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            {post.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <span className="font-medium">@{post.authorUsername}</span>
            <span>•</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
        {isAuthor && (
          <button
            onClick={() => onDelete(post.id)}
            className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Delete post"
          >
            Delete
          </button>
        )}
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
        {post.content}
      </p>
    </article>
  );
}

