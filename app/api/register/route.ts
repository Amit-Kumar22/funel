import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import nodemailer from 'nodemailer';

/**
 * POST /api/register
 * Handles user registration and stores data in MongoDB
 */
export async function POST(request: Request) {
  try {
    // Connect to database
    await dbConnect();

    // Parse request body
    const body = await request.json();
    const { name, email, phone, course } = body;

    // Validate required fields
    if (!name || !email || !phone || !course) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    let user;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log('👤 User already exists, updating and resending email...');
      // Update existing user with new information
      user = await User.findOneAndUpdate(
        { email },
        {
          name,
          phone,
          course,
          paymentStatus: 'pending',
          updatedAt: new Date(),
        },
        { new: true }
      );
    } else {
      console.log('✨ Creating new user...');
      // Create new user
      user = await User.create({
        name,
        email,
        phone,
        course,
        paymentStatus: 'pending',
        emailSent: false,
      });
    }

    // Send email directly (in background for better performance)
    console.log('📧 Sending confirmation email...');
    
    // Fire-and-forget email sending
    sendConfirmationEmail(user.name, user.email, user.course, user._id.toString())
      .then((result) => {
        console.log('✅ Email sent successfully:', result);
      })
      .catch((error) => {
        console.error('❌ Error sending email:', error);
      });

    // Return immediately without waiting for email
    return NextResponse.json(
      {
        success: true,
        message: existingUser 
          ? 'Registration updated! Check your email for program details.' 
          : 'Registration successful! Check your email for program access link.',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);

    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Send confirmation email to user
 */
async function sendConfirmationEmail(name: string, email: string, course: string, userId: string) {
  try {
    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email credentials not configured');
    }

    console.log('📧 Configuring email transporter...');
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: process.env.SMTP_PORT || '587',
      user: process.env.EMAIL_USER,
    });

    // Create transporter using Hostinger SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // false for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // Accept self-signed certificates
      }
    });

    // Get payment link from environment variable
    const paymentLink = process.env.PAYMENT_LINK || 'https://nielitpatnaonline.in/hiprotech/';

    // Course display name
    const courseNames: { [key: string]: string } = {
      'online-only': '30-Day Online Robotics & Drones Training',
      'online-bootcamp': '30-Day Online + 3-Day Hands-on Workshop at NIELIT Patna',
      'bootcamp-only': '3-Day Hands-on Workshop Only (at NIELIT Patna)',
    };
    const courseName = courseNames[course] || course;

    // Email HTML template
    const emailHTML = generateEmailHTML(name, email, courseName, paymentLink);

    // Email options
    const mailOptions = {
      from: {
        name: 'HiProTech - NIELIT Patna',
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: '🎉 Welcome to HiProTech - Robotics & Drones Training Registration Confirmed',
      html: emailHTML,
      text: generateEmailText(name, email, courseName, paymentLink),
    };

    // Send email
    console.log('📤 Sending email to:', email);
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully:', info.messageId);
    console.log('Email accepted:', info.accepted);

    // Update user to mark email as sent
    try {
      await dbConnect();
      await User.findByIdAndUpdate(userId, { emailSent: true });
      console.log('✅ User updated with emailSent flag');
    } catch (dbError) {
      console.error('⚠️ Failed to update emailSent flag:', dbError);
    }

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: any) {
    console.error('❌ Error sending email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
    });
    throw error;
  }
}

/**
 * Generate email HTML template
 */
function generateEmailHTML(name: string, email: string, courseName: string, paymentLink: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to HiProTech - Registration Confirmed</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.8;
      color: #333333;
      max-width: 650px;
      margin: 0 auto;
      padding: 0;
      background-color: #f4f7fa;
    }
    .email-container {
      background-color: #ffffff;
      margin: 20px auto;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    .header {
      background: linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%);
      color: #ffffff;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .header p {
      margin: 0;
      font-size: 16px;
      opacity: 0.95;
    }
    .content {
      padding: 40px 35px;
      background-color: #ffffff;
    }
    .greeting {
      font-size: 18px;
      color: #1f2937;
      margin-bottom: 20px;
    }
    .greeting strong {
      color: #ea580c;
      font-size: 20px;
    }
    .message {
      font-size: 16px;
      color: #4b5563;
      margin-bottom: 25px;
      line-height: 1.8;
    }
    .cta-button {
      display: inline-block;
      padding: 18px 45px;
      background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 50px;
      margin: 30px 0;
      font-weight: 700;
      font-size: 17px;
      box-shadow: 0 6px 20px rgba(234, 88, 12, 0.3);
      transition: all 0.3s ease;
      text-align: center;
    }
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(234, 88, 12, 0.4);
    }
    .link-highlight {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      padding: 20px 30px;
      border: 3px solid #f59e0b;
      border-radius: 12px;
      margin: 25px 0;
      text-align: center;
      box-shadow: 0 4px 15px rgba(245, 158, 11, 0.2);
    }
    .link-highlight p {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: #92400e;
    }
    .link-highlight a {
      color: #ea580c;
      font-size: 24px;
      font-weight: 800;
      text-decoration: none;
      letter-spacing: 0.5px;
    }
    .link-highlight a:hover {
      text-decoration: underline;
    }
    .info-box {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      padding: 25px;
      border-left: 5px solid #f59e0b;
      margin: 25px 0;
      border-radius: 8px;
    }
    .info-box h3 {
      margin: 0 0 15px 0;
      color: #92400e;
      font-size: 18px;
    }
    .info-box p, .info-box ul {
      color: #78350f;
      margin: 10px 0;
      font-size: 15px;
    }
    .info-box ul {
      padding-left: 20px;
    }
    .info-box li {
      margin: 8px 0;
    }
    .course-badge {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: #ffffff;
      padding: 15px 20px;
      border-radius: 8px;
      margin: 20px 0;
      text-align: center;
    }
    .course-badge h3 {
      margin: 0 0 8px 0;
      font-size: 16px;
      opacity: 0.9;
    }
    .course-badge p {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
    }
    .divider {
      height: 2px;
      background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
      margin: 30px 0;
    }
    .important-note {
      background-color: #fef2f2;
      border-left: 5px solid #ef4444;
      padding: 20px;
      margin: 25px 0;
      border-radius: 8px;
    }
    .important-note h4 {
      margin: 0 0 12px 0;
      color: #991b1b;
      font-size: 17px;
    }
    .important-note ul {
      margin: 0;
      padding-left: 20px;
      color: #7f1d1d;
    }
    .important-note li {
      margin: 8px 0;
      font-size: 14px;
    }
    .footer {
      background-color: #f9fafb;
      padding: 30px 35px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      margin: 8px 0;
      font-size: 13px;
      color: #6b7280;
      line-height: 1.6;
    }
    .footer strong {
      color: #374151;
      font-size: 14px;
    }
    .signature {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: left;
    }
    .signature p {
      margin: 5px 0;
      color: #374151;
    }
    .signature strong {
      color: #ea580c;
      font-size: 17px;
    }
    .signature small {
      color: #6b7280;
      font-size: 13px;
    }
    @media only screen and (max-width: 600px) {
      .content, .footer {
        padding: 25px 20px;
      }
      .header h1 {
        font-size: 24px;
      }
      .cta-button {
        padding: 15px 35px;
        font-size: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>🎉 Welcome to HiProTech!</h1>
      <p>Your Registration Has Been Confirmed Successfully</p>
    </div>
    
    <div class="content">
      <p class="greeting">Dear <strong>${name}</strong>,</p>
      
      <p class="message">
        Congratulations and welcome to HiProTech - Advanced Robotics & Drones Training program in collaboration with NIELIT Patna! 
        We are thrilled to have you join our community of learners and future robotics & drone technology professionals.
      </p>
      
      <p class="message">
        Your registration has been successfully received. We are excited to embark on this transformative learning journey with you. 
        This program will equip you with cutting-edge skills in robotics, drone technology, automation, and practical hands-on experience.
      </p>
      
      <div class="course-badge">
        <h3>📚 Your Selected Program</h3>
        <p>${courseName}</p>
      </div>
      
      <div class="info-box">
        <h3>✨ Next Steps to Get Started</h3>
        <ul>
          <li><strong>Step 1:</strong> Click the button below to access the program portal and complete your enrollment</li>
          <li><strong>Step 2:</strong> Review the program curriculum and schedule</li>
          <li><strong>Step 3:</strong> Complete the payment process to secure your seat</li>
          <li><strong>Step 4:</strong> Get access to the learning platform and course materials</li>
        </ul>
      </div>
      
      <center>
        <a href="${paymentLink}" class="cta-button">
          🎓 Access Program Portal & Continue
        </a>
      </center>
      
      <div class="link-highlight">
        <p>🔗 Program Portal Link:</p>
        <a href="${paymentLink}" target="_blank">nielitpatnaonline.in/hiprotech</a>
      </div>
      
      <div class="divider"></div>
      
      <div class="info-box">
        <h3>🎯 What You'll Gain From This Program</h3>
        <ul>
          <li>Industry-relevant curriculum designed by NIELIT Patna experts</li>
          <li>Hands-on training with real drones and robotics kits</li>
          <li>Live interactive sessions with experienced instructors</li>
          <li>Certification from NIELIT Patna upon successful completion</li>
          <li>Practical drone flying and robotics assembly experience</li>
          <li>Career guidance in robotics and drone technology fields</li>
          <li>Access to exclusive learning resources and community</li>
        </ul>
      </div>
      
      <div class="important-note">
        <h4>⚠️ Important Information</h4>
        <ul>
          <li>Please complete your enrollment within 48 hours to confirm your seat</li>
          <li>Limited seats available - secure your spot now</li>
          <li>Keep your transaction details safe for future reference</li>
          <li>Check your email regularly for updates and course materials</li>
          <li>For any queries, contact our support team immediately</li>
        </ul>
      </div>
      
      <p class="message">
        We are committed to providing you with an exceptional learning experience. Should you have any questions or need assistance, 
        our dedicated support team is always ready to help you.
      </p>
      
      <div class="signature">
        <p>Warm regards,</p>
        <p><strong>The HiProTech Team</strong></p>
        <p><small>Advanced Robotics & Drones Training Program</small></p>
        <p><small>In Collaboration with NIELIT Patna</small></p>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>HiProTech - Excellence in Robotics & Drones Training</strong></p>
      <p>© 2025 HiProTech. All rights reserved.</p>
      <p style="margin-top: 15px;">
        This email was sent to <strong>${email}</strong> because you registered for our Robotics & Drones Training program.
      </p>
      <p>
        If you did not register for this program, please disregard this email or contact us immediately.
      </p>
      <p style="margin-top: 15px; font-size: 12px;">
        By continuing with the enrollment, you agree to our Terms & Conditions and Privacy Policy.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generate email plain text template
 */
function generateEmailText(name: string, email: string, courseName: string, paymentLink: string): string {
  return `Dear ${name},

Congratulations and welcome to HiProTech - Advanced Robotics & Drones Training program in collaboration with NIELIT Patna!

Your registration has been successfully confirmed. We are excited to have you join our community of learners and future robotics & drone technology professionals.

Your Selected Program: ${courseName}

NEXT STEPS:
1. Click the link below to access the program portal
2. Complete your enrollment process
3. Review the program curriculum
4. Secure your seat by completing the payment

🔗 Access Program Portal: ${paymentLink}
Visit: nielitpatnaonline.in/hiprotech

WHAT YOU'LL GAIN:
- Industry-relevant curriculum designed by NIELIT Patna experts
- Hands-on training with real drones and robotics kits
- Live interactive sessions with experienced instructors
- NIELIT Patna certification upon completion
- Practical drone flying and robotics assembly experience
- Career guidance in robotics and drone technology fields

IMPORTANT NOTES:
- Complete enrollment within 48 hours to confirm your seat
- Limited seats available
- Keep your transaction details safe
- Check email regularly for updates

For any questions or assistance, feel free to reach out to our support team.

Best regards,
The HiProTech Team
Advanced Robotics & Drones Training Program
In Collaboration with NIELIT Patna

---
© 2025 HiProTech. All rights reserved.
This email was sent to ${email} because you registered for our Robotics & Drones Training program.`;
}

/**
 * GET /api/register
 * Get all registered users (for admin purposes)
 */
export async function GET() {
  try {
    await dbConnect();

    const users = await User.find({})
      .select('-__v')
      .sort({ createdAt: -1 })
      .limit(100);

    return NextResponse.json(
      {
        success: true,
        count: users.length,
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
