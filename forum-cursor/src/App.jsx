import { useState, useEffect } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import './App.css';

// Mock API function to simulate fetching posts
const fetchInitialPosts = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return [
    {
      id: 1,
      title: 'Welcome to the Forum!',
      content: 'This is a sample post to get you started. Feel free to create your own posts and engage with the community!',
      author: 'Admin',
      authorUsername: 'admin',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
      id: 2,
      title: 'Getting Started with React',
      content: 'React is a powerful library for building user interfaces. Start with components, then learn about state and props. Happy coding!',
      author: 'John Doe',
      authorUsername: 'johndoe',
      createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    },
  ];
};

function ForumApp() {
  const { currentUser } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Load posts from localStorage or fetch from mock API on mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        // First, try to load from localStorage
        const savedPosts = localStorage.getItem('forum-posts');
        if (savedPosts) {
          const parsedPosts = JSON.parse(savedPosts);
          if (parsedPosts.length > 0) {
            setPosts(parsedPosts);
            setLoading(false);
            return;
          }
        }
        
        // If no saved posts, fetch from mock API
        const initialPosts = await fetchInitialPosts();
        setPosts(initialPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('forum-posts', JSON.stringify(posts));
    }
  }, [posts]);

  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    showNotification('Post created successfully!', 'success');
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      showNotification('Post deleted successfully!', 'success');
    }
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              📝 Mini Forum
            </h1>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Logged in as</p>
                <p className="font-semibold text-gray-800 dark:text-white">
                  @{currentUser.username}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {currentUser.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - User Info */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                User Info
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {currentUser.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Username</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    @{currentUser.username}
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Posts: {posts.length}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <PostForm onSubmit={handleAddPost} />
            <PostList posts={posts} onDelete={handleDeletePost} />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <ForumApp />
    </UserProvider>
  );
}

export default App;
