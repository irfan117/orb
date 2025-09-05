import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Search, Filter } from 'lucide-react';
import { useConnection } from '../contexts/ConnectionContext';
import { useNotifications } from '../contexts/NotificationContext';

interface BookType {
  id?: number;
  title: string;
  author: string;
  description: string;
  cover_image_url: string;
  download_link: string;
  category: string;
  status: string;
}

const BookManager: React.FC = () => {
  const { connectionState, supabaseClient } = useConnection();
  const { addNotification } = useNotifications();
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState<BookType | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const emptyBook: BookType = {
    title: '',
    author: '',
    description: '',
    cover_image_url: '',
    download_link: '',
    category: 'Computer Science',
    status: 'Draft'
  };

  // Demo storage for demo mode
  const [demoBooks, setDemoBooks] = useState<BookType[]>([
    {
      id: 1,
      title: "Introduction to Machine Learning",
      author: "Dr. Sarah Chen",
      description: "Comprehensive guide covering fundamental concepts of machine learning, from basic algorithms to advanced neural networks.",
      cover_image_url: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      download_link: "#",
      category: "Computer Science",
      status: "Published"
    },
    {
      id: 2,
      title: "Web Development Fundamentals",
      author: "Mark Thompson",
      description: "Complete beginner's guide to modern web development with HTML5, CSS3, and JavaScript. Includes practical projects and best practices.",
      cover_image_url: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
      download_link: "#",
      category: "Web Development",
      status: "Published"
    }
  ]);

  useEffect(() => {
    loadBooks();
  }, [connectionState.isConnected]);

  const loadBooks = async () => {
    setLoading(true);
    
    if (!connectionState.isConnected || !supabaseClient) {
      // Use demo data
      setTimeout(() => {
        setBooks(demoBooks);
        setLoading(false);
      }, 500);
      return;
    }

    try {
      const { data, error } = await supabaseClient
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBooks(data || []);
    } catch (error) {
      console.error('Error loading books:', error);
      addNotification({
        type: 'error',
        title: 'Loading Error',
        message: 'Failed to load books from database'
      });
      setBooks(demoBooks);
    } finally {
      setLoading(false);
    }
  };

  const saveBook = async (book: BookType) => {
    if (!connectionState.isConnected) {
      // Demo mode - use local state
      if (book.id) {
        setDemoBooks(prev => prev.map(b => b.id === book.id ? book : b));
        setBooks(prev => prev.map(b => b.id === book.id ? book : b));
      } else {
        const newBook = { ...book, id: Math.max(0, ...demoBooks.map(b => b.id || 0)) + 1 };
        setDemoBooks(prev => [...prev, newBook]);
        setBooks(prev => [...prev, newBook]);
      }
      
      addNotification({
        type: 'info',
        title: 'Demo Mode',
        message: 'Changes saved locally. Connect database to persist changes.'
      });
      return;
    }

    try {
      if (book.id) {
        // Update existing book
        const { error } = await supabaseClient!
          .from('books')
          .update(book)
          .eq('id', book.id);

        if (error) throw error;
        
        setBooks(prev => prev.map(b => b.id === book.id ? book : b));
        addNotification({
          type: 'success',
          title: 'Book Updated',
          message: 'Book has been successfully updated'
        });
      } else {
        // Add new book
        const { data, error } = await supabaseClient!
          .from('books')
          .insert([book])
          .select()
          .single();

        if (error) throw error;
        
        setBooks(prev => [data, ...prev]);
        addNotification({
          type: 'success',
          title: 'Book Added',
          message: 'New book has been successfully added'
        });
      }
    } catch (error) {
      console.error('Error saving book:', error);
      addNotification({
        type: 'error',
        title: 'Save Error',
        message: error instanceof Error ? error.message : 'Failed to save book'
      });
    }
  };

  const deleteBook = async (id: number) => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    if (!connectionState.isConnected) {
      // Demo mode
      setDemoBooks(prev => prev.filter(b => b.id !== id));
      setBooks(prev => prev.filter(b => b.id !== id));
      addNotification({
        type: 'info',
        title: 'Demo Mode',
        message: 'Book deleted locally. Connect database to persist changes.'
      });
      return;
    }

    try {
      const { error } = await supabaseClient!
        .from('books')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBooks(prev => prev.filter(b => b.id !== id));
      addNotification({
        type: 'success',
        title: 'Book Deleted',
        message: 'Book has been successfully deleted'
      });
    } catch (error) {
      console.error('Error deleting book:', error);
      addNotification({
        type: 'error',
        title: 'Delete Error',
        message: 'Failed to delete book'
      });
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || book.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const BookForm: React.FC<{ book: BookType, onSave: (book: BookType) => void, onCancel: () => void }> = ({ book, onSave, onCancel }) => {
    const [formData, setFormData] = useState(book);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-slate-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Cover Image URL</label>
            <input
              type="url"
              value={formData.cover_image_url}
              onChange={(e) => setFormData(prev => ({ ...prev, cover_image_url: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Download Link</label>
            <input
              type="url"
              value={formData.download_link}
              onChange={(e) => setFormData(prev => ({ ...prev, download_link: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Web Development">Web Development</option>
              <option value="Database">Database</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Security">Security</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50"
          >
            <X className="w-4 h-4 inline mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Save className="w-4 h-4 inline mr-2" />
            Save Book
          </button>
        </div>
      </form>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center space-x-2 text-slate-600">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-600 border-t-transparent"></div>
          <span>Loading books...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Book Management</h2>
            <p className="text-slate-600 mt-1">
              Manage your research library
              {connectionState.isDemo && (
                <span className="text-amber-600 font-medium"> (Demo Mode - Changes not saved)</span>
              )}
            </p>
          </div>
          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Book</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingBook) && (
        <BookForm
          book={editingBook || emptyBook}
          onSave={(book) => {
            saveBook(book);
            setIsAddingNew(false);
            setEditingBook(null);
          }}
          onCancel={() => {
            setIsAddingNew(false);
            setEditingBook(null);
          }}
        />
      )}

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search books or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white min-w-[150px]"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 font-medium text-slate-900">Title</th>
                <th className="text-left p-4 font-medium text-slate-900">Author</th>
                <th className="text-left p-4 font-medium text-slate-900">Category</th>
                <th className="text-left p-4 font-medium text-slate-900">Status</th>
                <th className="text-left p-4 font-medium text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={book.cover_image_url || "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=80"}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium text-slate-900">{book.title}</div>
                        <div className="text-sm text-slate-500 mt-1 line-clamp-2">{book.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-900">{book.author}</td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded-full text-xs">
                      {book.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      book.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {book.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingBook(book)}
                        className="p-1 text-slate-400 hover:text-purple-600 transition-colors"
                        title="Edit book"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteBook(book.id!)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                        title="Delete book"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No books found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookManager;