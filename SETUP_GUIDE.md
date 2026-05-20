# Campus Placement Portal - Complete Setup Guide

## System Requirements

- **Node.js**: v14.0 or higher
- **npm**: v6.0 or higher
- **MongoDB**: v4.4 or higher
- **Git**: Latest version
- **RAM**: Minimum 4GB
- **Disk Space**: Minimum 500MB

## Operating Systems Supported
- Windows 10/11
- macOS 10.12+
- Ubuntu 18.04+

---

## Step-by-Step Installation

### Phase 1: Environment Setup

#### 1.1 Install Node.js
1. Visit: https://nodejs.org/
2. Download LTS version
3. Run installer and follow instructions
4. Verify installation:
```bash
node --version
npm --version
```

#### 1.2 Install MongoDB

**Option A: Local MongoDB**
1. Download from: https://www.mongodb.com/try/download/community
2. Follow installation guide for your OS
3. Start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster and get connection string
4. Add IP whitelist: 0.0.0.0/0 (for development)

#### 1.3 Install Git
1. Download from: https://git-scm.com/
2. Install and configure
3. Verify: `git --version`

---

### Phase 2: Backend Setup

#### Step 1: Clone/Create Project
```bash
# Navigate to your projects folder
cd ~/projects

# Clone or create directory
mkdir campus_placement
cd campus_placement
```

#### Step 2: Backend Installation
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# This installs:
# - express (web framework)
# - mongoose (MongoDB ORM)
# - jsonwebtoken (authentication)
# - bcryptjs (password hashing)
# - cors (cross-origin requests)
# - dotenv (environment variables)
# - nodemon (auto-reload)
```

#### Step 3: Configure Environment
```bash
# Create .env file from example
cp .env.example .env

# Edit .env with your settings
```

**Sample .env Configuration:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campus_placement
JWT_SECRET=your_super_secret_key_change_this_in_production
NODE_ENV=development
```

**For MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campus_placement?retryWrites=true&w=majority
```

#### Step 4: Seed Database
```bash
# Populate with sample data
npm run seed

# This creates:
# - 10 students
# - 5 companies
# - 5 jobs
# - 10 aptitude questions
# - 5 interviews
# - 3 results
```

#### Step 5: Start Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

**Expected Output:**
```
Connected to MongoDB
Server running on port 5000
```

---

### Phase 3: Frontend Setup

#### Step 1: Install Frontend Dependencies
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# This installs:
# - react (UI library)
# - react-router-dom (routing)
# - axios (HTTP client)
# - recharts (charts)
# - react-toastify (notifications)
```

#### Step 2: Configure Environment
```bash
# Create .env file
cp .env.example .env

# Default configuration
```

**Sample .env:**
```
REACT_APP_API_URL=http://localhost:5000/api
```

#### Step 3: Start Frontend Development Server
```bash
npm run dev

# Frontend will open at http://localhost:3000
```

---

## Verification Checklist

### Backend Verification
```bash
# Test backend health
curl http://localhost:5000/api/health

# Expected response:
# {"success":true,"message":"Server is running"}
```

### Frontend Verification
1. Open browser to `http://localhost:3000`
2. Should see home page
3. Navigation bar visible
4. No console errors

### Database Verification
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Check `campus_placement` database
4. Should have 8 collections with sample data

---

## Common Installation Issues & Solutions

### Issue 1: Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process (macOS/Linux)
kill -9 <PID>

# Windows: Use Task Manager to kill process
# Or change port in .env file
```

### Issue 2: MongoDB Connection Failed

**Problem:** `MongoServerError: connect ECONNREFUSED 127.0.0.1:27017`

**Solution:**
- Ensure MongoDB service is running
- Check connection string in .env
- Try with MongoDB Atlas cloud instead
- Restart MongoDB service

### Issue 3: Module Not Found

**Problem:** `Cannot find module 'express'`

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: CORS Error in Frontend

**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Check backend server is running
- Verify REACT_APP_API_URL in frontend/.env
- Ensure backend has CORS enabled in server.js

### Issue 5: npm install Takes Too Long

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Use npm ci instead
npm ci
```

---

## Project Structure Verification

After complete setup, your folder structure should look like:

```
campus_placement/
├── backend/
│   ├── node_modules/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   ├── middleware/
│   ├── seeds/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── .env
│   └── .env.example
│
└── README.md
```

---

## Running the Complete Application

### Terminal 1 - Start Backend:
```bash
cd backend
npm run dev
```
Wait for: `Server running on port 5000`

### Terminal 2 - Start Frontend:
```bash
cd frontend
npm run dev
```
Wait for: `Compiled successfully!`

### Terminal 3 - Access Application:
Open browser: `http://localhost:3000`

---

## Testing with Demo Credentials

After setup, use these credentials to test:

**Student Login:**
- Email: `priya.sharma@gmail.com`
- Password: `student123`

**Company Login:**
- Email: `hrtechsolutionsindiacom@gmail.com`
- Password: `company123`

---

## Database Backup & Restore

### Backup MongoDB Data
```bash
# Export database
mongodump --db campus_placement --out ./backup

# Export to JSON
mongoexport --db campus_placement --collection students --out students.json
```

### Restore MongoDB Data
```bash
# Restore database
mongorestore --db campus_placement ./backup/campus_placement

# Import from JSON
mongoimport --db campus_placement --collection students --file students.json
```

---

## Production Deployment Checklist

Before deploying to production:

- [ ] Update JWT_SECRET to strong random value
- [ ] Set NODE_ENV=production
- [ ] Use MongoDB Atlas instead of local
- [ ] Enable HTTPS
- [ ] Setup environment variables securely
- [ ] Test all API endpoints
- [ ] Build frontend for production: `npm run build`
- [ ] Setup reverse proxy (Nginx/Apache)
- [ ] Enable database backups
- [ ] Setup logging
- [ ] Configure error monitoring

---

## Development Tips

### Hot Reload
- Backend: Nodemon auto-reloads on file changes
- Frontend: React Dev Server auto-refreshes

### Debugging Backend
```bash
# Enable debug logs
DEBUG=* npm run dev

# Using VS Code debugger
# Add .vscode/launch.json configuration
```

### Debugging Frontend
- Use React DevTools browser extension
- Use Chrome DevTools (F12)
- Use Redux DevTools for state management

### Code Formatting
```bash
# Install prettier (optional)
npm install --save-dev prettier

# Format code
npx prettier --write .
```

---

## Performance Optimization

### Backend
- Enable compression: `npm install compression`
- Use connection pooling
- Add database indexing
- Implement caching

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle analysis

---

## Testing

### Backend Testing
```bash
# Install testing tools
npm install --save-dev jest supertest

# Run tests
npm test
```

### Frontend Testing
```bash
# Testing is available through Create React App
npm test
```

---

## Troubleshooting Checklist

Before asking for help, verify:
- [ ] Node.js version is v14+
- [ ] MongoDB is running
- [ ] All dependencies are installed
- [ ] .env files are configured correctly
- [ ] No port conflicts
- [ ] Network connectivity is stable
- [ ] Sufficient disk space available
- [ ] Correct file permissions

---

## Getting Help

1. Check the error message carefully
2. Review the code comments
3. Check MongoDB logs: `~/.mongodb/logs/`
4. Review Express logs in console
5. Check browser console (F12)
6. Review network tab in DevTools

---

## Next Steps After Setup

1. Explore the application
2. Create new user accounts
3. Test all features
4. Modify sample data
5. Customize styling
6. Add new features
7. Deploy to production

**Congratulations! Your Campus Placement Portal is now ready to use! 🎉**
