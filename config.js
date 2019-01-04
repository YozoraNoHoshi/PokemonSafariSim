const SECRET_KEY = process.env.SECRET_KEY || 'pokerap-gotta-catch-em-all';
const BCRYPT_WORK_ROUNDS = 12;
const POKE_API_URL = 'https://pokeapi.co/api/v2';

module.exports = {
  SECRET_KEY,
  BCRYPT_WORK_ROUNDS,
  POKE_API_URL
};
