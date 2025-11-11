# 🚀 FunnelPro - Funnel-Style Website

A modern, professional funnel-style website built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, **MongoDB**, and **Nodemailer**.

## ✨ Features

- 🎨 **Beautiful UI**: Gradient designs, smooth animations, and responsive layout
- 📱 **Fully Responsive**: Mobile-first design with hamburger menu
- 🎯 **Funnel Flow**: Hero section → Registration steps → Google Form → Email automation
- 📧 **Email Automation**: Automatic payment link emails via Nodemailer
- 💾 **Database Integration**: MongoDB with Mongoose for user data
- 🔒 **Type-Safe**: Built with TypeScript for better code quality
- ⚡ **Fast Performance**: Next.js App Router with optimized builds

## 📁 Project Structure

```
funel-app/
├── app/
│   ├── api/
│   │   ├── register/
│   │   │   └── route.ts          # User registration endpoint
│   │   └── send-email/
│   │       └── route.ts          # Email sending endpoint
│   ├── components/
│   │   ├── Navbar.tsx            # Responsive navigation bar
│   │   ├── HeroSection.tsx       # Landing hero section
│   │   └── RegistrationSteps.tsx # 3-step accordion
│   ├── layout.tsx                # Root layout with Navbar
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles & animations
├── lib/
│   └── db.js                     # MongoDB connection
├── models/
│   └── User.js                   # User schema
├── .env.local                    # Environment variables
└── package.json
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB account (MongoDB Atlas recommended)
- Gmail account for email sending

### Step 1: Install Dependencies

```bash
npm install mongoose nodemailer
npm install --save-dev @types/nodemailer
```

### Step 2: Configure Environment Variables

Create/update `.env.local` file in the root directory with your actual credentials:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/funnel-db?retryWrites=true&w=majority

# Email Configuration (Gmail SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Google Form URL
NEXT_PUBLIC_GOOGLE_FORM_URL=https://forms.gle/your-form-id

# Payment Link
PAYMENT_LINK=https://your-payment-gateway.com/pay

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 3: Setup Gmail App Password

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
4. Use this password in `EMAIL_PASS`

### Step 4: Setup MongoDB

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Replace `username` and `password` in `MONGODB_URI`

### Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 How It Works

### 1. **Hero Section**
- Full-screen background with gradient overlay
- Three main CTA buttons: Registration, Login, Join Now
- Smooth scroll to registration section

### 2. **Registration Steps (Accordion)**
- **Step 1**: Course details and payment information
- **Step 2**: Payment instructions
- **Step 3**: Registration form button (opens Google Form)

### 3. **Backend Flow**
```
User submits Google Form
    ↓
POST /api/register
    ↓
Save to MongoDB
    ↓
Trigger /api/send-email
    ↓
Send payment link email
    ↓
User receives email
```

### 4. **Email Template**
- Professional HTML email with:
  - Welcome message
  - Payment button
  - Course details
  - Terms & conditions

## 🔌 API Endpoints

### POST /api/register
Register a new user and trigger email sending.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful! Check your email for payment link.",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### GET /api/register
Get all registered users (admin endpoint).

### POST /api/send-email
Send payment email to a user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

## 🎨 Customization

### Change Colors
Edit the gradient colors in components:
- Navbar: `from-purple-600 via-pink-500 to-red-500`
- Buttons: `from-purple-600 to-pink-600`

### Change Background Image
In `HeroSection.tsx`, update the `backgroundImage` URL:
```tsx
backgroundImage: `url('YOUR_IMAGE_URL')`
```

### Update Email Template
Edit `/app/api/send-email/route.ts` to customize the HTML email template.

### Add More Steps
Add new items to the `steps` array in `RegistrationSteps.tsx`.

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to add all variables from `.env.local` to your hosting platform.

## 🐛 Troubleshooting

### Email Not Sending
- Verify Gmail App Password is correct
- Check if 2FA is enabled on Gmail
- Ensure `EMAIL_USER` and `EMAIL_PASS` are set

### Database Connection Error
- Verify MongoDB URI is correct
- Check network access in MongoDB Atlas
- Whitelist your IP address

### Build Errors
```bash
npm install
npm run build
```

## 📝 To-Do / Future Enhancements

- [ ] Add user authentication (login functionality)
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Admin dashboard for user management
- [ ] Email verification with OTP
- [ ] Course catalog page
- [ ] User profile page
- [ ] Payment status tracking
- [ ] Automated reminders for pending payments

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

Built with ❤️ using Next.js

---

**Need Help?** Open an issue or contact support!

🌟 **Star this repo if you find it helpful!**
