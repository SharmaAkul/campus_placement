# Campus Placement Portal - Testing Guide

## Overview

This document provides comprehensive testing procedures for the Campus Placement Portal to ensure all features work correctly before submission and viva presentation.

---

## Pre-Testing Checklist

- [ ] MongoDB is installed and running
- [ ] Node.js v14+ is installed
- [ ] All dependencies installed (`npm install` in both backend and frontend)
- [ ] .env files created with correct values
- [ ] No errors in terminal when starting servers
- [ ] Both frontend and backend are running
- [ ] Database is populated with seed data (`npm run seed`)

---

## 1. Database Testing

### 1.1 MongoDB Connection Test

**Objective**: Verify MongoDB is running and accessible

**Steps**:
1. Start MongoDB:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```

2. Verify connection in backend terminal:
   ```
   Expected: "Connected to MongoDB successfully"
   ```

3. Check database exists:
   ```bash
   mongo
   > use campus_placement
   > db.users.count()
   ```

**Expected Result**: Connection successful, collection accessible

---

### 1.2 Seed Data Population Test

**Objective**: Verify dummy data is created correctly

**Steps**:
1. Run seed script:
   ```bash
   cd backend
   npm run seed
   ```

2. Check terminal output for:
   - "Clearing existing data..."
   - "Creating users..."
   - "Creating 10 students..."
   - "Creating 5 companies..."
   - "Creating 5 jobs..."
   - "Creating 10 aptitude questions..."
   - "Creating 5 interviews..."
   - "Creating 3 results..."
   - "Seed data created successfully!"

**Expected Result**: All seed operations complete without errors

---

### 1.3 Database Collections Test

**Objective**: Verify all collections exist and have correct structure

**MongoDB Compass Test** (Visual verification):
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select database: `campus_placement`
4. Verify collections exist:
   - [ ] users (10+ documents)
   - [ ] students (10+ documents)
   - [ ] companies (5+ documents)
   - [ ] jobs (5+ documents)
   - [ ] interviews (5+ documents)
   - [ ] aptitudequestions (10+ documents)
   - [ ] aptitudetests (0+ documents)
   - [ ] results (3+ documents)

**Terminal Test**:
```bash
mongo campus_placement
> db.getCollectionNames()
```

Expected output:
```
[ 'users', 'students', 'companies', 'jobs', 'interviews', 
  'aptitudequestions', 'aptitudetests', 'results' ]
```

---

## 2. Backend API Testing

### 2.1 Server Startup Test

**Objective**: Verify backend starts without errors

**Steps**:
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Start server:
   ```bash
   npm run dev
   ```

3. Look for success messages:
   - "Server running on port 5000"
   - "Connected to MongoDB successfully"

4. Test health endpoint:
   ```bash
   curl http://localhost:5000/api/health
   ```

**Expected Result**: 
- Server starts without errors
- Terminal shows connection messages
- Health endpoint returns JSON response

---

### 2.2 Authentication API Tests

**Using Postman or cURL**

#### Test 2.2.1: Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "role": "student"
  }'
```

**Expected Response (201)**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "name": "Test User",
    "email": "test@example.com",
    "role": "student"
  }
}
```

#### Test 2.2.2: Login User

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "priya.sharma@gmail.com",
    "password": "student123"
  }'
```

**Expected Response (200)**:
- Token returned
- User object includes role and profile data

#### Test 2.2.3: Get Current User

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your_token_here>"
```

**Expected Response (200)**:
- User details returned
- No password field visible

---

### 2.3 Student API Tests

**Prerequisite**: Login with student account and get token

#### Test 2.3.1: Get Student Profile

```bash
curl -X GET http://localhost:5000/api/students/profile \
  -H "Authorization: Bearer <token>"
```

**Expected Response**:
- Student profile with all fields
- profileCompletion percentage visible

#### Test 2.3.2: Update Student Profile

```bash
curl -X PUT http://localhost:5000/api/students/profile \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "9876543210",
    "cgpa": 8.5,
    "skills": ["JavaScript", "React"],
    "department": "CSE"
  }'
```

**Expected Response (200)**:
- Profile updated
- New values reflected

#### Test 2.3.3: Get All Students (Company)

```bash
curl -X GET http://localhost:5000/api/students \
  -H "Authorization: Bearer <company_token>"
```

**Expected Response**:
- List of all students
- Each student has profile data

---

### 2.4 Job API Tests

#### Test 2.4.1: Get All Jobs

```bash
curl -X GET http://localhost:5000/api/jobs
```

**Expected Response**:
- List of all job postings
- Jobs include company, requirements, applicants array

#### Test 2.4.2: Get Single Job

```bash
curl -X GET http://localhost:5000/api/jobs/<job_id>
```

**Expected Response**:
- Single job details
- Applicants list populated

#### Test 2.4.3: Apply for Job (Student)

```bash
curl -X POST http://localhost:5000/api/jobs/<job_id>/apply \
  -H "Authorization: Bearer <student_token>"
```

**Expected Response (200)**:
- Applied successfully
- Student added to applicants array

#### Test 2.4.4: Create Job (Company)

```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Authorization: Bearer <company_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "jobTitle": "Frontend Developer",
    "package": 10,
    "location": "Mumbai",
    "department": ["CSE", "IT"],
    "minCGPA": 7.0,
    "requiredSkills": ["JavaScript", "React"]
  }'
```

**Expected Response (201)**:
- Job created with ID
- Company linked to job

---

### 2.5 Aptitude Test API Tests

#### Test 2.5.1: Get All Questions

```bash
curl -X GET http://localhost:5000/api/aptitude/questions
```

**Expected Response**:
- Array of 10 questions
- Each question has category, options, explanation

#### Test 2.5.2: Start Test

```bash
curl -X POST http://localhost:5000/api/aptitude/start \
  -H "Authorization: Bearer <student_token>"
```

**Expected Response (201)**:
- Test object created
- 10 random questions assigned
- Timer starts (startedAt timestamp)

#### Test 2.5.3: Submit Test

```bash
curl -X POST http://localhost:5000/api/aptitude/submit \
  -H "Authorization: Bearer <student_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "testId": "<test_id>",
    "answers": [
      {"questionId": "<q1_id>", "selectedOptionIndex": 1},
      {"questionId": "<q2_id>", "selectedOptionIndex": 2}
    ]
  }'
```

**Expected Response (200)**:
- Score calculated automatically
- Percentage displayed
- Pass/fail status shown

---

### 2.6 Interview API Tests

#### Test 2.6.1: Get Interviews

```bash
curl -X GET http://localhost:5000/api/interviews
```

**Expected Response**:
- List of interviews
- Includes student, company, job, date, time, status

#### Test 2.6.2: Get My Interviews (Student)

```bash
curl -X GET http://localhost:5000/api/interviews/my-interviews/list \
  -H "Authorization: Bearer <student_token>"
```

**Expected Response**:
- Only student's interviews listed
- Status shows scheduled/completed

---

### 2.7 Results API Tests

#### Test 2.7.1: Get Dashboard Statistics

```bash
curl -X GET http://localhost:5000/api/results/stats/dashboard
```

**Expected Response**:
```json
{
  "totalStudents": 10,
  "placedStudents": 4,
  "companies": 5,
  "upcomingInterviews": 2,
  "placementStats": [...],
  "departmentStats": [...]
}
```

---

## 3. Frontend Testing

### 3.1 Application Startup Test

**Steps**:
1. Navigate to frontend:
   ```bash
   cd frontend
   ```

2. Start development server:
   ```bash
   npm start
   ```

3. Check browser console for errors (F12 → Console tab)

4. Page should load at `http://localhost:3000`

**Expected Result**:
- No console errors
- Page loads without blank screen
- Navigation bar visible

---

### 3.2 Home Page Test

**Objective**: Verify home page displays correctly

**Steps**:
1. Navigate to `http://localhost:3000`
2. Verify elements:
   - [ ] Hero section visible
   - [ ] "Login" and "Register" buttons visible
   - [ ] 6 feature cards displayed
   - [ ] Statistics cards showing numbers
   - [ ] Footer visible
   - [ ] Responsive on mobile (resize browser)

**Expected Result**: All elements visible and styled correctly

---

### 3.3 Authentication Testing

#### Test 3.3.1: Registration

**Steps**:
1. Click "Register" button
2. Enter details:
   ```
   Name: John Doe
   Email: john@test.com
   Password: test123
   Role: Student
   ```
3. Click Submit

**Expected Result**:
- Success toast message
- Redirected to student dashboard
- User profile shows new user

#### Test 3.3.2: Login with Demo Student Account

**Steps**:
1. Click "Login" button
2. Enter:
   ```
   Email: priya.sharma@gmail.com
   Password: student123
   ```
3. Click Submit

**Expected Result**:
- Success message
- Redirected to student dashboard
- Navbar shows logged-in user's name

#### Test 3.3.3: Login with Demo Company Account

**Steps**:
1. Click "Login" button
2. Enter:
   ```
   Email: hrtechsolutionsindiacom@gmail.com
   Password: company123
   ```
3. Click Submit

**Expected Result**:
- Successful login
- Redirected to company dashboard (or home)
- Navbar shows company name

#### Test 3.3.4: Logout

**Steps**:
1. Login first
2. Click user dropdown in navbar
3. Click "Logout"

**Expected Result**:
- Token cleared from localStorage
- Redirected to home page
- Cannot access protected pages

---

### 3.4 Student Dashboard Testing

**Prerequisite**: Login as student

**Steps**:
1. Navigate to `/student-dashboard` (or click in navbar)
2. Verify sections:
   - [ ] Profile editing form visible
   - [ ] All input fields present (email, phone, cgpa, etc.)
   - [ ] Profile completion progress bar shows percentage
   - [ ] Placement status badge visible

#### Test 3.4.1: Edit Profile

**Steps**:
1. Click "Edit Profile" button
2. Update fields:
   ```
   Phone: 9876543210
   CGPA: 8.5
   Department: CSE
   Skills: JavaScript, React, Node.js
   ```
3. Click Save

**Expected Result**:
- Success toast message
- Profile completion percentage updates
- Fields show new values

#### Test 3.4.2: View Profile

**Steps**:
1. Click "View Profile" button (after editing)

**Expected Result**:
- Profile shown in read-only mode
- All entered values displayed correctly

---

### 3.5 Jobs Page Testing

**Prerequisite**: Login as student

**Steps**:
1. Navigate to Jobs page
2. Verify:
   - [ ] Job cards displayed
   - [ ] Each card shows: title, company, package, skills, eligibility
   - [ ] "Apply" button visible on each card

#### Test 3.5.1: Filter Jobs

**Steps**:
1. Select department filter (e.g., "CSE")
2. Jobs list should update

**Expected Result**:
- Only jobs matching filter shown

#### Test 3.5.2: Apply for Job

**Steps**:
1. Click "Apply" button on a job card
2. Verify success message

**Expected Result**:
- Toast notification: "Applied successfully"
- Button may show "Applied" status
- Application recorded in database

---

### 3.6 Aptitude Test Page Testing

**Prerequisite**: Login as student

**Steps**:
1. Navigate to Aptitude Test page
2. Click "Start Test" button

#### Test 3.6.1: Test Interface

**Steps**:
1. After starting test, verify:
   - [ ] Question displayed with 4 options
   - [ ] Progress dots show question numbers
   - [ ] Timer counts down (30 minutes)
   - [ ] Current question highlighted

#### Test 3.6.2: Answer Questions

**Steps**:
1. Select an answer (radio button)
2. Click "Next Question"
3. Repeat for 5+ questions

**Expected Result**:
- Answers recorded
- Can navigate between questions
- Selected answers remembered when returning

#### Test 3.6.3: Submit Test

**Steps**:
1. Answer all 10 questions
2. Click "Submit Test"

**Expected Result**:
- Results displayed:
  - [ ] Score shown (e.g., 8/10)
  - [ ] Percentage shown (80%)
  - [ ] Pass/Fail status shown
  - [ ] Correct answers count

#### Test 3.6.4: Timer Test

**Steps**:
1. Start test
2. Wait for timer to reach 1 minute
3. Verify timer displays correctly

**Expected Result**:
- Timer counts down
- Format shows MM:SS
- Displays warning as time runs out

---

### 3.7 My Interviews Page Testing

**Prerequisite**: Login as student with scheduled interviews

**Steps**:
1. Navigate to "My Interviews" page
2. Verify sections:
   - [ ] "Upcoming Interviews" section visible
   - [ ] "Completed Interviews" section visible
   - [ ] Each interview shows: company, job title, date, time, mode

#### Test 3.7.1: Interview Details

**Steps**:
1. View an interview card
2. Verify information:
   - Company name
   - Job title
   - Interview date/time
   - Interview mode (online/offline)
   - For online: meeting link present
   - For offline: location present

**Expected Result**:
- All details displayed correctly
- Links are clickable (if provided)

---

### 3.8 Results Dashboard Testing

**Objective**: Verify charts and statistics display

**Steps**:
1. Navigate to Results Dashboard
2. Verify elements:
   - [ ] 4 stat cards visible (Students, Placed, Companies, Upcoming)
   - [ ] Numbers match database records
   - [ ] Charts render without errors

#### Test 3.8.1: Charts

**Steps**:
1. Scroll through dashboard
2. Verify charts:
   - [ ] Bar chart: Students per company
   - [ ] Bar chart: Department-wise placement
   - [ ] Pie chart: Overall placement status
   - [ ] Hover shows tooltips

**Expected Result**:
- All charts display data correctly
- No console errors
- Interactive (hover, click if applicable)

#### Test 3.8.2: Statistics Table

**Steps**:
1. Scroll to statistics table
2. Verify table shows:
   - Department names
   - Student counts
   - Placement percentages

**Expected Result**:
- Data matches database
- Table is readable and well-formatted

---

## 4. Integration Testing

### 4.1 Full User Journey: Student

**Scenario**: New student registers and completes placement process

**Steps**:
1. **Register**
   - Register new account as student
   - Verify success and redirect

2. **Complete Profile**
   - Go to Student Dashboard
   - Fill all profile fields
   - Verify profile completion increases

3. **Browse & Apply for Jobs**
   - Go to Jobs page
   - Apply for 2+ jobs
   - Verify applications recorded

4. **Take Aptitude Test**
   - Go to Aptitude Test
   - Start test
   - Answer all questions
   - Submit and view results

5. **View Results Dashboard**
   - Go to Results Dashboard
   - Verify stats updated

**Expected Result**: Complete journey works without errors

---

### 4.2 Full User Journey: Company

**Scenario**: Company posts job and manages interviews

**Steps**:
1. **Login**
   - Use demo company credentials
   - Verify company dashboard accessible

2. **Create Job** (if Company Dashboard implemented)
   - Fill job details
   - Verify job appears in job listing

3. **View Applicants**
   - Check students who applied
   - Verify applicant list complete

**Expected Result**: Company can manage hiring process

---

### 4.3 API-Frontend Integration Test

**Objective**: Verify frontend correctly consumes backend APIs

**Test**: Network tab in browser DevTools

**Steps**:
1. Open browser DevTools (F12)
2. Go to "Network" tab
3. Navigate to different pages
4. Verify API calls:
   - [ ] /auth/login - 200 OK
   - [ ] /students/profile - 200 OK
   - [ ] /jobs - 200 OK
   - [ ] /interviews/my-interviews/list - 200 OK

**Expected Result**:
- All API calls return 200 status
- No 404 or 500 errors
- Response times reasonable (< 1 second)

---

## 5. UI/UX Testing

### 5.1 Responsive Design Test

**Test on Different Screen Sizes**:

#### Desktop (1920x1080)
- [ ] All elements visible
- [ ] No horizontal scroll
- [ ] Grid layouts display correctly

#### Tablet (768x1024)
- [ ] Content fits within viewport
- [ ] Navigation accessible
- [ ] Forms readable

#### Mobile (375x667)
- [ ] Navigation adapts (hamburger menu if applicable)
- [ ] Cards stack vertically
- [ ] Text readable without zoom
- [ ] Buttons easily clickable

**Steps**:
1. Open DevTools (F12)
2. Click responsive design mode (Ctrl+Shift+M)
3. Select different devices and test

---

### 5.2 Visual Testing

#### Color Scheme
- [ ] Status badges clearly visible (pass/fail, placed/not placed)
- [ ] Text contrast meets accessibility standards
- [ ] Color scheme consistent throughout

#### Typography
- [ ] Headings clearly distinguished
- [ ] Body text readable
- [ ] Consistent font sizes

#### Spacing
- [ ] Elements not cramped
- [ ] Margins consistent
- [ ] Padding appropriate

---

### 5.3 Form Validation Testing

#### Test 3.3.1: Empty Fields
- [ ] Cannot submit empty form
- [ ] Error message displayed

#### Test 3.3.2: Invalid Email
- [ ] Email format validated
- [ ] Error on invalid format

#### Test 3.3.3: Password Strength
- [ ] Accepts valid passwords
- [ ] Shows requirements if applicable

---

## 6. Performance Testing

### 6.1 Page Load Time

**Tool**: Browser DevTools → Performance tab

**Steps**:
1. Open DevTools
2. Go to Performance tab
3. Click record
4. Navigate to page
5. Click stop
6. Analyze results

**Target**:
- First contentful paint: < 2 seconds
- Total load time: < 5 seconds

---

### 6.2 API Response Time

**Tool**: Network tab in DevTools

**Steps**:
1. Open Network tab
2. Make API calls
3. Check response times

**Target**:
- Simple queries: < 500ms
- Complex queries (stats): < 1000ms

---

### 6.3 Database Query Performance

**Check**: Backend console logs

**Optimize if**:
- Aptitude test submission takes > 2 seconds
- Statistics calculation takes > 3 seconds

---

## 7. Error Handling Testing

### 7.1 Network Errors

**Scenario**: Backend server offline

**Steps**:
1. Stop backend server
2. Try to load protected page
3. Try to submit form

**Expected Result**:
- Error toast displayed
- User can still navigate
- No blank page or crash

---

### 7.2 Database Errors

**Scenario**: Database connection lost

**Expected Result**:
- Backend returns 500 error
- Frontend shows error message
- User can retry

---

### 7.3 Authentication Errors

**Scenario**: Invalid token or expired session

**Steps**:
1. Clear localStorage manually
2. Refresh page on protected route

**Expected Result**:
- Redirected to login
- Error message if trying to access

---

## 8. Security Testing

### 8.1 JWT Token Security

**Steps**:
1. Login and get token
2. Check token in localStorage (DevTools → Application)
3. Copy token to jwt.io
4. Verify payload contains user info only (no passwords)

**Expected Result**:
- No sensitive data in token payload
- Password not visible

---

### 8.2 Protected Routes

**Steps**:
1. Logout
2. Try to directly access `/student-dashboard` in URL
3. Try to access company-only routes as student

**Expected Result**:
- Redirected to login/home
- Cannot access without proper authentication/authorization

---

### 8.3 CORS Testing

**Steps**:
1. Check browser console for CORS errors
2. Verify frontend can communicate with backend on different ports

**Expected Result**:
- No CORS errors
- API calls successful

---

## 9. Demo Credentials Testing

### Student Account
**Email**: priya.sharma@gmail.com
**Password**: student123

**Verify**:
- [ ] Can login
- [ ] Profile shows data
- [ ] Can apply for jobs
- [ ] Can take test
- [ ] Can view interviews

### Company Account
**Email**: hrtechsolutionsindiacom@gmail.com
**Password**: company123

**Verify**:
- [ ] Can login
- [ ] Can view students
- [ ] Can view job applications
- [ ] Can see posted jobs

---

## 10. Testing Checklist

### Pre-Launch Testing

**Database Layer**
- [ ] MongoDB running
- [ ] Seed data created successfully
- [ ] All collections populated
- [ ] Data integrity verified

**Backend Layer**
- [ ] Server starts without errors
- [ ] All API endpoints respond
- [ ] Authentication working
- [ ] JWT tokens generated correctly
- [ ] Role-based authorization working
- [ ] Error handling implemented

**Frontend Layer**
- [ ] App starts without errors
- [ ] All pages render correctly
- [ ] Forms submit successfully
- [ ] Navigation working
- [ ] Responsive design working
- [ ] Charts displaying correctly

**Integration**
- [ ] Frontend-Backend communication working
- [ ] Token persistence across refreshes
- [ ] Login/logout flow complete
- [ ] Protected routes protected
- [ ] API errors handled gracefully

**Demo Features**
- [ ] Student can complete full journey
- [ ] Company can manage jobs
- [ ] Aptitude test scoring working
- [ ] Results dashboard showing stats

### Viva-Ready Checklist
- [ ] All features working
- [ ] No console errors
- [ ] No network errors
- [ ] Demo credentials tested
- [ ] User flows smooth
- [ ] UI looks professional
- [ ] Database contains valid data

---

## Troubleshooting Common Issues

### Issue: "Cannot GET /api/..."
**Solution**: Check backend is running and CORS_ORIGIN is correct

### Issue: "MongoError: connect ECONNREFUSED"
**Solution**: Start MongoDB service

### Issue: Infinite loading spinner
**Solution**: Check Network tab for failed API calls, check backend logs

### Issue: JWT token errors
**Solution**: Clear localStorage and login again

### Issue: CORS errors in console
**Solution**: Verify CORS_ORIGIN matches frontend URL

---

## Test Report Template

```
TEST REPORT - Campus Placement Portal
Date: [date]
Tester: [name]
Duration: [duration]

PASSED TESTS: [count]
FAILED TESTS: [count]
ISSUES FOUND: [count]

Summary:
[Brief description of test results]

Issues:
1. [Issue description, severity, reproduction steps]
2. [...]

Recommendations:
[Any improvements or fixes needed]

Ready for submission: YES / NO
```

---

## Next Steps

1. Follow Pre-Testing Checklist
2. Execute all test scenarios in order
3. Document any failures
4. Fix critical issues before submission
5. Perform final regression test
6. Prepare for viva demo

For detailed information about any component, see relevant documentation files (README.md, API_DOCUMENTATION.md, VIVA_QUESTIONS.md)
