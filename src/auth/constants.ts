import 'dotenv/config';

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expirationTime: '28800s',
};
