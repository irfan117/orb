import React, { useState, useEffect } from 'react';
import { Book, Download, ExternalLink, Search, Filter, Calendar, User } from 'lucide-react';
import { Typography, Card, Input, Select, Button, Row, Col, Tag, Spin, Empty } from 'antd';
import { useConnection } from '../contexts/ConnectionContext';
import { useNotifications } from '../contexts/NotificationContext';

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface BookType {
  id: number;
  title: string;
  author: string;
  description: string;
  cover_image_url?: string;
  download_link?: string;
  category: string;
  status: string;
  created_at: string;
}

const BooksShowcase: React.FC = () => {
  const { connectionState, supabaseClient } = useConnection();
  const { addNotification } = useNotifications();
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Demo data
  const demoBooks: BookType[] = [
    {
      id: 1,
      title: "Panduan Lengkap Web Development untuk Pemula",
      author: "Tim ORB Development",
      description: "Buku komprehensif yang membahas HTML, CSS, JavaScript, dan framework modern. Cocok untuk siswa SMA yang ingin memulai journey sebagai web developer.",
      cover_image_url: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
      download_link: "#",
      category: "Tutorial & Guides",
      status: "Published",
      created_at: "2024-01-15T00:00:00Z"
    },
    {
      id: 2,
      title: "Implementasi AI dalam Pendidikan: Studi Kasus ORB",
      author: "Research Team ORB",
      description: "Penelitian mendalam tentang penerapan artificial intelligence dalam sistem pembelajaran digital dengan fokus pada personalisasi konten.",
      cover_image_url: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
      download_link: "#",
      category: "Research Papers",
      status: "Published",
      created_at: "2024-01-10T00:00:00Z"
    },
    {
      id: 3,
      title: "Panduan Docker untuk Developer Pemula",
      author: "Infrastructure Team ORB",
      description: "Tutorial step-by-step containerization dengan Docker, dari konsep dasar hingga deployment production.",
      cover_image_url: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400",
      download_link: "#",
      category: "Tutorial & Guides",
      status: "Published",
      created_at: "2024-01-08T00:00:00Z"
    },
    {
      id: 4,
      title: "Cybersecurity Essentials untuk Pelajar",
      author: "Security Research ORB",
      description: "Panduan keamanan siber yang wajib dipahami setiap pengguna teknologi di era digital.",
      cover_image_url: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400",
      download_link: "#",
      category: "Tutorial & Guides",
      status: "Published",
      created_at: "2024-01-05T00:00:00Z"
    },
    {
      id: 5,
      title: "Blockchain & Cryptocurrency: Memahami Teknologi Masa Depan",
      author: "Blockchain Study Group ORB",
      description: "Eksplorasi mendalam tentang teknologi blockchain dan implementasinya di berbagai sektor.",
      cover_image_url: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400",
      download_link: "#",
      category: "Research Papers",
      status: "Published",
      created_at: "2024-01-01T00:00:00Z"
    }
  ];

  useEffect(() => {
    loadBooks();
  }, [connectionState.isConnected]);

  const loadBooks = async () => {
    setLoading(true);

    if (!connectionState.isConnected || !supabaseClient) {
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
        .eq('status', 'Published')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBooks(data || []);
    } catch (error) {
      console.error('Error loading books:', error);
      addNotification({
        type: 'error',
        title: 'Loading Error',
        message: 'Failed to load books. Using demo data.'
      });
      setBooks(demoBooks);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(books.map(book => book.category)))];

  const handleDownload = (book: BookType) => {
    if (book.download_link && book.download_link !== '#') {
      window.open(book.download_link, '_blank');
    } else {
      addNotification({
        type: 'info',
        title: 'Demo Mode',
        message: 'Download links are not available in demo mode.'
      });
    }
  };

  return (
    <div id="ebook-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <Title level={2}>Showcase Ebook Kami</Title>
        <Paragraph className="text-lg text-slate-600 max-w-3xl mx-auto mb-4">
          Hasil Penelitian dan Pembelajaran dalam Bentuk Publikasi Berkualitas
        </Paragraph>
        <Paragraph className="text-base text-slate-600 max-w-3xl mx-auto mb-4">
          Koleksi buku dan publikasi yang telah dihasilkan oleh anggota ORB. Dari tutorial programming hingga penelitian teknologi terdepan, semua tersedia gratis untuk komunitas pembelajaran.
        </Paragraph>
        {connectionState.isDemo && (
          <Paragraph className="text-amber-600 font-medium">
            📋 Demo Mode - Connect your database to access live content
          </Paragraph>
        )}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col xs={24} md={12} lg={16}>
            <Input
              size="large"
              placeholder="Search books, authors, or topics..."
              prefix={<Search className="text-slate-400" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Select
              size="large"
              value={selectedCategory}
              onChange={(value) => setSelectedCategory(value)}
              style={{ width: "100%" }}
              suffixIcon={<Filter className="text-slate-400" />}
            >
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-20">
          <Spin tip="Loading books..." size="large" />
        </div>
      )}

      {/* Books Grid */}
      {!loading && filteredBooks.length > 0 && (
        <Row gutter={[24, 24]}>
          {filteredBooks.map((book) => (
            <Col xs={24} sm={12} lg={8} key={book.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={book.title}
                    src={
                      book.cover_image_url ||
                      "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400"
                    }
                    className="h-48 object-cover"
                  />
                }
                actions={[
                  <Button
                    type="primary"
                    icon={<Download size={16} />}
                    onClick={() => handleDownload(book)}
                  >
                    Download
                  </Button>,
                  <Button
                    type="text"
                    icon={<ExternalLink size={16} />}
                    onClick={() => window.open(book.download_link || "#", "_blank")}
                  />
                ]}
              >
                <Card.Meta
                  title={<span className="font-semibold">{book.title}</span>}
                  description={
                    <>
                      <div className="flex items-center text-sm text-slate-600 mb-2">
                        <User size={14} className="mr-1" /> {book.author}
                        <Calendar size={14} className="ml-3 mr-1" />
                        {new Date(book.created_at).toLocaleDateString()}
                      </div>
                      <Paragraph ellipsis={{ rows: 3 }} className="text-sm text-slate-700">
                        {book.description}
                      </Paragraph>
                      <Tag color="purple" className="mt-2">
                        {book.category}
                      </Tag>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Empty */}
      {!loading && filteredBooks.length === 0 && (
        <div className="text-center py-20">
          <Empty description="No books found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </div>
  );
};

export default BooksShowcase;
