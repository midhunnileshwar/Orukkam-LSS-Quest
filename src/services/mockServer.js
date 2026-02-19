// Mock User Database
const USERS = [
  {
    username: 'student',
    password: '123',
    name: 'Midhun',
    role: 'student',
    avatar: 'boy',
    isNew: false,
  },
  { username: 'newuser', password: '123', name: '', role: 'student', avatar: '', isNew: true },
  {
    username: 'teacher',
    password: 'admin',
    name: 'Reshmi Teacher',
    role: 'teacher',
    avatar: 'girl',
    isNew: false,
  },
];

// Mock Activity Log (In-Memory)
const ACTIVITY_LOG = [];

export const mockServer = {
  /**
   * Simulates a server login request
   * @param {string} username
   * @param {string} password
   * @returns {Promise<{success: boolean, user?: object, message?: string}>}
   */
  login: async (username, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = USERS.find(
          (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
        );

        if (user) {
          mockServer.logActivity('LOGIN_SUCCESS', { username: user.username });
          resolve({
            success: true,
            user: { name: user.name, role: user.role, avatar: user.avatar },
          });
        } else {
          mockServer.logActivity('LOGIN_FAILED', { username, attempt: password });
          resolve({ success: false, message: 'Incorrect Username or Password' });
        }
      }, 800); // Simulate network delay
    });
  },

  /**
   * Simulates sending an OTP to a phone number
   * @param {string} phoneNumber
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  loginWithPhone: async (phoneNumber) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (phoneNumber.length >= 10) {
          mockServer.logActivity('OTP_SENT', { phone: phoneNumber });
          // Store OTP temporarily if needed, but for mock we'll just accept '1234'
          resolve({ success: true, message: 'OTP Sent successfully' });
        } else {
          resolve({ success: false, message: 'Invalid Phone Number' });
        }
      }, 500);
    });
  },

  /**
   * Verifies the OTP
   * @param {string} phoneNumber
   * @param {string} otp
   * @returns {Promise<{success: boolean, user?: object, message?: string}>}
   */
  verifyOtp: async (phoneNumber, otp) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (otp === '1234') {
          // Check if this phone number exists in "DB", else create a new user mock
          // For demo, we'll treat ending in '9' as new user
          const isNew = phoneNumber.endsWith('9');
          const user = {
            name: isNew ? '' : 'Phone User',
            role: 'student',
            avatar: isNew ? '' : 'tiger',
            isNew: isNew,
          };

          mockServer.logActivity('LOGIN_SUCCESS_PHONE', { phone: phoneNumber });
          resolve({ success: true, user });
        } else {
          resolve({ success: false, message: 'Invalid OTP' });
        }
      }, 800);
    });
  },

  /**
   * Logs activity to the "Server"
   * @param {string} action
   * @param {object} details
   */
  logActivity: (action, details) => {
    const entry = {
      timestamp: new Date().toISOString(),
      action,
      details,
    };
    ACTIVITY_LOG.push(entry);
    console.log('[SERVER LOG]:', entry);
  },

  /**
   * Returns the current activity log
   */
  getLogs: () => [...ACTIVITY_LOG],
};
