# 🚀 Node.js Backend Template

A production-ready Node.js backend template with authentication, CRUD operations, email service, and file uploads.

## 📋 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin/User)
- Password hashing with bcrypt
- Protected routes middleware

### 📊 Database & Models
- MongoDB with Mongoose ODM
- User management with roles
- Books CRUD with search & pagination
- Authors CRUD operations

### 📧 Email Service
- Automated welcome emails
- HTML/Text email support
- Nodemailer integration

### 📁 File Upload
- Multer middleware for file handling
- Image upload capability

### 🔍 Advanced Features
- Search & filtering
- Pagination
- Input validation
- Error handling
- Environment configuration

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Authentication**: JWT + bcrypt
- **Email**: Nodemailer
- **File Upload**: Multer
- **Environment**: dotenv
- **Dev Tool**: nodemon

## 📁 Project Structure

```
gpt_backend_class/
├── controllers/          # Business logic
│   ├── authController.js
│   ├── userController.js
│   ├── booksController.js
│   └── authorsController.js
├── models/              # Database schemas
│   ├── userModel.js
│   ├── booksModel.js
│   └── authorsModel.js
├── routes/              # API endpoints
│   ├── authRoutes.js
│   ├── userRoute.js
│   ├── booksRoute.js
│   └── authorsRoute.js
├── middleware/          # Custom middleware
│   ├── authMiddleware.js
│   ├── checkRoleMiddleware.js
│   └── uploadMiddleware.js
├── utils/               # Utility functions
│   └── sendEmail.js
├── uploads/             # File storage
├── index.js             # Server entry point
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
└── package.json        # Dependencies & scripts
```

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo>
cd gpt_backend_class
npm install
```

### 2. Environment Setup
Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=3000
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
NODE_ENV=development
```

### 3. Run the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📚 API Endpoints

### 🔐 Authentication
```
POST   /auth/register    # Register new user
POST   /auth/login       # Login user
POST   /auth/logout      # Logout user
GET    /auth/me          # Get current user (protected)
```

### 👥 Users
```
GET    /users            # Get all users (protected)
POST   /users            # Create user (protected)
PUT    /users/:id        # Update user (protected)
DELETE /users/:id        # Delete user (protected)
GET    /users/me         # Get current user (protected)
```

### 📚 Books (Protected Routes)
```
GET    /books            # Get books with search & pagination
POST   /books            # Create book
PUT    /books/:id        # Update book
DELETE /books/:id        # Delete book (admin only)
POST   /books/upload     # Upload book cover
```

### 👨‍💼 Authors (Public Routes)
```
GET    /authors          # Get all authors
POST   /authors          # Create author
PUT    /authors/:id      # Update author
DELETE /authors/:id      # Delete author
```

## 🧪 Testing with Postman

### 1. Register User
```json
POST /auth/register
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "role": "user"
}
```

### 2. Login & Get Token
```json
POST /auth/login
{
  "username": "testuser",
  "password": "password123"
}
```

### 3. Use Token for Protected Routes
```
Headers:
Authorization: your_jwt_token_here
```

## 🔍 Advanced Queries

### Search Books
```
GET /books?title=gatsby&author=fitzgerald&page=1&limit=10
```

### Filter & Paginate
- `title`: Search by title (partial match)
- `author`: Search by author (partial match)
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10)

## 🛡️ Security Features

- ✅ JWT token authentication
- ✅ Password hashing (bcrypt)
- ✅ Environment variables for secrets
- ✅ Input validation
- ✅ Role-based access control
- ✅ CORS enabled
- ✅ Error handling

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use App Password in `.env`

### Send Emails
```javascript
const { sendEmail } = require('./utils/sendEmail');

await sendEmail(
  'user@example.com',
  'Subject',
  'Text content',
  '<h1>HTML content</h1>'
);
```

## 📁 File Uploads

### Upload Files
```javascript
// In routes
router.post('/upload', upload.single('file'), controller.upload);

// In controller
const uploadPath = req.file.path;
```

## 🚀 Deployment

### Environment Variables (Production)
```env
NODE_ENV=production
MONGODB_URI=your_production_db
JWT_SECRET=long_random_secret_key
EMAIL_HOST=your_email_provider
```

### Deployment Platforms
- **Heroku**: Add Procfile
- **Vercel**: Add vercel.json
- **Railway**: Direct deployment
- **DigitalOcean**: PM2 + Nginx

## 🧪 Learning Path

### Beginner
1. Understand project structure
2. Test basic CRUD operations
3. Learn authentication flow
4. Explore database models

### Intermediate
1. Add new models/controllers
2. Implement custom middleware
3. Add validation rules
4. Integrate email features

### Advanced
1. Add unit tests
2. Implement caching
3. Add rate limiting
4. Docker containerization

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

ISC License - Feel free to use this template for learning and projects!

---

**🎯 Perfect for learning Node.js, Express.js, MongoDB, and building production-ready APIs!** 