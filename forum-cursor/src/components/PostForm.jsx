import { useState } from 'react';
import { useUser } from '../context/UserContext';

const MAX_CONTENT_LENGTH = 500;

export default function PostForm({ onSubmit }) {
  const { currentUser } = useUser();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      setError(`Content must be less than ${MAX_CONTENT_LENGTH} characters`);
      return;
    }

    // Create new post
    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      author: currentUser.name,
      authorUsername: currentUser.username,
      createdAt: new Date().toISOString(),
    };

    onSubmit(newPost);
    
    // Reset form
    setTitle('');
    setContent('');
    setError('');
  };

  const remainingChars = MAX_CONTENT_LENGTH - content.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Create New Post
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter post title..."
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            placeholder="Write your post content..."
          />
          <div className="flex justify-between items-center mt-1">
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <p
              className={`text-sm ml-auto ${
                remainingChars < 50
                  ? 'text-red-500'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {remainingChars} characters remaining
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
}

