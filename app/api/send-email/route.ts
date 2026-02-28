// app/api/send-email/route.ts
import nodemailer from 'nodemailer';

// Ensure this route uses the Node.js runtime (not Edge), required for nodemailer
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const submissionType = formData.get('type') as string;
    const name = formData.get('name') as string;
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || '';
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || process.env.GOOGLE_APP_PASSWORD || '';
    const toEmail = process.env.CONTACT_EMAIL || smtpUser || '';

    // Handle RSVP submissions
    if (submissionType === 'rsvp') {
      const guests = formData.get('guests') as string;
      const attending = (formData.get('attending') as string) || 'yes';
      const guestNames = (formData.get('guestNames') as string) || '';
      const isAttending = attending === 'yes';
      const guestsNumber = parseInt(guests || '0', 10) || 0;

      if (!name?.trim() || (isAttending && !guests?.trim())) {
        return Response.json(
          { success: false, message: 'Please fill in all fields' },
          { status: 400 }
        );
      }

      // Validate environment variables
      if (!smtpUser || !smtpPass) {
        return Response.json(
          { success: false, message: 'Email service not configured. Missing SMTP credentials.' },
          { status: 500 }
        );
      }
      if (!toEmail) {
        return Response.json(
          { success: false, message: 'Email service not configured. Missing recipient email.' },
          { status: 500 }
        );
      }

      // Create transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Verify SMTP connection
      try {
        await transporter.verify();
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'SMTP verification failed';
        console.error('SMTP verify error:', err);
        return Response.json(
          { success: false, message: `Email service error: ${msg}` },
          { status: 500 }
        );
      }

      const attendanceStatus = isAttending ? 'Attending' : 'Not attending';
      const guestsSection = isAttending && guestsNumber > 0
        ? `<p><strong>Number of Guests:</strong> ${guestsNumber}</p>`
        : '';
      const guestNamesSection = isAttending && guestNames.trim()
        ? `<p><strong>Guest Names:</strong> ${guestNames}</p>`
        : '';

      // Send RSVP email
      try {
        const info = await transporter.sendMail({
          from: `"Engagement Website" <${smtpUser}>`,
          to: toEmail,
          subject: `New RSVP from ${name}`,
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4f46e5;">New RSVP Received!</h2>
            <div style="margin: 20px 0; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Attendance:</strong> ${attendanceStatus}</p>
              ${guestsSection}
              ${guestNamesSection}
            </div>
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
              This RSVP was submitted through the engagement website.
            </p>
          </div>
        `,
        });

        return Response.json({ 
          success: true, 
          message: 'RSVP submitted successfully!',
          messageId: info.messageId
        });
      } catch (err: any) {
        console.error('Error sending RSVP email:', err);
        const message = (err && (err.message || err.toString())) || 'Unknown email error';
        return Response.json(
          {
            success: false,
            message,
            code: err?.code || null,
            provider: 'gmail',
          },
          { status: 500 }
        );
      }
    }

    // Handle message submissions (existing code)
    const imageFile = formData.get('image') as File | null;
    const textMessage = formData.get('textMessage') as string | null;
    const messageType = imageFile ? 'drawn' : 'written';

    if (!name?.trim()) {
      return Response.json(
        { success: false, message: 'Please enter your name' },
        { status: 400 }
      );
    }

    // Validate environment variables
    if (!smtpUser || !smtpPass) {
      return Response.json(
        { success: false, message: 'Email service not configured. Missing SMTP credentials.' },
        { status: 500 }
      );
    }
    if (!toEmail) {
      return Response.json(
        { success: false, message: 'Email service not configured. Missing recipient email.' },
        { status: 500 }
      );
    }

    // Create transporter after validating env, so any errors are caught below
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Verify SMTP connection/auth before attempting to send
    try {
      await transporter.verify();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'SMTP verification failed';
      console.error('SMTP verify error:', err);
      return Response.json(
        { success: false, message: `Email service error: ${msg}` },
        { status: 500 }
      );
    }

    // Convert the image file to a buffer
    let attachments = [];
    if (imageFile) {
      const imageBytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(imageBytes);
      
      attachments.push({
        filename: 'handwritten-message.png',
        content: buffer,
        cid: 'handwritten-message',
        encoding: 'base64'
      });
    }

    // Send mail
    let info;
    try {
      info = await transporter.sendMail({
        from: `"Engagement Website" <${smtpUser}>`,
        to: toEmail,
        subject: `New Message from ${name}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4f46e5;">You've received a new message!</h2>
          <p><strong>From:</strong> ${name}</p>
          ${messageType === 'drawn' ? (
            imageFile ? 
              `<p>Here's the handwritten message:</p>
              <div style="margin: 20px 0; padding: 15px; background: #f9fafb; border-radius: 8px;">
                <img src="cid:handwritten-message" alt="Handwritten message" style="max-width: 100%; height: auto;" />
              </div>` : 
              '<p>No image was attached to this message.</p>'
          ) : (
            textMessage ? 
              `<p>Here's the written message:</p>
              <div style="margin: 20px 0; padding: 15px; background: #f9fafb; border-radius: 8px; white-space: pre-wrap; line-height: 1.6;">
                ${textMessage.replace(/\n/g, '<br>')}
              </div>` : 
              '<p>No message text was provided.</p>'
          )}
        </div>
      `,
        attachments
      });
    } catch (err: any) {
      console.error('Error sending email:', err);
      const message = (err && (err.message || err.toString())) || 'Unknown email error';
      return Response.json(
        {
          success: false,
          message,
          code: err?.code || null,
          provider: 'gmail',
          envPresent: {
            SMTP_USER: Boolean(process.env.SMTP_USER),
            SMTP_PASS: Boolean(process.env.SMTP_PASS),
            GMAIL_USER: Boolean(process.env.GMAIL_USER),
            GMAIL_APP_PASSWORD: Boolean(process.env.GMAIL_APP_PASSWORD),
            GOOGLE_APP_PASSWORD: Boolean(process.env.GOOGLE_APP_PASSWORD),
            CONTACT_EMAIL: Boolean(process.env.CONTACT_EMAIL),
          },
        },
        { status: 500 }
      );
    }

    return Response.json({ 
      success: true, 
      message: 'Message sent successfully!',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}