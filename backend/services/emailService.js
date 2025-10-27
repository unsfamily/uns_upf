const nodemailer = require("nodemailer");

// Create transporter with Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send thank you email with certificate
const sendThankYouEmail = async (
  recipientEmail,
  fullName,
  certificateBuffer
) => {
  const transporter = createTransporter();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Taking the Global Peace Pledge</title>
</head>
<body style="font-family: 'Georgia', serif; line-height: 1.8; color: #333; background-color: #f9fafb; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">🕊️ Global Peace Pledge</h1>
            <p style="color: #bfdbfe; margin: 10px 0 0 0; font-size: 16px;">Universal Peace Foundation</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 40px 30px;">
            <h2 style="color: #1e3a8a; font-size: 24px; margin: 0 0 20px 0; font-weight: 700;">Thank You for Taking the Global Peace Pledge</h2>
            
            <p style="margin: 0 0 15px 0; color: #475569;">Dear <strong>${fullName}</strong>,</p>
            
            <p style="margin: 0 0 15px 0; color: #475569;">Vanakkam, Santhosham and Peace be with you!</p>
            
            <p style="margin: 0 0 15px 0; color: #475569;">
                On behalf of His Holiness GuruMahan and the entire Universal Peace Foundation family, we extend our heartfelt gratitude for adding your voice to the Global Peace Pledge on this momentous occasion.
            </p>
            
            <p style="margin: 0 0 15px 0; color: #475569;">
                Your digital signature represents more than just support—it embodies hope, compassion, and the collective power of humanity working toward a more peaceful tomorrow. By joining millions of hearts and minds from every corner of the world, you have become an integral part of a sacred movement for global harmony.
            </p>
            
            <!-- Quote Section -->
            <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0; border-radius: 8px;">
                <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">Your Commitment Matters</h3>
                <p style="margin: 0 0 10px 0; color: #1e40af; font-style: italic; font-size: 15px;">
                    As His Holiness GuruMahan reminds us:
                </p>
                <p style="margin: 0; color: #1e40af; font-style: italic; font-size: 15px;">
                    <em>"Peace is not merely the absence of conflict, but the presence of love, understanding, and compassion in every heart. When we unite in the spirit of universal brotherhood, we become instruments of divine harmony."</em>
                </p>
            </div>
            
            <p style="margin: 0 0 15px 0; color: #475569;">
                Your participation in the Global Peace Day 2025 celebration in Pondicherry on <strong>November 11, 2025</strong>, marks a significant milestone in our collective journey toward world peace.
            </p>
            
            <!-- Certificate Section -->
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; padding: 20px; margin: 25px 0; border-radius: 8px; text-align: center;">
                <h3 style="color: #92400e; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">📜 Your Certificate of Appreciation</h3>
                <p style="margin: 0; color: #92400e; font-size: 14px;">
                    We trust you downloaded your personalized Certificate of Appreciation from our website. Your certificate is also attached to this email for your convenience.
                </p>
                <p style="margin: 10px 0 0 0; color: #92400e; font-size: 14px;">
                    This beautifully designed certificate is perfect for framing and display—a lasting reminder of your commitment to world peace that can inspire others in your home or workplace.
                </p>
            </div>
            
            <!-- Call to Action -->
            <div style="background: #f0f9ff; padding: 20px; margin: 25px 0; border-radius: 8px; text-align: center;">
                <h3 style="color: #0369a1; margin: 0 0 10px 0; font-size: 18px; font-weight: 600;">🌍 Spread the Message</h3>
                <p style="margin: 0 0 15px 0; color: #075985; font-size: 14px;">
                    We encourage you to share this meaningful initiative with your family, friends, and community. Together, we can amplify the message that a better, more peaceful world is possible, and it starts with each one of us.
                </p>
                <a href="https://universalpeacefoundation.org" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%); color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 600; font-size: 14px;">Visit Our Website</a>
            </div>
            
            <p style="margin: 25px 0 15px 0; color: #475569;">
                Thank you once again for being a beacon of peace and universal brotherhood.
            </p>
            
            <p style="margin: 0 0 5px 0; color: #475569; font-weight: 600;">
                With Gratitude and Blessings,
            </p>
            <p style="margin: 0 0 5px 0; color: #475569;">
                The Universal Peace Foundation Team
            </p>
            <p style="margin: 0 0 5px 0; color: #64748b; font-style: italic; font-size: 14px;">
                Under the guidance of His Holiness GuruMahan
            </p>
            <p style="margin: 0 0 5px 0; color: #64748b; font-size: 14px;">
                Global Peace Day 2025 | Pondicherry, India
            </p>
            <p style="margin: 0; color: #3b82f6; font-size: 14px;">
                <a href="https://universalpeacefoundation.org" style="color: #3b82f6; text-decoration: none;">https://universalpeacefoundation.org</a>
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #f1f5f9; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #64748b; font-size: 12px;">
                © ${new Date().getFullYear()} Universal Peace Foundation. All rights reserved.
            </p>
            <p style="margin: 10px 0 0 0; color: #64748b; font-size: 12px;">
                This email was sent because you signed the Global Peace Pledge.
            </p>
        </div>
    </div>
</body>
</html>
  `;

  const textContent = `
Thank You for Taking the Global Peace Pledge 🕊️

Dear ${fullName},

Vanakkam, Santhosham and Peace be with you!

On behalf of His Holiness GuruMahan and the entire Universal Peace Foundation family, we extend our heartfelt gratitude for adding your voice to the Global Peace Pledge on this momentous occasion.

Your digital signature represents more than just support—it embodies hope, compassion, and the collective power of humanity working toward a more peaceful tomorrow. By joining millions of hearts and minds from every corner of the world, you have become an integral part of a sacred movement for global harmony.

Your Commitment Matters

As His Holiness GuruMahan reminds us:

"Peace is not merely the absence of conflict, but the presence of love, understanding, and compassion in every heart. When we unite in the spirit of universal brotherhood, we become instruments of divine harmony."

Your participation in the Global Peace Day 2025 celebration in Pondicherry on November 11, 2025, marks a significant milestone in our collective journey toward world peace.

Your Certificate of Appreciation

We trust you downloaded your personalized Certificate of Appreciation from our website. Your certificate is also attached to this email for your convenience.

The beautifully designed certificate is perfect for framing and display—a lasting reminder of your commitment to world peace that can inspire others in your home or workplace.

Spread the Message

We encourage you to share this meaningful initiative with your family, friends, and community. Together, we can amplify the message that a better, more peaceful world is possible, and it starts with each one of us.

Thank you once again for being a beacon of peace and universal brotherhood.

With Gratitude and Blessings,

The Universal Peace Foundation Team
Under the guidance of His Holiness GuruMahan
Global Peace Day 2025 | Pondicherry, India
https://universalpeacefoundation.org
  `;

  const mailOptions = {
    from: `"Universal Peace Foundation" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: "Thank You for Taking the Global Peace Pledge 🕊️",
    text: textContent,
    html: htmlContent,
    attachments: certificateBuffer
      ? [
          {
            filename: `Peace-Pledge-Certificate-${fullName.replace(
              /\s+/g,
              "-"
            )}.png`,
            content: certificateBuffer,
            contentType: "image/png",
          },
        ]
      : [],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${recipientEmail}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Error sending email to ${recipientEmail}:`, error);
    throw error;
  }
};

module.exports = {
  sendThankYouEmail,
};
