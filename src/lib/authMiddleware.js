import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function authMiddleware({ request }) {
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.sessionToken;

  console.log('Auth middleware - Token:', token); // Debug log

  if (!token) {
    console.log('Auth middleware - No token found'); // Debug log
    return { authenticated: false, user: null };
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Auth middleware - Decoded token:', decoded); // Debug log
    return { authenticated: true, user: decoded };
  } catch (error) {
    console.error('Token verification failed:', error);
    return { authenticated: false, user: null };
  }
}