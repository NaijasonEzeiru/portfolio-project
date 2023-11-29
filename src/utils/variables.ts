export const apiAddress =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://babaloja-api.onrender.com';

console.log(process.env.NODE_ENV);
