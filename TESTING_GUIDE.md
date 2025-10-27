# Email & Certificate Testing Guide

## Quick Test Steps

### 1. Start Both Servers

**Backend (Port 5001):**

```bash
cd backend
npm start
```

Expected output:

- 🚀 Server is running on port 5001
- ✅ Connected to MySQL database

**Frontend (Port 3000):**

```bash
cd frontend
npm start
```

### 2. Test the Form Submission

1. Open http://localhost:3000 in your browser
2. Scroll to the "Sign Your Peace Pledge" section
3. Fill in the form:

   - First Name: Test
   - Last Name: User
   - Email: YOUR_EMAIL@gmail.com (use your real email to test)
   - Country: India
   - Draw a signature in the signature pad

4. Click "Submit My Peace Pledge"

### 3. Expected Results

#### Immediate Response:

- ✅ Success message appears
- ✅ Certificate download buttons appear
- ✅ Form resets

#### Backend Logs (Check terminal):

```
✅ New pledge submitted: Test User (your_email@gmail.com) from India
✅ Thank you email sent to your_email@gmail.com
```

#### Email Inbox (Check within 1-2 minutes):

- ✅ Email received with subject: "Thank You for Taking the Global Peace Pledge 🕊️"
- ✅ Email contains personalized greeting with your name
- ✅ Email has beautiful HTML formatting
- ✅ Certificate is attached as PNG image
- ✅ All links work correctly

### 4. Verify Certificate Quality

**From Email Attachment:**

1. Download the attached PNG certificate
2. Check that it contains:
   - ✅ UPF logo at top
   - ✅ "UNIVERSAL PEACE FOUNDATION" header
   - ✅ "CERTIFICATE OF APPRECIATION" title
   - ✅ Your full name prominently displayed
   - ✅ GuruMahan's photo (circular frame)
   - ✅ Your digital signature
   - ✅ Date: November 11, 2025
   - ✅ Location: Pondicherry, India
   - ✅ Gradient border (blue-green-blue)
   - ✅ High resolution suitable for printing

**From Website Download:**

1. Click "📄 Download Certificate (PDF)"
2. Verify PDF quality and content matches
3. Click "🖼️ Download Certificate (Image)"
4. Verify PNG quality and content matches

### 5. Troubleshooting

#### Email Not Received?

1. Check spam/junk folder
2. Verify email configuration in backend/.env
3. Check backend terminal for errors
4. Ensure Gmail "Less secure app access" is enabled OR use App Password
5. Check email credentials are correct

#### Certificate Not Generated?

1. Check backend terminal for errors
2. Verify assets folder exists: backend/assets/
3. Check that images are present in assets folder
4. Try using a different browser (CORS issues)

#### Images Not Loading in Certificate?

1. Backend will try CDN first, then local fallback
2. Check internet connection for CDN access
3. Verify local images exist in backend/assets/
4. Check browser console for CORS errors

#### Database Errors?

1. Verify MySQL is running
2. Check database credentials in backend/.env
3. Ensure 'peace_pledge' database exists
4. Run database schema: backend/database/schema.sql

### 6. Email Client Testing

Test email display in different clients:

- [ ] Gmail (Web)
- [ ] Gmail (Mobile)
- [ ] Outlook (Web)
- [ ] Outlook (Desktop)
- [ ] Apple Mail
- [ ] Yahoo Mail
- [ ] Others

### 7. Monitor Backend Logs

Watch for these messages:

```
✅ New pledge submitted: [Name] ([Email]) from [Country]
✅ Thank you email sent to [Email]
```

If errors appear:

```
❌ Error sending email to [Email]: [Error details]
```

Check:

- Email configuration
- Network connectivity
- SMTP server status
- Email credentials

### 8. Testing Different Scenarios

**Test Case 1: Duplicate Email**

- Submit same email twice
- Should show: "This email has already signed the peace pledge."

**Test Case 2: Invalid Email Format**

- Enter invalid email (e.g., "test@test")
- Should show validation error

**Test Case 3: Missing Required Fields**

- Leave fields empty
- Should show: "Please fill in all required fields."

**Test Case 4: No Signature**

- Don't draw signature
- Should show: "Please provide your digital signature."

## Production Checklist

Before deploying to production:

- [ ] Update email credentials to production account
- [ ] Test with multiple email providers
- [ ] Verify certificate quality at different resolutions
- [ ] Test on mobile devices
- [ ] Check email deliverability score
- [ ] Set up email monitoring
- [ ] Configure proper error logging
- [ ] Test under load (multiple simultaneous submissions)
- [ ] Verify database backup is working
- [ ] Test email template in dark mode
- [ ] Ensure HTTPS is enabled
- [ ] Add rate limiting to prevent abuse
- [ ] Set up email bounce handling

## Quick Commands

### Start Backend

```bash
cd /Users/apple/Projects/UPF/latest_src_repo/uns_upf/backend
npm start
```

### Start Frontend

```bash
cd /Users/apple/Projects/UPF/latest_src_repo/uns_upf/frontend
npm start
```

### Check Database

```bash
mysql -u root -p
USE peace_pledge;
SELECT * FROM pledges ORDER BY created_at DESC LIMIT 5;
```

### View Backend Logs

The terminal running `npm start` in backend folder shows all logs in real-time.

## Support

If you encounter any issues:

1. Check the EMAIL_IMPLEMENTATION_SUMMARY.md for detailed implementation info
2. Review backend terminal logs for error messages
3. Check frontend browser console for client-side errors
4. Verify all dependencies are installed (npm install)
5. Ensure all environment variables are set correctly in .env

## Success Indicators

Everything is working correctly when:

1. ✅ Backend server starts without errors
2. ✅ Frontend connects to backend API
3. ✅ Form submission succeeds
4. ✅ Email is sent within 1-2 minutes
5. ✅ Certificate is attached to email
6. ✅ Email displays correctly with formatting
7. ✅ Certificate contains all required information
8. ✅ Certificate is high quality and print-ready
9. ✅ Data is saved to database
10. ✅ No errors in backend or frontend logs
