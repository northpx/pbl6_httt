const bcrypt = require('bcrypt');

function calculateExpiryDate(days, hours, minutes) {
  // Get the current date and time
  const now = new Date();

  // Calculate the expiry duration in milliseconds
  const expiryDurationInSeconds =
    days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60;

  // Calculate the expiry date in seconds
  const expiryInSeconds = Math.floor(
    now.getTime() / 1000 + expiryDurationInSeconds
  );

  return expiryInSeconds;
}

const data = {
  users: [
    {
      name: 'Hai',
      email: 'hai@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      role: 'admin',
    },
    {
      name: 'Ban',
      email: 'ban@gmail.com',
      password: bcrypt.hashSync('123456', 10),
      role: 'shop',
    },
  ],
};

module.exports = data;
