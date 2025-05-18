export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // In a real application, you would clear the user's session or token (e.g., by clearing a cookie or invalidating a JWT).
    // For this mock implementation, we'll just return a success message.

    // Example: Clear a cookie (if using cookie-based sessions)
    // res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0');

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 