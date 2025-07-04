const jwt = require('jsonwebtoken');
require('dotenv').config();

const user = {
  userId: 'bc0f77cf-82a2-4664-a4b9-35d88ed0fbf3',
  email: 'test@test.com'
};

const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '5h' });

console.log('Your JWT token:');
console.log(token);
