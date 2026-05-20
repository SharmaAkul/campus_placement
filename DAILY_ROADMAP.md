# Campus Placement Portal - Daily Learning Roadmap

## 📅 7-Day Project Mastery Plan

This roadmap guides you through understanding, testing, and preparing to present the Campus Placement Portal project.

---

## 🗓️ Day 1: Setup & Understanding Project Structure

### Morning (2 hours)

**Objectives**:
- Install dependencies
- Start MongoDB
- Run both backend and frontend
- Verify everything works

**Tasks**:

1. **Read Project Overview** (15 min)
   - Open [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
   - Skim through the structure
   - Note the 7 main modules

2. **Install Backend** (20 min)
   ```bash
   cd backend
   npm install
   ```
   - Wait for installation to complete
   - Check for any errors

3. **Create Backend .env** (10 min)
   - Create file: `backend/.env`
   - Copy from `backend/.env.example`
   - Verify values:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/campus_placement
     JWT_SECRET=dev_key_at_least_32_chars_xyz123abc
     ```

4. **Install Frontend** (20 min)
   ```bash
   cd ../frontend
   npm install
   ```

5. **Create Frontend .env** (5 min)
   - Create file: `frontend/.env`
   - Copy from `frontend/.env.example`
   - Verify: `REACT_APP_API_URL=http://localhost:5000/api`

### Afternoon (2 hours)

**Tasks**:

1. **Start MongoDB** (5 min)
   ```bash
   brew services start mongodb-community
   ```
   - Verify: `mongo` command works
   - Exit with: `exit`

2. **Seed Database** (10 min)
   ```bash
   cd backend
   npm run seed
   ```
   - Watch for success messages
   - Note the numbers (10 students, 5 companies, etc.)

3. **Start Backend** (5 min)
   ```bash
   npm run dev
   ```
   - Expected output: "Server running on port 5000"
   - Leave terminal open

4. **Start Frontend** (5 min - in new terminal)
   ```bash
   cd frontend
   npm start
   ```
   - Browser opens at http://localhost:3000
   - Page should load without errors

5. **Test Login** (30 min)
   - Navigate to login page
   - Test with student credentials:
     - Email: priya.sharma@gmail.com
     - Password: student123
   - Verify dashboard loads
   - Logout and test company credentials:
     - Email: hrtechsolutionsindiacom@gmail.com
     - Password: company123

6. **Explore Pages** (40 min)
   - [ ] Home page
   - [ ] Student Dashboard
   - [ ] Jobs page
   - [ ] Aptitude Test
   - [ ] My Interviews
   - [ ] Results Dashboard
   - Take mental notes of what each page does

### Evening (1 hour)

**Tasks**:

1. **Read QUICK_REFERENCE.md** (20 min)
   - Familiarize with common commands
   - Note the important URLs
   - Remember demo credentials

2. **Skim README.md** (20 min)
   - Read introduction and features
   - Don't get into code details yet

3. **Journal**: Write answers to
   - What does this application do?
   - Who are the users? (Student, Company, Admin)
   - What are the 7 main modules?

**End of Day 1**: Application running, basic features explored

---

## 🗓️ Day 2: Backend Deep Dive

### Morning (2 hours)

**Objective**: Understand backend architecture

**Tasks**:

1. **Read Backend Architecture Section** (15 min)
   - From [README.md](README.md)
   - Understand MVC pattern

2. **Study Server Setup** (20 min)
   - Open [backend/server.js](backend/server.js)
   - Read file completely
   - Understand:
     - Express initialization
     - MongoDB connection
     - CORS setup
     - Middleware registration
     - Route mounting

3. **Study Database Connection** (15 min)
   - Open [backend/config/db.js](backend/config/db.js)
   - Understand connection logic

4. **Study User Model** (30 min)
   - Open [backend/models/User.js](backend/models/User.js)
   - Understand:
     - Schema definition
     - Password hashing (pre-hook)
     - toJSON method
     - comparePassword method

5. **Study Authentication Controller** (20 min)
   - Open [backend/controllers/authController.js](backend/controllers/authController.js)
   - Trace through:
     - Register function
     - Login function
     - Token generation

### Afternoon (2 hours)

**Tasks**:

1. **Study All Models** (45 min)
   - Open [backend/models/](backend/models/)
   - Read each file in this order:
     1. Student.js
     2. Company.js
     3. Job.js
     4. Interview.js
     5. AptitudeQuestion.js
     6. AptitudeTest.js
     7. Result.js
   - For each, note:
     - What fields does it have?
     - What does it reference?

2. **Create a Schema Diagram** (30 min)
   - On paper or in a text editor, draw:
     - User connects to Student
     - User connects to Company
     - Student connects to Job (applicants)
     - Company connects to Job
     - Job connects to Interview
     - etc.

3. **Study Auth Middleware** (15 min)
   - Open [backend/middleware/auth.js](backend/middleware/auth.js)
   - Understand:
     - protect() function - JWT validation
     - authorize() function - role checking

### Evening (1.5 hours)

**Tasks**:

1. **Study One Complete API Module** (45 min)
   - Choose: Job Controller + Routes + API
   - Open [backend/controllers/jobController.js](backend/controllers/jobController.js)
   - Trace through each function:
     - `createJob()` - Company creates job
     - `getAllJobs()` - Get with filters
     - `getJob()` - Single job with applicants
     - `applyForJob()` - Student applies
   - Open [backend/routes/jobRoutes.js](backend/routes/jobRoutes.js)
   - See how routes are protected
   - Understand: POST vs GET vs PUT vs DELETE

2. **Test API with Postman/cURL** (30 min)
   - Test getting all jobs:
     ```bash
     curl http://localhost:5000/api/jobs
     ```
   - Copy response
   - Understand structure

3. **Journal**: Write
   - How does authentication work?
   - Why do we need roles?
   - What happens when student applies for job?

**End of Day 2**: Understand backend structure, models, and one complete module

---

## 🗓️ Day 3: Frontend Deep Dive

### Morning (2 hours)

**Objective**: Understand frontend architecture

**Tasks**:

1. **Study API Service Layer** (30 min)
   - Open [frontend/src/services/api.js](frontend/src/services/api.js)
   - Understand:
     - Axios configuration
     - Request interceptor (JWT token injection)
     - Service objects (authService, jobService, etc.)
     - How errors are handled

2. **Study Auth Context** (30 min)
   - Open [frontend/src/context/AuthContext.js](frontend/src/context/AuthContext.js)
   - Understand:
     - State variables (user, isAuthenticated)
     - Functions (login, logout, register)
     - localStorage for token persistence
     - useEffect for initial user fetch

3. **Study App.js Router** (30 min)
   - Open [frontend/src/App.js](frontend/src/App.js)
   - Understand:
     - ProtectedRoute component
     - Route definitions
     - Role-based route protection
     - LoadingSpinner usage

4. **Study Navbar Component** (15 min)
   - Open [frontend/src/components/Navbar.js](frontend/src/components/Navbar.js)
   - Understand:
     - Conditional rendering based on role
     - User info display
     - Logout button

### Afternoon (2 hours)

**Tasks**:

1. **Study Home Page** (20 min)
   - Open [frontend/src/pages/Home.js](frontend/src/pages/Home.js)
   - Understand structure

2. **Study Auth Page** (30 min)
   - Open [frontend/src/pages/Auth.js](frontend/src/pages/Auth.js)
   - Understand:
     - Login form
     - Register form
     - Form validation
     - API calls
     - Error handling with toast

3. **Study Student Dashboard** (30 min)
   - Open [frontend/src/pages/StudentDashboard.js](frontend/src/pages/StudentDashboard.js)
   - Understand:
     - Profile loading
     - Edit/view toggle
     - Form submission
     - Profile completion calculation

4. **Study Jobs Page** (20 min)
   - Open [frontend/src/pages/Jobs.js](frontend/src/pages/Jobs.js)
   - Understand:
     - Job listing
     - Filtering
     - Apply functionality

### Evening (1.5 hours)

**Tasks**:

1. **Study Aptitude Test Page** (45 min)
   - Open [frontend/src/pages/AptitudeTest.js](frontend/src/pages/AptitudeTest.js)
   - This is the most complex page
   - Understand:
     - Test intro screen
     - Question navigation
     - Timer countdown
     - Answer selection
     - Auto-scoring
     - Results display

2. **Study Other Pages** (30 min)
   - MyInterviews.js - Interview viewing
   - ResultsDashboard.js - Charts with Recharts
   - Note how Recharts is used

3. **Journal**: Write
   - How does frontend communicate with backend?
   - How is user state maintained?
   - What happens on login?

**End of Day 3**: Understand complete frontend, all pages, and API integration

---

## 🗓️ Day 4: Database & API Testing

### Morning (2 hours)

**Objective**: Verify all APIs work correctly

**Tasks**:

1. **Read API Documentation** (30 min)
   - Open [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
   - Skim through all endpoints
   - Understand request/response formats

2. **Test Authentication APIs** (45 min)
   - Register new account:
     ```bash
     curl -X POST http://localhost:5000/api/auth/register \
       -H "Content-Type: application/json" \
       -d '{"name":"TestUser","email":"test@test.com","password":"test123","role":"student"}'
     ```
   - Copy the token from response
   - Test login:
     ```bash
     curl -X POST http://localhost:5000/api/auth/login \
       -H "Content-Type: application/json" \
       -d '{"email":"priya.sharma@gmail.com","password":"student123"}'
     ```
   - Test get current user:
     ```bash
     curl -X GET http://localhost:5000/api/auth/me \
       -H "Authorization: Bearer <token>"
     ```

3. **Test Job APIs** (15 min)
   - Get all jobs: `curl http://localhost:5000/api/jobs`
   - Get single job: `curl http://localhost:5000/api/jobs/<job_id>`
   - Note the response structure

### Afternoon (2 hours)

**Tasks**:

1. **Database Exploration** (45 min)
   ```bash
   mongo campus_placement
   ```
   - List collections: `db.getCollectionNames()`
   - Count records: 
     ```
     db.students.count()
     db.companies.count()
     db.jobs.count()
     db.interviews.count()
     ```
   - View sample records:
     ```
     db.students.findOne()
     db.jobs.findOne()
     db.interviews.findOne()
     ```
   - Take notes on data structure

2. **Test All API Endpoints** (45 min)
   - Using TESTING_GUIDE.md:
     - Test Student endpoints
     - Test Company endpoints
     - Test Aptitude endpoints
     - Test Interview endpoints
   - Document any errors
   - Note response times

3. **Verify Data Relationships** (15 min)
   - In MongoDB, verify:
     - Student has correct userId
     - Job has correct companyId
     - Interview has correct studentId
     - etc.

### Evening (1 hour)

**Tasks**:

1. **Create a Quick API Reference** (45 min)
   - Write down key endpoints
   - Note which require authentication
   - Note required role (student, company, admin)

2. **Journal**: Write
   - How many endpoints are there?
   - Which ones did you test?
   - Any errors encountered?

**End of Day 4**: All APIs tested, database structure understood

---

## 🗓️ Day 5: Testing & Performance

### Morning (2 hours)

**Objective**: Run complete test suite

**Tasks**:

1. **Read Testing Guide** (20 min)
   - Open [TESTING_GUIDE.md](TESTING_GUIDE.md)
   - Read Pre-Testing Checklist section
   - Verify all checks are passing

2. **Run Database Tests** (20 min)
   - Verify MongoDB is running
   - Check seed data is present
   - List all collections
   - Count records in each collection

3. **Run Backend API Tests** (40 min)
   - Follow TESTING_GUIDE.md → Backend API Testing section
   - Test each module:
     - [ ] Auth endpoints
     - [ ] Student endpoints
     - [ ] Job endpoints
     - [ ] Aptitude endpoints
     - [ ] Interview endpoints
   - Document any failures

4. **Run Frontend Tests** (20 min)
   - Open browser DevTools (F12)
   - Go to Console tab
   - Check for errors

### Afternoon (2 hours)

**Tasks**:

1. **Complete Student Journey Test** (60 min)
   - Follow TESTING_GUIDE.md → Full User Journey
   - Steps:
     1. Register new account
     2. Login as student
     3. Complete profile
     4. Apply for 2 jobs
     5. Take aptitude test
     6. View interviews
     7. Check results dashboard
   - Document everything that works/breaks

2. **Test Responsive Design** (30 min)
   - Open DevTools → Responsive mode (Ctrl+Shift+M)
   - Test on Mobile (375x667)
   - Test on Tablet (768x1024)
   - Test on Desktop (1920x1080)
   - [ ] All pages responsive
   - [ ] No horizontal scroll

3. **Performance Check** (30 min)
   - DevTools → Performance tab
   - Record page load
   - Check:
     - First contentful paint < 2s
     - Total load < 5s

### Evening (1 hour)

**Tasks**:

1. **Create Test Report** (45 min)
   - Document:
     - Tests passed: __
     - Tests failed: __
     - Issues found: __
   - List any errors
   - Document solutions

2. **Journal**: Write
   - What features work perfectly?
   - What needs improvement?
   - What's the user experience like?

**End of Day 5**: Complete testing done, ready for demo

---

## 🗓️ Day 6: Viva Preparation

### Morning (3 hours)

**Objective**: Prepare comprehensive viva answers

**Tasks**:

1. **Read VIVA_QUESTIONS.md** (90 min)
   - Read all 22 questions
   - Read all 22 answers
   - Take notes on:
     - Architecture questions (Q1-3)
     - Security questions (Q4-6)
     - Database questions (Q7-8)
     - API questions (Q9-11)
     - Frontend questions (Q12-14)
     - Deployment questions (Q15-16)

2. **Create Viva Notes** (30 min)
   - For each question, write:
     - Key points to cover
     - Examples from your code
     - Diagrams if needed

3. **Practice Explaining**
   - Choose 3 complex questions
   - Explain them aloud
   - Time yourself (2-3 min per answer)
   - Record if possible and listen back

### Afternoon (3 hours)

**Tasks**:

1. **Deep Dive into Complex Topics** (90 min)
   - Study in detail:
     - JWT authentication mechanism
     - Database schema relationships
     - Mongoose populate() usage
     - React Context API
     - Axios interceptors
     - Aptitude test scoring logic

2. **Code Review** (60 min)
   - Choose 5 important files
   - Read completely
   - Understand:
     - Logic
     - Design decisions
     - Error handling
   - Be ready to explain at viva

3. **Answer Practice** (30 min)
   - Answer first 10 viva questions without looking
   - Check your answers against guide
   - Note gaps in understanding

### Evening (1.5 hours)

**Tasks**:

1. **Create Personal Viva Guide** (45 min)
   - Write your own answers in your words
   - Include code examples
   - Create a cheat sheet (1 page, for study only)

2. **Practice Demo** (30 min)
   - Reset database: `npm run seed`
   - Walk through student workflow
   - Be ready to do this in viva
   - Note any glitches to fix

3. **Journal**: Write
   - Topics you feel confident about
   - Topics you need more practice on
   - Hardest concepts to explain

**End of Day 6**: Viva answers prepared, confident in explanation

---

## 🗓️ Day 7: Final Review & Presentation Prep

### Morning (2 hours)

**Objective**: Polish and finalize

**Tasks**:

1. **Code Quality Review** (45 min)
   - Check code formatting
   - Verify comments are clear
   - Ensure error handling is good
   - Look for any bugs

2. **Documentation Review** (30 min)
   - Verify all .md files are accurate
   - Check all commands work
   - Verify demo credentials work
   - Test setup instructions (pretend you're new)

3. **Final Testing** (30 min)
   - Fresh database: 
     ```bash
     npm run seed
     ```
   - Start both servers
   - Complete student journey one more time
   - Take screenshots for presentation

4. **Fix Any Issues** (15 min)
   - If anything is broken, fix it
   - If any command fails, troubleshoot
   - Update docs if needed

### Afternoon (2 hours)

**Tasks**:

1. **Create Presentation** (90 min)
   - Create slides covering:
     1. Project overview (what it does)
     2. Tech stack (why these technologies)
     3. Architecture (how it's organized)
     4. Key features (7 modules)
     5. Database schema (collections and relationships)
     6. User workflows (student and company)
     7. Security (JWT, password hashing, RBAC)
     8. Testing (what was tested)
     9. Challenges & solutions
     10. Future improvements

2. **Practice Presentation** (30 min)
   - Present to yourself
   - Time yourself (5-10 minutes)
   - Practice demo

### Evening (1.5 hours)

**Tasks**:

1. **Final Viva Practice** (45 min)
   - Ask yourself difficult questions
   - Explain concepts out loud
   - Practice saying technical terms correctly
   - Practice code explanations

2. **Prepare for Live Coding** (30 min)
   - Be ready to:
     - Change something in code
     - Test an API
     - Explain a feature
     - Fix a bug
   - Practice these scenarios

3. **Get Everything Ready** (15 min)
   - Have code open in IDE
   - Have application running
   - Have documentation bookmarked
   - Have presentation ready
   - Have demo credentials memorized

4. **Confidence Check**
   - Can I explain the entire system?
   - Can I trace code execution?
   - Can I troubleshoot issues?
   - Can I answer viva questions?

**End of Day 7**: Ready for submission and viva!

---

## ✅ Completion Checklist

### By End of Each Day

**Day 1**: 
- [ ] Application running
- [ ] Can login with demo credentials
- [ ] All pages explored

**Day 2**:
- [ ] Backend structure understood
- [ ] Models and relationships clear
- [ ] One API module traced completely

**Day 3**:
- [ ] Frontend structure understood
- [ ] API integration clear
- [ ] All pages studied

**Day 4**:
- [ ] API endpoints tested
- [ ] Database structure verified
- [ ] Data relationships confirmed

**Day 5**:
- [ ] Complete testing done
- [ ] Student journey tested
- [ ] Responsive design verified

**Day 6**:
- [ ] Viva questions studied
- [ ] Key concepts understood
- [ ] Demo practiced

**Day 7**:
- [ ] Everything working perfectly
- [ ] Presentation ready
- [ ] Confident for viva

---

## 📝 Daily Journal Template

For each day, write:

```
## Day X: [Title]

**What I Learned**:
1. 
2. 
3. 

**Files I Studied**:
-
-
-

**What I Built/Tested**:
-
-

**Challenges**:
-
-

**Tomorrow's Focus**:
-
-
```

---

## 🎯 Viva Success Tips

1. **Know the Code**
   - Be able to explain any file
   - Know the flow of execution
   - Understand design decisions

2. **Know the Concepts**
   - JWT authentication
   - Database relationships
   - REST API principles
   - React hooks and Context API

3. **Know the Demo**
   - Practice student workflow 5+ times
   - Be smooth and confident
   - Handle any questions about the flow

4. **Know the Architecture**
   - Be able to draw system diagram
   - Explain how components interact
   - Explain why technologies were chosen

5. **Be Honest**
   - If you don't know something, say so
   - Show you can troubleshoot
   - Explain your learning process

---

## 📞 When You Get Stuck

1. **Check QUICK_REFERENCE.md** for common commands
2. **Check SETUP_GUIDE.md** for troubleshooting
3. **Check VIVA_QUESTIONS.md** for concept explanation
4. **Check API_DOCUMENTATION.md** for endpoint details
5. **Check the actual code** - it's your best source of truth

---

## 🎬 Ready to Present?

✅ Application works perfectly
✅ Code is clean and organized
✅ Documentation is comprehensive
✅ Viva answers are prepared
✅ Demo is practiced
✅ Presentation is ready
✅ You can explain everything

**You're all set! Go ace that project presentation! 🚀**

---

## Final Thoughts

This is a **production-ready application** that demonstrates:
- Full-stack development expertise
- Software architecture knowledge
- Database design skills
- Security best practices
- Testing and quality assurance
- Project management and documentation

You should be **proud of this work**. It's a legitimate, industry-grade project suitable for a 3rd-year college submission.

**Good luck with your project and viva! 🎉**
