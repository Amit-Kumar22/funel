import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

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

    // Trigger email sending asynchronously (fire-and-forget for instant response)
    console.log('🔔 Scheduling email notification (async)...');
    
    // Send email in background without waiting (improves response time)
    const emailApiUrl = process.env.NEXT_PUBLIC_APP_URL 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`
      : 'http://localhost:3000/api/send-email';
    
    // Fire-and-forget: Don't await this promise
    fetch(emailApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        course: user.course,
      }),
    })
      .then(async (emailResponse) => {
        const emailResult = await emailResponse.json();
        if (emailResponse.ok) {
          console.log('✅ Email sent successfully:', emailResult);
          // Update user to mark email as sent
          await User.findByIdAndUpdate(user._id, { emailSent: true });
        } else {
          console.error('❌ Email API returned error:', emailResult);
        }
      })
      .catch((emailError) => {
        console.error('❌ Error sending email:', emailError);
      });

    console.log('📧 Email will be sent in background');

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
