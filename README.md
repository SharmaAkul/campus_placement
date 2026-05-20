# CampusConnect - Campus Placement Portal

A comprehensive full-stack web application for university placement management, built with React.js, Node.js/Express, and MongoDB.

## 🎯 Project Overview

CampusConnect is an industry-style placement management system designed for 3rd-year full-stack development college projects. It provides a complete solution for managing campus placements with features for students, companies, and administrators.

## ✨ Features

### 1. Authentication System
- User registration and login
- Role-based authentication (Student, Company, Admin)
- JWT token-based security
- Password hashing with bcrypt
- Protected routes

### 2. Student Module
- Create and manage student profiles
- Upload skills, resume, and academic details
- View placement status and offers
- Apply for jobs
- Schedule and view interviews
- Take aptitude tests

### 3. Company Module
- Register and manage company profile
- Post job openings
- Schedule interviews
- View student profiles
- Track placement results

### 4. Job Portal
- Browse available job postings
- Filter jobs by department and package
- Apply for jobs
- View job details and eligibility criteria

### 5. Aptitude Test Portal
- Take online aptitude tests
- 10 multiple-choice questions
- Auto score calculation
- View results and performance

### 6. Interview Scheduling
- Schedule interviews for students
- Choose interview mode (Online/Offline)
- Add meeting links and location
- Track interview status

### 7. Results Dashboard
- View placement statistics
- Department-wise placement analysis
- Company-wise hiring data
- Interactive charts and graphs

## 🏗️ Project Structure

```
campus_placement/
├── backend/
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── controllers/         # Business logic
│   ├── middleware/          # Auth & validation
│   ├── config/              # Database & constants
│   ├── utils/               # Helper functions
│   ├── seeds/               # Seed data
│   ├── server.js            # Express server
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Page components
    │   ├── services/        # API services
    │   ├── context/         # Context API
    │   ├── App.js
    │   └── index.js
    ├── public/
    ├── package.json
    └── .env.example
```

## 🛠️ Tech Stack

### Frontend
- React.js 18.2.0
- React Router DOM 6.8.0
- Axios 1.3.0
- Recharts 2.5.0 (for charts)
- CSS3 with responsive design

### Backend
- Node.js with Express.js 4.18.2
- MongoDB with Mongoose 7.0.0
- JWT for authentication
- bcryptjs for password hashing

### Database
- MongoDB (Local or Atlas)
- Collections: Users, Students, Companies, Jobs, Interviews, AptitudeQuestions, AptitudeTests, Results

## 📋 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- npm or yarn

### Backend Setup

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Create .env File**
```bash
cp .env.example .env
```

3. **Configure MongoDB**
Edit `.env` and add your MongoDB URI:
```
MONGODB_URI=mongodb://localhost:27017/campus_placement
JWT_SECRET=your_secret_key_here
PORT=5000
```

4. **Seed Database**
```bash
npm run seed
```

5. **Start Backend Server**
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Create .env File**
```bash
cp .env.example .env
```

3. **Start Frontend Development Server**
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📊 Database Schema

### Users Collection
- name, email, password, role, isActive, timestamps

### Students Collection
- userId, enrollmentNumber, phone, department, graduationYear, cgpa, skills, resumeLink, placementStatus, placedCompany, package, profileCompletion

### Companies Collection
- userId, companyName, website, description, location, hrEmail, hrPhone, isVerified

### Jobs Collection
- companyId, jobTitle, description, package, location, department, minCGPA, maxCGPA, requiredSkills, interviewDate, interviewMode, applicants

### Interviews Collection
- studentId, companyId, jobId, interviewDate, interviewTime, interviewMode, meetingLink, location, status, result, remarks

### AptitudeQuestions Collection
- question, category, options, explanation, difficulty

### AptitudeTests Collection
- studentId, questions, answers, score, totalQuestions, correctAnswers, percentage, startedAt, submittedAt, isCompleted

### Results Collection
- studentId, companyId, jobId, package, offerStatus, joiningDate, comments

## 📌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Students
- `GET /api/students/profile` - Get student profile
- `PUT /api/students/profile` - Update student profile
- `GET /api/students` - Get all students (admin/company)
- `GET /api/students/:id` - Get single student

### Companies
- `GET /api/companies/profile` - Get company profile
- `PUT /api/companies/profile` - Update company profile
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get single company

### Jobs
- `POST /api/jobs` - Create job (company)
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get single job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `POST /api/jobs/:jobId/apply` - Apply for job

### Interviews
- `POST /api/interviews` - Schedule interview
- `GET /api/interviews` - Get all interviews
- `GET /api/interviews/my-interviews/list` - Get student's interviews
- `GET /api/interviews/company-interviews/list` - Get company's interviews
- `PUT /api/interviews/:id` - Update interview
- `DELETE /api/interviews/:id` - Cancel interview

### Aptitude
- `GET /api/aptitude/questions` - Get all questions
- `GET /api/aptitude/questions/random` - Get random questions
- `POST /api/aptitude/start` - Start test
- `POST /api/aptitude/submit` - Submit test
- `GET /api/aptitude/result/:testId` - Get test result
- `GET /api/aptitude/my-tests` - Get student's tests

### Results
- `POST /api/results` - Create result
- `GET /api/results` - Get all results
- `GET /api/results/my-results` - Get student's results
- `GET /api/results/stats/dashboard` - Get dashboard statistics
- `PUT /api/results/:id` - Update result

## 👥 Demo Credentials

### Student Account
- Email: `priya.sharma@gmail.com`
- Password: `student123`

### Company Account
- Email: `hrtechsolutionsindiacom@gmail.com`
- Password: `company123`

## 🎨 Pages

1. **Home Page** - Landing page with features overview
2. **Login Page** - User authentication
3. **Register Page** - New user registration
4. **Student Dashboard** - Student profile management
5. **Job Listing Page** - Browse and apply for jobs
6. **Aptitude Test Page** - Take online tests
7. **Interview Schedule Page** - View scheduled interviews
8. **Results Dashboard** - View placement statistics
9. **Company Dashboard** - Company management (optional)

## 📊 Sample Data

The database is populated with:
- **10 Students** from various departments (CSE, IT, ECE)
- **5 Companies** with different sectors
- **5 Job Postings** with various positions
- **10 Aptitude Questions** across different categories
- **5 Interview Schedules** with sample data

## 🚀 Running the Application

1. Start MongoDB service
2. Open two terminal windows
3. **Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

4. **Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

5. Open browser and navigate to `http://localhost:3000`

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with role-based access control
- CORS enabled
- Input validation
- Error handling middleware

## 📈 Key Functionalities

✅ User Registration & Authentication
✅ Profile Management
✅ Job Posting & Application
✅ Interview Scheduling
✅ Aptitude Testing with Auto Scoring
✅ Placement Tracking
✅ Statistics & Analytics Dashboard
✅ Responsive Design
✅ Toast Notifications
✅ Loading States

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or check connection string in .env

### Port Already in Use
- Change PORT in .env or kill process: `lsof -ti:5000 | xargs kill -9`

### CORS Issues
- Check backend CORS configuration in server.js

### Frontend Can't Connect to Backend
- Verify REACT_APP_API_URL in frontend/.env

## 📝 Notes for Viva/Presentation

### Key Points to Highlight:
1. **Architecture:** Clean MVC pattern with separation of concerns
2. **Database Design:** Normalized schema with proper relationships
3. **Authentication:** JWT with role-based access control
4. **UI/UX:** Responsive design with modern interfaces
5. **API:** RESTful endpoints following best practices
6. **Features:** Comprehensive placement management system
7. **Scalability:** Can be extended with additional features

### Questions & Answers:

**Q: What is the role of JWT in your application?**
A: JWT provides stateless authentication, where tokens are issued upon login and validated on protected routes without needing server-side session storage.

**Q: How are passwords stored securely?**
A: Using bcryptjs library, passwords are hashed with salt rounds before storing in database, making them irreversible.

**Q: How did you handle role-based access?**
A: Implemented middleware that checks user role and only allows access to appropriate routes and features.

**Q: What are the key features of your dashboard?**
A: Interactive charts, real-time statistics, department-wise analysis, company-wise placement data, and filtering options.

**Q: How does the aptitude test work?**
A: Questions are fetched from MongoDB, answers are submitted, auto-scored based on correct options, and results are displayed with percentage.

## 📚 Technologies Used

- **Frontend:** React.js, React Router, Axios, Recharts, React Toastify
- **Backend:** Express.js, Node.js, MongoDB, Mongoose, JWT, bcryptjs
- **Styling:** CSS3, Responsive Design
- **Tools:** Postman, Git, VS Code

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack web development
- Database design and modeling
- RESTful API development
- Frontend state management
- Authentication & Authorization
- Real-world use case implementation
- Responsive web design
- Data visualization

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a 3rd-year college project for full-stack development.

---

**Happy Coding! 🚀**

For issues or questions, refer to the code comments and API documentation in the codebase.
