import { sendEmail } from '../../../lib/email';
import { prisma } from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Save support request to database
    await prisma.supportRequest.create({
      data: {
        name,
        email,
        subject,
        message,
        status: 'PENDING',
      },
    });

    // Send notification email to support team
    await sendEmail({
      to: process.env.SUPPORT_EMAIL,
      subject: `New Support Request: ${subject}`,
      html: `
        <h2>New Support Request</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'Support Request Received',
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for contacting our support team. We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p>Best regards,<br>The Support Team</p>
      `,
    });

    return res.status(200).json({ message: 'Your message has been sent successfully' });
  } catch (error) {
    console.error('Contact support error:', error);
    return res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
} 