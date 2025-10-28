# Global Peace Pledge - Full Stack Application

A full-stack web application for the Universal Peace Foundation's Global Peace Pledge initiative, featuring a React.js frontend and Node.js/Express backend with MySQL database.

## 🌟 Features

- **Interactive Pledge Form**: Sign the global peace pledge with digital signature
- **Digital Signature Pad**: Draw or upload your signature
- **Certificate Generation**: Automatically generate personalized PDF and image certificates
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Real-time Form Validation**: Client and server-side validation
- **Database Storage**: Secure storage of pledge data in MySQL
- **RESTful API**: Well-structured backend API endpoints

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MySQL (v5.7 or higher)
- Git

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd uns_upf
```

### 2. Install System Dependencies

#### For Certificate Generation (IMPORTANT!)

The application generates certificates using Node.js canvas, which requires system fonts.

**Ubuntu/Debian:**

```bash
sudo apt-get update
sudo apt-get install -y fonts-dejavu fonts-dejavu-core fonts-dejavu-extra
```

**CentOS/RHEL:**

```bash
sudo yum install -y dejavu-sans-fonts dejavu-serif-fonts
```

**macOS:**

```bash
brew install fontconfig
# Fonts are usually pre-installed on macOS
```

**Or use the automated script:**

```bash
cd backend
./install-fonts.sh
```

### 3. Set Up the Database

```bash
# Log in to MySQL
mysql -u root -p

# Run the schema file
source backend/database/schema.sql

# Or manually create the database and table
```

### 4. Set Up the Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=peace_pledge
# PORT=5000

# Start the backend server
npm start

# Or for development with auto-reload
npm run dev
```

The backend server will start on `http://localhost:5000`

### 5. Set Up the Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

The frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
uns_upf/
├── frontend/                # React frontend application
│   ├── public/             # Static files
│   │   ├── assets/        # Images, logos, etc.
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   ├── About.js
│   │   │   ├── Milestones.js
│   │   │   ├── PledgeQuote.js
│   │   │   ├── PledgeForm.js
│   │   │   ├── SignaturePad.js
│   │   │   ├── CertificatePreview.js
│   │   │   ├── CertificateGenerator.js
│   │   │   └── Footer.js
│   │   ├── pages/         # Page components
│   │   │   └── HomePage.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── backend/               # Node.js/Express backend
│   ├── database/         # Database schema
│   │   └── schema.sql
│   ├── server.js        # Main server file
│   ├── .env.example     # Environment variables template
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

#### Health Check

```
GET /health
Response: { "status": "OK", "message": "Server is running" }
```

#### Submit Pledge

```
POST /pledge
Body: {
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "country": "India",
  "signature": "data:image/png;base64,..."
}
Response: {
  "success": true,
  "message": "Thank you for pledging for Global Peace!",
  "pledgeId": 123
}
```

#### Get All Pledges

```
GET /pledges
Response: {
  "success": true,
  "data": [...]
}
```

#### Get Pledge Count

```
GET /pledges/count
Response: {
  "success": true,
  "count": 1234
}
```

#### Get Pledge by ID

```
GET /pledge/:id
Response: {
  "success": true,
  "data": {...}
}
```

## 🗄️ Database Schema

### Pledges Table

| Column     | Type         | Description                    |
| ---------- | ------------ | ------------------------------ |
| id         | INT          | Primary key (auto-increment)   |
| first_name | VARCHAR(100) | Pledge signatory's first name  |
| last_name  | VARCHAR(100) | Pledge signatory's last name   |
| email      | VARCHAR(255) | Email address (unique)         |
| country    | VARCHAR(100) | Country of origin              |
| signature  | LONGTEXT     | Base64 encoded signature image |
| created_at | TIMESTAMP    | Record creation timestamp      |
| updated_at | TIMESTAMP    | Record update timestamp        |

## 🎨 Features Breakdown

### Frontend Components

1. **Header**: Navigation bar with smooth scrolling
2. **Hero**: Eye-catching banner with call-to-action
3. **About**: Information about His Holiness Gurumahan
4. **Milestones**: Timeline of achievements
5. **PledgeQuote**: Inspirational pledge message
6. **PledgeForm**: Interactive form with validation
7. **SignaturePad**: Canvas-based signature capture
8. **CertificatePreview**: Real-time certificate preview
9. **CertificateGenerator**: PDF and image certificate generation
10. **Footer**: Copyright information

### Backend Features

- Express.js server with middleware (CORS, Helmet, Body Parser)
- MySQL connection pooling for better performance
- Input validation with express-validator
- Error handling and logging
- RESTful API design
- Environment-based configuration

## 🔧 Configuration

### Frontend Configuration

The frontend uses a proxy to connect to the backend. This is configured in `frontend/package.json`:

```json
"proxy": "http://localhost:5000"
```

### Backend Configuration

Configure the backend using environment variables in `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=peace_pledge
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 📦 Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `frontend/build` directory.

### Backend Production

For production, consider using PM2 or similar process manager:

```bash
npm install -g pm2
cd backend
pm2 start server.js --name peace-pledge-api
```

## 🛡️ Security Features

- Helmet.js for securing HTTP headers
- CORS configuration
- Input validation and sanitization
- SQL injection prevention using parameterized queries
- Email uniqueness validation
- Environment variable protection

## 🎯 Next Steps / Future Enhancements

- [ ] Add email notifications upon pledge submission
- [ ] Implement admin dashboard for viewing statistics
- [ ] Add social media sharing functionality
- [ ] Implement multi-language support
- [ ] Add analytics and reporting
- [ ] Implement rate limiting for API endpoints
- [ ] Add user authentication for admin features
- [ ] Deploy to cloud platform (AWS, Azure, or Heroku)

## 📝 Notes

### Image Assets

You need to add the following images to `frontend/public/assets/`:

- `logo.png` - UPF logo
- `hero-image.png` - Hero section image
- `ggmahan.png` - Gurumahan portrait
- `peace.png` - Peace background image
- `bg1.png` - Form background
- `favicon.ico` - Website favicon

### Certificate Images

The certificate uses hosted images from Supabase. If you want to use local images, update the URLs in:

- `CertificateGenerator.js`
- `CertificatePreview.js`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👥 Credits

- **Universal Peace Foundation**
- **His Holiness GuruMahan** - Founder & Spiritual Leader

## 📞 Support

For support, please contact: support@universalpeacefoundation.org

---

**Made with ❤️ for World Peace**
