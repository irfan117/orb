-- ORB Database Setup
-- Run this SQL script in your Supabase SQL editor to set up the database tables

-- Note: JWT secret is automatically configured by Supabase
-- You don't need to set it manually

-- Create content table for editable website content
CREATE TABLE IF NOT EXISTS content (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255) NOT NULL,
    participants INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'Upcoming',
    category VARCHAR(100) NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create books table (if not exists)
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    cover_image_url TEXT,
    download_link TEXT,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default content values
INSERT INTO content (key, value) VALUES
    ('register_button_text', 'Daftar Sekarang'),
    ('register_button_link', '#'),
    ('whatsapp_link', '#'),
    ('instagram_link', '#'),
    ('contact_email', 'hello@orb-community.id'),
    ('contact_message', 'ORB Community Server'),
    ('contact_instagram', '@orb.community'),
    ('contact_github', 'github.com/orb-community'),
    ('contact_website', 'www.orb-community.id')
ON CONFLICT (key) DO NOTHING;

-- Insert demo activities
INSERT INTO activities (title, description, date, location, participants, status, category, image_url) VALUES
    ('Workshop React.js untuk Pemula', 'Pelatihan intensif React.js selama 2 hari dengan fokus pada hooks, state management, dan best practices development.', '2024-01-20 10:00:00+00', 'Online (Zoom)', 45, 'Completed', 'Workshop', 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400'),
    ('Hackathon ORB 2024', 'Kompetisi pengembangan aplikasi selama 24 jam dengan tema ''Education Technology''. Hadiah total Rp 5 juta.', '2024-02-10 09:00:00+00', 'Universitas Indonesia, Depok', 120, 'Completed', 'Competition', 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400'),
    ('Study Group Python Programming', 'Sesi belajar bersama Python programming setiap Sabtu selama 1 bulan. Cocok untuk pemula hingga intermediate.', '2024-02-15 14:00:00+00', 'Kampus IPB, Bogor', 30, 'Completed', 'Study Group', 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400'),
    ('Seminar AI & Machine Learning', 'Seminar nasional tentang implementasi AI dalam industri dengan pembicara dari Google dan Microsoft.', '2024-03-05 13:00:00+00', 'Auditorium UGM, Yogyakarta', 200, 'Upcoming', 'Seminar', 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400'),
    ('Bootcamp Web Development', 'Program intensif 3 bulan pembelajaran full-stack web development dari nol hingga deploy production.', '2024-03-15 08:00:00+00', 'Jakarta & Online', 75, 'Ongoing', 'Bootcamp', 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400')
ON CONFLICT DO NOTHING;

-- Insert demo books
INSERT INTO books (title, author, description, cover_image_url, download_link, category, status) VALUES
    ('Panduan Lengkap Web Development untuk Pemula', 'Tim ORB Development', 'Buku komprehensif yang membahas HTML, CSS, JavaScript, dan framework modern. Cocok untuk siswa SMA yang ingin memulai journey sebagai web developer.', 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400', '#', 'Tutorial & Guides', 'Published'),
    ('Implementasi AI dalam Pendidikan: Studi Kasus ORB', 'Research Team ORB', 'Penelitian mendalam tentang penerapan artificial intelligence dalam sistem pembelajaran digital dengan fokus pada personalisasi konten.', 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400', '#', 'Research Papers', 'Published'),
    ('Panduan Docker untuk Developer Pemula', 'Infrastructure Team ORB', 'Tutorial step-by-step containerization dengan Docker, dari konsep dasar hingga deployment production.', 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=400', '#', 'Tutorial & Guides', 'Published'),
    ('Cybersecurity Essentials untuk Pelajar', 'Security Research ORB', 'Panduan keamanan siber yang wajib dipahami setiap pengguna teknologi di era digital.', 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400', '#', 'Tutorial & Guides', 'Published'),
    ('Blockchain & Cryptocurrency: Memahami Teknologi Masa Depan', 'Blockchain Study Group ORB', 'Eksplorasi mendalam tentang teknologi blockchain dan implementasinya di berbagai sektor.', 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400', '#', 'Research Papers', 'Published')
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow all operations on content" ON content FOR ALL USING (true);
CREATE POLICY "Allow all operations on activities" ON activities FOR ALL USING (true);
CREATE POLICY "Allow all operations on books" ON books FOR ALL USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();