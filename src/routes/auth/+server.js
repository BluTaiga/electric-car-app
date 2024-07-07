// routes/auth/+server.js
import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { User, connectDB } from '$lib/db';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function POST({ request }) {
  await connectDB();

  const { username, password } = await request.json();
  
  let user = await User.findOne({ username });

  if (!user) {
    // If the user doesn't exist and it's the first user, create an admin account
    const isFirstUser = await User.countDocuments() === 0;
    if (isFirstUser) {
      user = new User({ username, password, role: 'admin' });
      await user.save();
    } else {
      return json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } else {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return json({ error: 'Invalid credentials' }, { status: 401 });
    }
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: '7d' }
  );

  return json(
    { success: true, user: { username: user.username, role: user.role } },
    {
      headers: {
        'Set-Cookie': `sessionToken=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}` // 1 week
      }
    }
  );
}

export async function DELETE() {
  return json(
    { success: true },
    {
      headers: {
        'Set-Cookie': 'sessionToken=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0'
      }
    }
  );
}
