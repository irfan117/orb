# 🚀 ORB - Open Research Base

<div align="center">

![ORB Logo](https://img.shields.io/badge/ORB-Open%20Research%20Base-blue?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.38.4-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

**Komunitas IT SMA untuk Pembelajaran dan Riset Terbuka**

[🌐 Live Demo](https://orb-community.vercel.app) • [📖 Dokumentasi](#dokumentasi) • [🛠️ Tech Stack](#tech-stack)

![Project Banner](./assets/banner.png)

</div>

---

## 📋 Daftar Isi

- [✨ Fitur](#-fitur)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📦 Instalasi](#-instalasi)
- [⚙️ Konfigurasi](#️-konfigurasi)
- [🔐 Admin Access](#-admin-access)
- [📊 Database Setup](#-database-setup)
- [🎨 UI/UX](#-uiux)
- [📱 Responsive Design](#-responsive-design)
- [🔧 Development](#-development)
- [📝 Scripts](#-scripts)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👥 Team](#-team)

---

## ✨ Fitur

### 🎯 **Core Features**
- ✅ **Dynamic Content Management** - Admin dapat mengedit konten website
- ✅ **Ebook Showcase** - Koleksi buku dan publikasi ORB
- ✅ **Activities Management** - CRUD untuk kegiatan komunitas
- ✅ **Supabase Integration** - Database real-time
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark/Light Mode** - Theme switching

### 🔐 **Authentication & Security**
- ✅ **Supabase Auth** - Secure authentication
- ✅ **Role-based Access** - Admin & User roles
- ✅ **Session Management** - Auto session handling
- ✅ **Secure Admin Panel** - Protected routes

### 📱 **User Experience**
- ✅ **Smooth Scrolling** - Navigation yang halus
- ✅ **Interactive UI** - Animasi dan transitions
- ✅ **Loading States** - UX yang baik
- ✅ **Error Handling** - User-friendly error messages

### 🛠️ **Developer Experience**
- ✅ **TypeScript** - Type safety
- ✅ **Hot Reload** - Fast development
- ✅ **ESLint** - Code quality
- ✅ **Prettier** - Code formatting

---

## 🛠️ Tech Stack

### **Frontend**
```bash
⚡ React 18.2.0          # UI Framework
🔷 TypeScript 5.0.2     # Type Safety
🎨 Tailwind CSS 3.3.0   # Styling
🎭 Ant Design 5.8.0     # UI Components
```

### **Backend & Database**
```bash
🗄️ Supabase 2.38.4     # Backend-as-a-Service
📊 PostgreSQL          # Database
🔐 Supabase Auth       # Authentication
```

### **Development Tools**
```bash
⚡ Vite 5.4.8          # Build Tool
📦 npm/yarn           # Package Manager
🔧 ESLint             # Linting
💅 Prettier           # Code Formatting
```

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+
- npm or yarn
- Supabase account

### **1-Click Setup**
```bash
# Clone repository
git clone https://github.com/your-username/orb-community.git
cd orb-community

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Run development server
npm run dev
```

### **2. Database Setup**
```bash
# Run SQL setup in Supabase
# Copy content from database_setup.sql
```

### **3. Admin Setup**
```bash
# Create admin user in Supabase Dashboard
# Use Ctrl+Shift+A to access admin panel
```

---

## 📦 Instalasi

### **Step-by-Step Installation**

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/orb-community.git
   cd orb-community
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   - Buka Supabase Dashboard
   - Pergi ke SQL Editor
   - Jalankan script dari `database_setup.sql`

5. **Development Server**
   ```bash
   npm run dev
   ```

---

## ⚙️ Konfigurasi

### **Environment Variables**
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional: Analytics
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID
```

### **Database Tables**
```sql
-- Auto-created by database_setup.sql
✅ content     # Editable website content
✅ activities  # Community activities
✅ books       # Ebook collection
```

---

## 🔐 Admin Access

### **How to Access Admin Panel**

1. **Keyboard Shortcut**: `Ctrl + Shift + A`
2. **Direct URL**: `/admin` (requires authentication)

### **Admin Features**
- 📝 **Content Management** - Edit website text/links
- 📚 **Book Management** - CRUD operations for ebooks
- 📅 **Activities Management** - Manage community events
- 👥 **User Management** - View registered users

### **Creating Admin User**
```sql
-- In Supabase Dashboard → Authentication → Users
1. Click "Add User"
2. Enter email: admin@orb.com
3. Enter password: your_password
4. Check "Auto Confirm User"
5. Click "Add User"
```

---

## 📊 Database Setup

### **Automatic Setup**
```bash
# Run this SQL in Supabase Dashboard
# File: database_setup.sql
```

### **Manual Setup**
```sql
-- Create tables
CREATE TABLE content (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE,
  value TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  date TIMESTAMP,
  location VARCHAR(255),
  participants INTEGER,
  status VARCHAR(50),
  category VARCHAR(100)
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  description TEXT,
  cover_image_url TEXT,
  download_link TEXT,
  category VARCHAR(100),
  status VARCHAR(50)
);
```

---

## 🎨 UI/UX

### **Design System**
- 🎨 **Modern UI** - Clean and professional
- 🌈 **Color Palette** - Purple/Blue gradient theme
- 📱 **Mobile-First** - Responsive design
- ⚡ **Fast Loading** - Optimized performance
- ♿ **Accessible** - WCAG compliant

### **Components**
- 🧩 **Reusable Components** - Modular architecture
- 🎭 **Ant Design** - Professional UI components
- 🎨 **Tailwind CSS** - Utility-first styling
- ✨ **Animations** - Smooth transitions

---

## 📱 Responsive Design

### **Breakpoints**
```css
/* Mobile First Approach */
📱 Mobile:    320px - 767px
📟 Tablet:    768px - 1023px
💻 Desktop:   1024px - 1439px
🖥️ Large:     1440px+
```

### **Features**
- ✅ **Mobile Navigation** - Hamburger menu
- ✅ **Touch Friendly** - Large tap targets
- ✅ **Optimized Images** - WebP format
- ✅ **Fast Loading** - Lazy loading

---

## 🔧 Development

### **Project Structure**
```
src/
├── components/          # React components
│   ├── HeroSection.tsx
│   ├── BooksShowcase.tsx
│   ├── AdminPanel.tsx
│   └── ...
├── contexts/           # React contexts
│   ├── ConnectionContext.tsx
│   ├── ContentContext.tsx
│   └── ...
├── App.tsx            # Main app component
└── main.tsx          # Entry point
```

### **Code Quality**
```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Build
npm run build
```

---

## 📝 Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit"
  }
}
```

### **Available Commands**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

---

## 🤝 Contributing

### **How to Contribute**

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### **Development Guidelines**

- 📝 **Conventional Commits** - Use semantic commit messages
- 🧪 **Testing** - Write tests for new features
- 📚 **Documentation** - Update docs for changes
- 🎨 **Code Style** - Follow ESLint rules
- 🔍 **Code Review** - All PRs require review

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👥 Team

### **Core Team**
- **👨‍💻 Developer**: [Your Name]
- **🎨 Designer**: [Designer Name]
- **📊 Project Manager**: [PM Name]

### **Contributors**
<a href="https://github.com/your-username/orb-community/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-username/orb-community" />
</a>

---

## 📞 Support

### **Get Help**
- 📧 **Email**: support@orb-community.id
- 💬 **Discord**: [Join our server](https://discord.gg/orb)
- 📖 **Documentation**: [Read docs](https://docs.orb-community.id)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/your-username/orb-community/issues)

### **Community**
- 🌐 **Website**: [orb-community.id](https://orb-community.id)
- 📘 **Facebook**: [@orb.community](https://facebook.com/orb.community)
- 📷 **Instagram**: [@orb.community](https://instagram.com/orb.community)

---

<div align="center">

**Made with ❤️ by ORB Community**

⭐ **Star us on GitHub** • 🍴 **Fork this repo** • 📣 **Share with friends**

![GitHub stars](https://img.shields.io/github/stars/your-username/orb-community?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-username/orb-community?style=social)

</div>

---

## 📸 Screenshots

### **Homepage**
![Homepage](./assets/screenshots/homepage.png)

### **Admin Panel**
![Admin Panel](./assets/screenshots/admin-panel.png)

### **Mobile View**
![Mobile](./assets/screenshots/mobile.png)

---

## 🎉 Acknowledgments

- [React](https://reactjs.org/) - UI Framework
- [Supabase](https://supabase.com/) - Backend Platform
- [Ant Design](https://ant.design/) - UI Components
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Lucide Icons](https://lucide.dev/) - Icon Library

---

## 📈 Roadmap

### **Version 2.0**
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] API documentation
- [ ] Mobile app (React Native)

### **Version 1.5**
- [ ] User profiles
- [ ] Discussion forums
- [ ] Event calendar
- [ ] Email notifications

---

<div align="center">

**[⬆️ Back to Top](#orb---open-research-base)**

</div>