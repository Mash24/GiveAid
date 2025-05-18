export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // For now, we'll just return a mock response
    // In a real application, you would validate credentials against a database
    if (email && password) {
      return res.status(200).json({ 
        isAuthenticated: true,
        user: {
          id: '1',
          name: 'Test User',
          email: email
        }
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 