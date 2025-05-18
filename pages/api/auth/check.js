export default function handler(req, res) {
  // For now, we'll just return a mock response
  // In a real application, you would check the session/token here
  res.status(200).json({ isAuthenticated: false });
} 