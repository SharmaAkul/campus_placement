const generateToken = (id, role) => {
  const jwt = require('jsonwebtoken');
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const calculateProfileCompletion = (student) => {
  let completedFields = 0;
  const totalFields = 8;

  if (student.phone) completedFields++;
  if (student.department) completedFields++;
  if (student.graduationYear) completedFields++;
  if (student.cgpa) completedFields++;
  if (student.skills && student.skills.length > 0) completedFields++;
  if (student.resumeLink) completedFields++;
  if (student.enrollmentNumber) completedFields++;

  return Math.round((completedFields / totalFields) * 100);
};

module.exports = {
  generateToken,
  calculateProfileCompletion,
};
