require('dotenv').config();
const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Hash password with bcrypt
  const hashedPassword = await bcrypt.hash(
    process.env.DEFAULT_ADMIN_PASSWORD,
    parseInt(process.env.BCRYPT_SALT_ROUNDS)
  );

  // Inserts seed entries
  await knex('users').insert([
    {
      name: 'Administrator',
      email: process.env.DEFAULT_ADMIN_EMAIL,
      password: hashedPassword,
      photo: null,
      is_first_login: false
    }
  ]);
};
