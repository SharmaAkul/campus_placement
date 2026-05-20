const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Student = require('../models/Student');
const Company = require('../models/Company');
const Job = require('../models/Job');
const AptitudeQuestion = require('../models/AptitudeQuestion');
const Interview = require('../models/Interview');
const Result = require('../models/Result');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Student.deleteMany({});
    await Company.deleteMany({});
    await Job.deleteMany({});
    await AptitudeQuestion.deleteMany({});
    await Interview.deleteMany({});
    await Result.deleteMany({});

    console.log('Cleared existing data');

    // Create Student Users and Profiles
    const studentUsers = [];
    const studentProfiles = [];

    const studentData = [
      {
        name: 'Aarav Singh',
        email: 'aarav.singh@gmail.com',
        enrollmentNumber: 'CSE2021001',
        phone: '9876543210',
        department: 'CSE',
        graduationYear: 2025,
        cgpa: 8.5,
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      },
      {
        name: 'Priya Sharma',
        email: 'priya.sharma@gmail.com',
        enrollmentNumber: 'CSE2021002',
        phone: '9876543211',
        department: 'CSE',
        graduationYear: 2025,
        cgpa: 9.1,
        skills: ['Python', 'Django', 'PostgreSQL', 'Machine Learning'],
      },
      {
        name: 'Rahul Verma',
        email: 'rahul.verma@gmail.com',
        enrollmentNumber: 'IT2021001',
        phone: '9876543212',
        department: 'IT',
        graduationYear: 2025,
        cgpa: 7.8,
        skills: ['Java', 'Spring Boot', 'SQL', 'AWS'],
      },
      {
        name: 'Sneha Gupta',
        email: 'sneha.gupta@gmail.com',
        enrollmentNumber: 'CSE2021003',
        phone: '9876543213',
        department: 'CSE',
        graduationYear: 2025,
        cgpa: 8.9,
        skills: ['C++', 'Data Structures', 'Competitive Programming', 'Docker'],
      },
      {
        name: 'Arjun Patel',
        email: 'arjun.patel@gmail.com',
        enrollmentNumber: 'IT2021002',
        phone: '9876543214',
        department: 'IT',
        graduationYear: 2025,
        cgpa: 8.2,
        skills: ['JavaScript', 'React', 'TypeScript', 'Node.js'],
      },
      {
        name: 'Divya Nair',
        email: 'divya.nair@gmail.com',
        enrollmentNumber: 'CSE2021004',
        phone: '9876543215',
        department: 'CSE',
        graduationYear: 2025,
        cgpa: 8.7,
        skills: ['Python', 'Flask', 'MongoDB', 'Linux'],
      },
      {
        name: 'Vikram Kumar',
        email: 'vikram.kumar@gmail.com',
        enrollmentNumber: 'ECE2021001',
        phone: '9876543216',
        department: 'ECE',
        graduationYear: 2025,
        cgpa: 7.5,
        skills: ['C', 'Embedded Systems', 'FPGA', 'Arduino'],
      },
      {
        name: 'Ananya Reddy',
        email: 'ananya.reddy@gmail.com',
        enrollmentNumber: 'CSE2021005',
        phone: '9876543217',
        department: 'CSE',
        graduationYear: 2025,
        cgpa: 9.0,
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Docker'],
      },
      {
        name: 'Rohan Singh',
        email: 'rohan.singh@gmail.com',
        enrollmentNumber: 'IT2021003',
        phone: '9876543218',
        department: 'IT',
        graduationYear: 2025,
        cgpa: 8.3,
        skills: ['Java', 'SQL', 'Kubernetes', 'Cloud'],
      },
      {
        name: 'Komal Joshi',
        email: 'komal.joshi@gmail.com',
        enrollmentNumber: 'CSE2021006',
        phone: '9876543219',
        department: 'CSE',
        graduationYear: 2025,
        cgpa: 8.6,
        skills: ['Python', 'Data Science', 'TensorFlow', 'pandas'],
      },
    ];

    for (const data of studentData) {
      const user = new User({
        name: data.name,
        email: data.email,
        password: 'student123',
        role: 'student',
      });

      await user.save();
      studentUsers.push(user);

      const student = new Student({
        userId: user._id,
        enrollmentNumber: data.enrollmentNumber,
        phone: data.phone,
        department: data.department,
        graduationYear: data.graduationYear,
        cgpa: data.cgpa,
        skills: data.skills,
        resumeLink: `https://example.com/resumes/${data.enrollmentNumber}.pdf`,
        profileCompletion: 100,
      });

      await student.save();
      studentProfiles.push(student);
    }

    console.log('Created 10 students');

    // Create Company Users and Profiles
    const companyUsers = [];
    const companyProfiles = [];

    const companyData = [
      {
        name: 'Tech Solutions India',
        companyName: 'Tech Solutions India',
        website: 'https://techsolutions.com',
        description: 'Leading software development company',
        location: 'Bangalore',
        hrEmail: 'hr@techsolutions.com',
        hrPhone: '08040123456',
      },
      {
        name: 'Digital Innovations Ltd',
        companyName: 'Digital Innovations Ltd',
        website: 'https://digitalinnovations.com',
        description: 'AI and ML focused company',
        location: 'Pune',
        hrEmail: 'hr@digitalinnovations.com',
        hrPhone: '02012345678',
      },
      {
        name: 'Cloud Architects Inc',
        companyName: 'Cloud Architects Inc',
        website: 'https://cloudarchitects.com',
        description: 'Cloud infrastructure solutions',
        location: 'Delhi',
        hrEmail: 'hr@cloudarchitects.com',
        hrPhone: '01140123456',
      },
      {
        name: 'Data Dynamics Solutions',
        companyName: 'Data Dynamics Solutions',
        website: 'https://datadynamics.com',
        description: 'Big data analytics company',
        location: 'Mumbai',
        hrEmail: 'hr@datadynamics.com',
        hrPhone: '02240123456',
      },
      {
        name: 'Web Masters Global',
        companyName: 'Web Masters Global',
        website: 'https://webmasters.com',
        description: 'Web development and design',
        location: 'Hyderabad',
        hrEmail: 'hr@webmasters.com',
        hrPhone: '04012345678',
      },
    ];

    for (const data of companyData) {
      const user = new User({
        name: data.name,
        email: `hr@${data.name.toLowerCase().replace(/\s+/g, '')}com`,
        password: 'company123',
        role: 'company',
      });

      await user.save();
      companyUsers.push(user);

      const company = new Company({
        userId: user._id,
        companyName: data.companyName,
        website: data.website,
        description: data.description,
        location: data.location,
        hrEmail: data.hrEmail,
        hrPhone: data.hrPhone,
        isVerified: true,
      });

      await company.save();
      companyProfiles.push(company);
    }

    console.log('Created 5 companies');

    // Create Job Openings
    const jobData = [
      {
        companyIndex: 0,
        jobTitle: 'Full Stack Developer',
        description: 'We are looking for an experienced full stack developer',
        package: 12,
        location: 'Bangalore',
        department: ['CSE', 'IT'],
        minCGPA: 7.5,
        maxCGPA: 10,
        requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        interviewDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        interviewMode: 'online',
      },
      {
        companyIndex: 1,
        jobTitle: 'Machine Learning Engineer',
        description: 'Join our AI team as a Machine Learning Engineer',
        package: 14,
        location: 'Pune',
        department: ['CSE'],
        minCGPA: 8.0,
        maxCGPA: 10,
        requiredSkills: ['Python', 'TensorFlow', 'Machine Learning', 'Data Science'],
        interviewDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        interviewMode: 'online',
      },
      {
        companyIndex: 2,
        jobTitle: 'DevOps Engineer',
        description: 'Looking for DevOps professionals',
        package: 13,
        location: 'Delhi',
        department: ['IT', 'CSE'],
        minCGPA: 7.0,
        maxCGPA: 10,
        requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'Linux'],
        interviewDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        interviewMode: 'offline',
      },
      {
        companyIndex: 3,
        jobTitle: 'Data Analyst',
        description: 'Big data analytics role',
        package: 11,
        location: 'Mumbai',
        department: ['CSE', 'IT'],
        minCGPA: 7.5,
        maxCGPA: 10,
        requiredSkills: ['Python', 'SQL', 'Data Analysis', 'Tableau'],
        interviewDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        interviewMode: 'online',
      },
      {
        companyIndex: 4,
        jobTitle: 'Frontend Developer',
        description: 'UI/UX focused frontend role',
        package: 10,
        location: 'Hyderabad',
        department: ['CSE', 'IT'],
        minCGPA: 7.0,
        maxCGPA: 10,
        requiredSkills: ['JavaScript', 'React', 'CSS', 'HTML'],
        interviewDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        interviewMode: 'online',
      },
    ];

    const jobs = [];
    for (const data of jobData) {
      const job = new Job({
        companyId: companyProfiles[data.companyIndex]._id,
        jobTitle: data.jobTitle,
        description: data.description,
        package: data.package,
        location: data.location,
        department: data.department,
        minCGPA: data.minCGPA,
        maxCGPA: data.maxCGPA,
        requiredSkills: data.requiredSkills,
        interviewDate: data.interviewDate,
        interviewMode: data.interviewMode,
        applicants: [],
      });

      await job.save();
      jobs.push(job);
    }

    console.log('Created 5 job postings');

    // Create Aptitude Questions
    const questions = [
      {
        question: 'If 2x + 3 = 11, what is the value of x?',
        category: 'quantitative',
        options: [
          { text: '3', isCorrect: false },
          { text: '4', isCorrect: true },
          { text: '5', isCorrect: false },
          { text: '6', isCorrect: false },
        ],
        explanation: '2x + 3 = 11 => 2x = 8 => x = 4',
        difficulty: 'easy',
      },
      {
        question: 'What is the next number in the sequence: 2, 4, 8, 16, ?',
        category: 'logical',
        options: [
          { text: '24', isCorrect: false },
          { text: '32', isCorrect: true },
          { text: '28', isCorrect: false },
          { text: '20', isCorrect: false },
        ],
        explanation: 'Each number is double the previous number',
        difficulty: 'easy',
      },
      {
        question: 'If A and B are opposite angles in a parallelogram, and A = 60°, what is B?',
        category: 'quantitative',
        options: [
          { text: '60°', isCorrect: true },
          { text: '120°', isCorrect: false },
          { text: '90°', isCorrect: false },
          { text: '180°', isCorrect: false },
        ],
        explanation: 'Opposite angles in a parallelogram are equal',
        difficulty: 'medium',
      },
      {
        question: 'What is the synonym of "Meager"?',
        category: 'verbal',
        options: [
          { text: 'Abundant', isCorrect: false },
          { text: 'Scarce', isCorrect: true },
          { text: 'Generous', isCorrect: false },
          { text: 'Plentiful', isCorrect: false },
        ],
        explanation: 'Meager means lacking in quality or quantity, which is similar to scarce',
        difficulty: 'medium',
      },
      {
        question: 'If a train travels at 60 km/h for 2 hours, how far does it travel?',
        category: 'quantitative',
        options: [
          { text: '60 km', isCorrect: false },
          { text: '120 km', isCorrect: true },
          { text: '100 km', isCorrect: false },
          { text: '150 km', isCorrect: false },
        ],
        explanation: 'Distance = Speed × Time = 60 × 2 = 120 km',
        difficulty: 'easy',
      },
      {
        question: 'What is the antonym of "Ephemeral"?',
        category: 'verbal',
        options: [
          { text: 'Temporary', isCorrect: false },
          { text: 'Permanent', isCorrect: true },
          { text: 'Short', isCorrect: false },
          { text: 'Passing', isCorrect: false },
        ],
        explanation: 'Ephemeral means lasting for a short time, so permanent is the antonym',
        difficulty: 'medium',
      },
      {
        question: 'Find the missing number: 3, 6, 12, 24, ?',
        category: 'logical',
        options: [
          { text: '36', isCorrect: false },
          { text: '48', isCorrect: true },
          { text: '40', isCorrect: false },
          { text: '45', isCorrect: false },
        ],
        explanation: 'Each number is double the previous number',
        difficulty: 'easy',
      },
      {
        question: 'If the area of a square is 64 sq. units, what is its side?',
        category: 'quantitative',
        options: [
          { text: '8 units', isCorrect: true },
          { text: '16 units', isCorrect: false },
          { text: '4 units', isCorrect: false },
          { text: '10 units', isCorrect: false },
        ],
        explanation: 'Area = side² => 64 = side² => side = 8',
        difficulty: 'easy',
      },
      {
        question: 'What does the word "Perspicacious" mean?',
        category: 'verbal',
        options: [
          { text: 'Showing poor judgment', isCorrect: false },
          { text: 'Having keen insight', isCorrect: true },
          { text: 'Being transparent', isCorrect: false },
          { text: 'Showing perspective', isCorrect: false },
        ],
        explanation: 'Perspicacious means having a keen understanding or insight',
        difficulty: 'hard',
      },
      {
        question: 'If 30% of a number is 90, what is the number?',
        category: 'quantitative',
        options: [
          { text: '200', isCorrect: false },
          { text: '300', isCorrect: true },
          { text: '270', isCorrect: false },
          { text: '100', isCorrect: false },
        ],
        explanation: '30% of x = 90 => 0.3x = 90 => x = 300',
        difficulty: 'medium',
      },
    ];

    await AptitudeQuestion.insertMany(questions);
    console.log('Created 10 aptitude questions');

    // Create Interviews
    const interviews = [];
    for (let i = 0; i < 5; i++) {
      const interview = new Interview({
        studentId: studentProfiles[i]._id,
        companyId: companyProfiles[i % 5]._id,
        jobId: jobs[i]._id,
        interviewDate: jobs[i].interviewDate,
        interviewTime: '10:00 AM',
        interviewMode: jobs[i].interviewMode,
        meetingLink: jobs[i].interviewMode === 'online' ? 'https://zoom.us/j/123456' : null,
        location: jobs[i].interviewMode === 'offline' ? jobs[i].location : null,
        status: 'scheduled',
      });

      await interview.save();
      interviews.push(interview);
    }

    console.log('Created 5 interviews');

    // Create Results
    const resultData = [
      {
        studentIndex: 0,
        companyIndex: 0,
        jobIndex: 0,
        package: 12,
        offerStatus: 'selected',
      },
      {
        studentIndex: 1,
        companyIndex: 1,
        jobIndex: 1,
        package: 14,
        offerStatus: 'selected',
      },
      {
        studentIndex: 2,
        companyIndex: 2,
        jobIndex: 2,
        package: 13,
        offerStatus: 'pending',
      },
    ];

    for (const data of resultData) {
      const result = new Result({
        studentId: studentProfiles[data.studentIndex]._id,
        companyId: companyProfiles[data.companyIndex]._id,
        jobId: jobs[data.jobIndex]._id,
        package: data.package,
        offerStatus: data.offerStatus,
      });

      await result.save();

      // Update student if selected
      if (data.offerStatus === 'selected') {
        await Student.findByIdAndUpdate(
          studentProfiles[data.studentIndex]._id,
          {
            placementStatus: 'placed',
            placedCompany: companyProfiles[data.companyIndex]._id,
            package: data.package,
          }
        );
      }
    }

    console.log('Created results and updated placement status');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
