# Campus Placement Portal - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

Create a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"  // or "company"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

---

### 2. Login User
**POST** `/auth/login`

Authenticate user and get JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

---

### 3. Get Current User
**GET** `/auth/me`

Get authenticated user details

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "profile": {
      "_id": "507f1f77bcf86cd799439012",
      "enrollmentNumber": "CSE2021001",
      "cgpa": 8.5,
      "skills": ["JavaScript", "React"]
    }
  }
}
```

---

### 4. Logout
**POST** `/auth/logout`

Logout user (frontend removes token)

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Student Endpoints

### 1. Get Student Profile
**GET** `/students/profile`

Get authenticated student's profile

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "student": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "enrollmentNumber": "CSE2021001",
    "phone": "9876543210",
    "department": "CSE",
    "graduationYear": 2025,
    "cgpa": 8.5,
    "skills": ["JavaScript", "React", "Node.js"],
    "resumeLink": "https://example.com/resume.pdf",
    "placementStatus": "placed",
    "placedCompany": "507f1f77bcf86cd799439013",
    "package": 12,
    "profileCompletion": 95
  }
}
```

---

### 2. Update Student Profile
**PUT** `/students/profile`

Update student profile information

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "phone": "9876543210",
  "department": "CSE",
  "graduationYear": 2025,
  "cgpa": 8.5,
  "skills": ["JavaScript", "React", "Node.js"],
  "resumeLink": "https://example.com/resume.pdf",
  "enrollmentNumber": "CSE2021001"
}
```

**Response (200):**
```json
{
  "success": true,
  "student": { ... }
}
```

---

### 3. Get All Students
**GET** `/students`

Get list of all students (Company/Admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
```
?department=CSE&cgpa=7.5
```

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "students": [ ... ]
}
```

---

### 4. Get Single Student
**GET** `/students/:id`

Get specific student details

**Response (200):**
```json
{
  "success": true,
  "student": { ... }
}
```

---

## Company Endpoints

### 1. Get Company Profile
**GET** `/companies/profile`

Get authenticated company's profile

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "company": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "companyName": "Tech Solutions",
    "website": "https://techsolutions.com",
    "description": "Leading software company",
    "location": "Bangalore",
    "hrEmail": "hr@techsolutions.com",
    "hrPhone": "08040123456",
    "isVerified": true
  }
}
```

---

### 2. Update Company Profile
**PUT** `/companies/profile`

Update company information

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "companyName": "Tech Solutions",
  "website": "https://techsolutions.com",
  "description": "Leading software company",
  "location": "Bangalore",
  "hrEmail": "hr@techsolutions.com",
  "hrPhone": "08040123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "company": { ... }
}
```

---

### 3. Get All Companies
**GET** `/companies`

Get list of all companies

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "companies": [ ... ]
}
```

---

### 4. Get Single Company
**GET** `/companies/:id`

Get specific company details

**Response (200):**
```json
{
  "success": true,
  "company": { ... }
}
```

---

## Job Endpoints

### 1. Create Job
**POST** `/jobs`

Create new job posting (Company only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "jobTitle": "Full Stack Developer",
  "description": "Looking for experienced developer",
  "package": 12,
  "location": "Bangalore",
  "department": ["CSE", "IT"],
  "minCGPA": 7.5,
  "maxCGPA": 10,
  "requiredSkills": ["JavaScript", "React", "Node.js"],
  "interviewDate": "2025-06-15",
  "interviewMode": "online"
}
```

**Response (201):**
```json
{
  "success": true,
  "job": { ... }
}
```

---

### 2. Get All Jobs
**GET** `/jobs`

Get list of all job postings

**Query Parameters:**
```
?companyId=507f1f77bcf86cd799439013&department=CSE&minPackage=10
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "jobs": [ ... ]
}
```

---

### 3. Get Single Job
**GET** `/jobs/:id`

Get specific job details

**Response (200):**
```json
{
  "success": true,
  "job": {
    "_id": "507f1f77bcf86cd799439014",
    "companyId": { ... },
    "jobTitle": "Full Stack Developer",
    "package": 12,
    "minCGPA": 7.5,
    "requiredSkills": ["JavaScript", "React"],
    "applicants": [ ... ]
  }
}
```

---

### 4. Update Job
**PUT** `/jobs/:id`

Update job details (Company only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "jobTitle": "Senior Full Stack Developer",
  "package": 14,
  "isActive": true
}
```

**Response (200):**
```json
{
  "success": true,
  "job": { ... }
}
```

---

### 5. Delete Job
**DELETE** `/jobs/:id`

Delete job posting (Company only)

**Response (200):**
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

---

### 6. Apply for Job
**POST** `/jobs/:jobId/apply`

Apply for job as student

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Applied successfully"
}
```

---

## Interview Endpoints

### 1. Schedule Interview
**POST** `/interviews`

Schedule interview (Company only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "studentId": "507f1f77bcf86cd799439015",
  "jobId": "507f1f77bcf86cd799439014",
  "interviewDate": "2025-06-15",
  "interviewTime": "10:00 AM",
  "interviewMode": "online",
  "meetingLink": "https://zoom.us/j/123456"
}
```

**Response (201):**
```json
{
  "success": true,
  "interview": { ... }
}
```

---

### 2. Get All Interviews
**GET** `/interviews`

Get all interviews with filters

**Query Parameters:**
```
?studentId=507f1f77bcf86cd799439015&status=scheduled
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "interviews": [ ... ]
}
```

---

### 3. Get My Interviews (Student)
**GET** `/interviews/my-interviews/list`

Get student's interviews

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "interviews": [ ... ]
}
```

---

### 4. Get Company Interviews
**GET** `/interviews/company-interviews/list`

Get company's scheduled interviews

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "interviews": [ ... ]
}
```

---

### 5. Update Interview
**PUT** `/interviews/:id`

Update interview details (Company only)

**Request Body:**
```json
{
  "status": "completed",
  "result": "pass",
  "remarks": "Good performance"
}
```

**Response (200):**
```json
{
  "success": true,
  "interview": { ... }
}
```

---

### 6. Cancel Interview
**DELETE** `/interviews/:id`

Cancel interview

**Response (200):**
```json
{
  "success": true,
  "interview": { "status": "cancelled" }
}
```

---

## Aptitude Test Endpoints

### 1. Get All Questions
**GET** `/aptitude/questions`

Get all aptitude questions

**Query Parameters:**
```
?category=quantitative&difficulty=easy
```

**Response (200):**
```json
{
  "success": true,
  "count": 10,
  "questions": [ ... ]
}
```

---

### 2. Get Random Questions
**GET** `/aptitude/questions/random`

Get random questions for test

**Query Parameters:**
```
?count=10
```

**Response (200):**
```json
{
  "success": true,
  "questions": [ ... ]
}
```

---

### 3. Start Test
**POST** `/aptitude/start`

Start new aptitude test

**Headers:**
```
Authorization: Bearer <token>
```

**Response (201):**
```json
{
  "success": true,
  "test": {
    "_id": "507f1f77bcf86cd799439016",
    "studentId": "507f1f77bcf86cd799439015",
    "questions": [ ... ],
    "totalQuestions": 10,
    "startedAt": "2025-06-01T10:00:00Z"
  }
}
```

---

### 4. Submit Test
**POST** `/aptitude/submit`

Submit completed test

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "testId": "507f1f77bcf86cd799439016",
  "answers": [
    {
      "questionId": "507f1f77bcf86cd799439017",
      "selectedOptionIndex": 1
    }
  ]
}
```

**Response (200):**
```json
{
  "success": true,
  "test": {
    "_id": "507f1f77bcf86cd799439016",
    "score": 8,
    "correctAnswers": 8,
    "percentage": 80,
    "isCompleted": true
  }
}
```

---

### 5. Get Test Result
**GET** `/aptitude/result/:testId`

Get test result with detailed analysis

**Response (200):**
```json
{
  "success": true,
  "test": {
    "_id": "507f1f77bcf86cd799439016",
    "score": 8,
    "percentage": 80,
    "correctAnswers": 8,
    "totalQuestions": 10,
    "questions": [ ... ]
  }
}
```

---

### 6. Get My Tests
**GET** `/aptitude/my-tests`

Get all tests taken by student

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "tests": [ ... ]
}
```

---

## Results Endpoints

### 1. Create Result
**POST** `/results`

Create placement result (Company only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "studentId": "507f1f77bcf86cd799439015",
  "jobId": "507f1f77bcf86cd799439014",
  "package": 12,
  "offerStatus": "selected",
  "joiningDate": "2025-07-15",
  "comments": "Excellent candidate"
}
```

**Response (201):**
```json
{
  "success": true,
  "result": { ... }
}
```

---

### 2. Get All Results
**GET** `/results`

Get all placement results

**Query Parameters:**
```
?studentId=507f1f77bcf86cd799439015&offerStatus=selected
```

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "results": [ ... ]
}
```

---

### 3. Get My Results (Student)
**GET** `/results/my-results`

Get student's placement results

**Response (200):**
```json
{
  "success": true,
  "count": 2,
  "results": [ ... ]
}
```

---

### 4. Get Dashboard Statistics
**GET** `/results/stats/dashboard`

Get placement statistics

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "totalStudents": 10,
    "placedStudents": 4,
    "companies": 5,
    "upcomingInterviews": 2,
    "placementStats": [ ... ],
    "departmentStats": [ ... ]
  }
}
```

---

### 5. Update Result
**PUT** `/results/:id`

Update placement result

**Request Body:**
```json
{
  "offerStatus": "selected",
  "package": 14
}
```

**Response (200):**
```json
{
  "success": true,
  "result": { ... }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "User role is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server error message"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200  | OK - Success |
| 201  | Created - Resource created |
| 400  | Bad Request - Invalid input |
| 401  | Unauthorized - Auth required |
| 403  | Forbidden - Access denied |
| 404  | Not Found - Resource not found |
| 500  | Server Error |

---

## Authentication Roles

| Role    | Permissions |
|---------|------------|
| student | View jobs, apply, take tests, view results |
| company | Post jobs, schedule interviews, view students |
| admin   | Full access to all features |

---

## Sample Request (cURL)

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"priya.sharma@gmail.com","password":"student123"}'
```

### Create Job
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "jobTitle": "Full Stack Developer",
    "package": 12,
    "location": "Bangalore"
  }'
```

### Get Jobs
```bash
curl -X GET http://localhost:5000/api/jobs \
  -H "Authorization: Bearer <token>"
```

---

## Rate Limiting

Currently not implemented. Recommended to add for production:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-06-01 | Initial release |

---

## Support

For issues or questions about the API:
- Check the error message
- Review this documentation
- Check backend logs
- Review VIVA_QUESTIONS.md for technical details
