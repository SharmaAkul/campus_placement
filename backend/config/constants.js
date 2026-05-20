// User Roles
const ROLES = {
  STUDENT: 'student',
  COMPANY: 'company',
  ADMIN: 'admin'
};

// Interview Status
const INTERVIEW_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  PENDING: 'pending'
};

// Placement Status
const PLACEMENT_STATUS = {
  NOT_PLACED: 'not_placed',
  PLACED: 'placed',
  OFFER_RECEIVED: 'offer_received'
};

// Interview Mode
const INTERVIEW_MODE = {
  ONLINE: 'online',
  OFFLINE: 'offline'
};

module.exports = {
  ROLES,
  INTERVIEW_STATUS,
  PLACEMENT_STATUS,
  INTERVIEW_MODE
};
