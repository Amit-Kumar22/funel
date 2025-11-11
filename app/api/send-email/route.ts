import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * POST /api/send-email
 * Sends confirmation email with payment link to registered users
 */
export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, course } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not configured');
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

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
    const paymentLink = process.env.PAYMENT_LINK || 'https://your-payment-gateway.com/pay';

    // Course display name
    const courseNames: { [key: string]: string } = {
      'online-only': '30-Day Online Course Only',
      'online-bootcamp': '30-Day Online + 3-Day Bootcamp at IIT Kanpur',
      'bootcamp-only': '3-Day Bootcamp Only (at IIT Kanpur)',
    };
    const courseName = course ? courseNames[course] || course : 'Selected Course';

    // Email HTML template
    const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 0 0 10px 10px;
    }
    .button {
      display: inline-block;
      padding: 15px 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 50px;
      margin: 20px 0;
      font-weight: bold;
    }
    .info-box {
      background: white;
      padding: 20px;
      border-left: 4px solid #667eea;
      margin: 20px 0;
      border-radius: 5px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎉 Registration Successful!</h1>
  </div>
  <div class="content">
    <p>Dear <strong>${name}</strong>,</p>
    
    <p>Thank you for registering with FunnelPro! We're excited to have you on board.</p>
    
    <div class="info-box">
      <h3>📋 Next Steps:</h3>
      <ol>
        <li>Click the payment button below to complete your registration</li>
        <li>Complete the payment using your preferred method</li>
        <li>Save your payment confirmation receipt</li>
        <li>You'll receive course access within 24 hours</li>
      </ol>
    </div>
    
    <center>
      <a href="${paymentLink}" class="button">
        💳 Proceed to Payment
      </a>
    </center>
    
    <div class="info-box">
      <h3>� Your Selected Course:</h3>
      <p style="font-size: 16px; color: #f97316; font-weight: bold;">${courseName}</p>
    </div>
    
    <div class="info-box">
      <h3>�💰 Payment Details:</h3>
      <ul>
        <li><strong>Course Starting:</strong> 15th November 2025</li>
        <li><strong>Payment Methods:</strong> Credit/Debit Card, UPI, Net Banking</li>
        <li><strong>Installment Options:</strong> Contact support for details</li>
      </ul>
    </div>
    
    <p><strong>⚠️ Important Notes:</strong></p>
    <ul>
      <li>This link is valid for 48 hours</li>
      <li>Do not share this link with anyone</li>
      <li>Save your transaction ID for future reference</li>
      <li>Contact support if you face any issues</li>
    </ul>
    
    <p>If you have any questions, feel free to reach out to our support team.</p>
    
    <p>Best regards,<br>
    <strong>The HiProTech Team</strong><br>
    <small>Applied Data Science & Machine Intelligence - IIT Kanpur</small></p>
  </div>
  
  <div class="footer">
    <p>© 2025 HiProTech. All rights reserved.</p>
    <p>By proceeding with payment, you agree to our Terms & Conditions.</p>
    <p>If you didn't register for this course, please ignore this email.</p>
  </div>
</body>
</html>
    `;

    // Email options
    const mailOptions = {
      from: {
        name: 'HiProTech - IIT Kanpur',
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: '✅ Registration Successful - Complete Your Payment',
      html: emailHTML,
      text: `Dear ${name},\n\nThank you for registering with HiProTech!\n\nYour Selected Course: ${courseName}\n\nPlease complete your payment using this link: ${paymentLink}\n\nBest regards,\nThe HiProTech Team`,
    };

    // Send email
    console.log('Attempting to send email to:', email);
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.EMAIL_USER,
    });

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully:', info.messageId);
    console.log('Email accepted:', info.accepted);
    console.log('Email response:', info.response);

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
        messageId: info.messageId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Error sending email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
    });
    
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send email',
        error: error.message,
        details: error.code || 'Unknown error',
      },
      { status: 500 }
    );
  }
}
