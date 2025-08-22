import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Hardcoded credentials for demonstration purposes
    if (email === 'admin@example.com' && password === 'adminpassword') {
      // In a real application, you would generate a JWT or set a session cookie here
      res.status(200).json({ message: 'Login successful', token: 'fake-jwt-token' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
