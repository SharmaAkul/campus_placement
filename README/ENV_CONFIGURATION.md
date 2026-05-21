# Environment Configuration Guide

## Quick Start Environment Variables

### Backend Configuration (.env)

Create a `.env` file in the backend root directory with the following:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/campus_placement

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Email Configuration (Optional - for future use)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# File Upload Configuration (Optional)
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### Frontend Configuration (.env)

Create a `.env` file in the frontend root directory with:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Application Environment
REACT_APP_ENV=development
```

---

## Detailed Environment Variable Explanation

### Backend Variables

#### Server Configuration

**PORT**
- **Value**: `5000` (development) or `80/443` (production)
- **Purpose**: Port number where Express server listens
- **Impact**: Change this if port 5000 is already in use
- **Example**: `PORT=8000`

**NODE_ENV**
- **Value**: `development`, `production`, `staging`
- **Purpose**: Determines server behavior, logging level, and optimizations
- **Impact**: Set to `production` for deployment
- **Default**: `development`

#### Database Configuration

**MONGODB_URI**
- **Local Development**: `mongodb://localhost:27017/campus_placement`
- **MongoDB Atlas Cloud**: `mongodb+srv://username:password@cluster.mongodb.net/campus_placement?retryWrites=true&w=majority`
- **Purpose**: Connection string for MongoDB database
- **Format**: Follow MongoDB URI scheme
- **Important**: Change password if using MongoDB Atlas

#### JWT Configuration

**JWT_SECRET**
- **Value**: Minimum 32 character random string
- **Purpose**: Secret key for signing JWT tokens
- **Security**: Change in production, use strong random values
- **Generation**: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- **Example**: `abc123def456ghi789jkl012mno345pqr678stu901`

**JWT_EXPIRE**
- **Value**: `7d`, `24h`, `30m` (use node-style duration)
- **Purpose**: How long JWT tokens remain valid
- **Default**: `7d` (7 days)
- **Impact**: Shorter = more security, longer = better UX

#### CORS Configuration

**CORS_ORIGIN**
- **Development**: `http://localhost:3000`
- **Production**: `https://yourdomain.com`
- **Purpose**: Allow frontend to communicate with backend
- **Multiple Origins**: Use comma-separated values
- **Example**: `http://localhost:3000,https://example.com`

#### Email Configuration (Optional)

**SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD**
- **Purpose**: For sending emails (password resets, notifications)
- **Provider**: Gmail, SendGrid, AWS SES, etc.
- **Gmail Setup**: 
  1. Enable 2-factor authentication
  2. Generate app-specific password
  3. Use app password in SMTP_PASSWORD
- **Status**: Not implemented in this version, ready for future enhancement

#### File Upload Configuration (Optional)

**MAX_FILE_SIZE**
- **Value**: In bytes (5242880 = 5MB)
- **Purpose**: Maximum file size for uploads
- **Default**: 5MB

**UPLOAD_PATH**
- **Value**: Directory path for uploads
- **Purpose**: Where to store uploaded files
- **Example**: `./public/uploads`, `/var/uploads`

---

### Frontend Variables

#### API Configuration

**REACT_APP_API_URL**
- **Development**: `http://localhost:5000/api`
- **Production**: `https://api.yourdomain.com`
- **Purpose**: Base URL for all API calls
- **Usage**: Configured in api.js service
- **Important**: Must match backend server location

#### Application Configuration

**REACT_APP_ENV**
- **Value**: `development`, `production`
- **Purpose**: Conditional features/logging
- **Default**: Matches NODE_ENV unless overridden

---

## Environment Setup by Scenario

### Scenario 1: Local Development with Local MongoDB

**Backend .env:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/campus_placement
JWT_SECRET=local_dev_key_at_least_32_chars_long_xyz123
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

**Frontend .env:**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

**Prerequisites:**
- MongoDB running locally
- Node.js v14+ installed
- Ports 5000 and 3000 available

---

### Scenario 2: Local Development with MongoDB Atlas

**Backend .env:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://user123:SecurePass456!@cluster0.abc123.mongodb.net/campus_placement?retryWrites=true&w=majority
JWT_SECRET=dev_key_min_32_chars_for_development_use_xyz
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

**Frontend .env:**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

**Setup Instructions:**
1. Create MongoDB Atlas account (free tier available)
2. Create cluster and database
3. Add user with password
4. Get connection string from Atlas dashboard
5. Replace user:password with actual credentials
6. Add `?retryWrites=true&w=majority` to connection string

---

### Scenario 3: Production Deployment (Heroku + MongoDB Atlas)

**Backend .env:**
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://produser:ProdSecurePass789!@cluster1.def456.mongodb.net/campus_placement?retryWrites=true&w=majority
JWT_SECRET=generate_using_crypto_32chars_minimum_for_security_abcdef123456
JWT_EXPIRE=7d
CORS_ORIGIN=https://your-frontend-domain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@yourdomain.com
SMTP_PASSWORD=gmail_app_password_xyz
```

**Frontend .env:**
```env
REACT_APP_API_URL=https://your-backend-api.herokuapp.com
REACT_APP_ENV=production
```

**Security Notes:**
- Use strong JWT_SECRET
- Enable HTTPS
- Use environment variables in deployment platform
- Never commit .env to git
- Use separate credentials for production

---

### Scenario 4: Docker Deployment

**Backend .env:**
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb://mongo:27017/campus_placement
JWT_SECRET=docker_deployment_secret_key_min_32_characters
JWT_EXPIRE=7d
CORS_ORIGIN=http://app:3000
```

**Frontend .env:**
```env
REACT_APP_API_URL=http://backend:5000/api
REACT_APP_ENV=production
```

**Docker Compose Setup:**
```yaml
version: '3.8'
services:
  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: campus_placement

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/campus_placement
      - JWT_SECRET=docker_secret_key
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://backend:5000/api
    depends_on:
      - backend
```

---

## Common Configuration Issues & Solutions

### Issue 1: Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions**:
1. Change PORT in .env: `PORT=5001`
2. Kill process using port:
   ```bash
   # macOS/Linux
   lsof -i :5000
   kill -9 <PID>
   
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```
3. Use different port temporarily

---

### Issue 2: MongoDB Connection Error

**Error**: `MongooseError: Cannot connect to MongoDB`

**Solutions**:
1. Check MongoDB is running:
   ```bash
   # macOS (if installed via Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```
2. Verify connection string in .env
3. If using MongoDB Atlas:
   - Check IP whitelist (add 0.0.0.0/0 for development)
   - Verify username/password in URI
   - Check cluster status on Atlas dashboard

---

### Issue 3: CORS Error in Frontend

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:
1. Verify CORS_ORIGIN matches frontend URL in .env
2. Restart backend after changing CORS_ORIGIN
3. Check frontend .env REACT_APP_API_URL matches backend URL
4. Clear browser cache (Ctrl+Shift+Delete)

---

### Issue 4: JWT Token Invalid/Expired

**Error**: `JsonWebTokenError: invalid token` or `TokenExpiredError`

**Solutions**:
1. Verify JWT_SECRET is same in .env and .env.example
2. Check token expiry: `JWT_EXPIRE=7d` or longer
3. Clear browser localStorage: `localStorage.clear()`
4. Log in again to get fresh token
5. In development, use longer expiry for testing

---

### Issue 5: API URL Mismatch

**Error**: `Network Error` or `Cannot GET /api/auth/login`

**Solutions**:
1. Verify frontend .env:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```
2. Verify backend PORT in .env:
   ```env
   PORT=5000
   ```
3. Check both URLs match (no trailing slashes in api.js)
4. Restart frontend: `npm start`

---

## Environment Variable Validation

### Backend Validation Checklist

```bash
# In backend directory
cat .env | grep -E "PORT|NODE_ENV|MONGODB_URI|JWT_SECRET"
```

Should output:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/campus_placement
JWT_SECRET=<32+ char key>
```

### Frontend Validation Checklist

```bash
# In frontend directory
cat .env | grep -E "REACT_APP_API_URL|REACT_APP_ENV"
```

Should output:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

---

## Generating Secure JWT Secret

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL (macOS/Linux)
openssl rand -hex 32

# Python
python3 -c "import secrets; print(secrets.token_hex(32))"

# Online Tool (not recommended for production)
# https://generate-random.org/encryption-key-generator
```

Example output: `a3f8d9e2c1b7f4a6e9c3d8f1b4a7e2c5f8a1d4e7b0c3f6a9d2e5f8c1b4a7e0`

---

## Production Checklist

- [ ] Change JWT_SECRET to secure random value
- [ ] Set NODE_ENV=production
- [ ] Use production database URI (MongoDB Atlas recommended)
- [ ] Update CORS_ORIGIN to frontend domain
- [ ] Configure SMTP for email (if needed)
- [ ] Set MAX_FILE_SIZE appropriately
- [ ] Use HTTPS in CORS_ORIGIN
- [ ] Store .env in deployment platform secrets (not in git)
- [ ] Set up environment variables in deployment platform UI
- [ ] Test API connectivity from production frontend
- [ ] Enable database backups
- [ ] Set up monitoring and logging
- [ ] Review security best practices

---

## Security Best Practices

1. **Never commit .env to Git**
   ```bash
   echo ".env" >> .gitignore
   echo ".env.local" >> .gitignore
   ```

2. **Use strong JWT_SECRET**
   - Minimum 32 characters
   - Use cryptographically secure random generation
   - Unique per environment

3. **Change credentials regularly**
   - Rotate JWT_SECRET periodically
   - Update database password regularly
   - Review access logs

4. **Limit CORS origins**
   - Never use `*` in production
   - Only allow specific frontend domains
   - Use HTTPS in production

5. **Use MongoDB Atlas features**
   - Enable encryption at rest
   - Use VPC for network isolation
   - Configure IP whitelist
   - Enable audit logging

6. **API Security**
   - Use HTTPS in production
   - Implement rate limiting
   - Add request validation
   - Use secure headers (Helmet.js)

---

## Testing Environment Configuration

For automated testing:

**test.env:**
```env
PORT=5001
NODE_ENV=test
MONGODB_URI=mongodb://localhost:27017/campus_placement_test
JWT_SECRET=test_key_not_for_production_xyz
JWT_EXPIRE=1h
CORS_ORIGIN=http://localhost:3001
```

Load in tests:
```javascript
require('dotenv').config({ path: '.env.test' });
```

---

## Troubleshooting Guide

| Issue | Cause | Solution |
|-------|-------|----------|
| "Cannot find .env" | File doesn't exist | Create .env with required variables |
| "Invalid MONGODB_URI" | Wrong connection string | Check URI format and credentials |
| "JWT_SECRET too short" | Less than 32 chars | Generate new secret with secure random |
| "CORS blocked" | Origin mismatch | Verify frontend URL in CORS_ORIGIN |
| "Port already in use" | Port occupied | Change PORT or kill process |
| "API not found" | Wrong API_URL | Match REACT_APP_API_URL to backend |

---

## Next Steps

1. **Create .env files** in both backend and frontend directories
2. **Start MongoDB** if using local database
3. **Run backend**: `npm run dev` in backend directory
4. **Run frontend**: `npm start` in frontend directory
5. **Verify connection**: Check browser console and terminal for errors
6. **Test login**: Use demo credentials from README.md

For detailed setup instructions, see SETUP_GUIDE.md
