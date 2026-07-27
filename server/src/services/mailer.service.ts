import nodemailer from 'nodemailer';

// Helper function to generate high contrast, professional TML email layout

const generateReminderHTML = (title: string, notes?: string) => {
    return `
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>FlowCRM Notification</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px 16px; color: #18181b;">
        <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- Header Banner -->
          <div style="background-color: #18181b; padding: 24px 32px; text-align: left;">
            <h1 style="color: #ffffff; font-size: 20px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">⚡ FlowCRM Alert</h1>
          </div>
          
          <!-- Body Content -->
          <div style="padding: 32px;">
            <div style="display: inline-block; background-color: #ecfdf5; color: #047857; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 16px;">
              Scheduled Reminder Due
            </div>
            <h2 style="font-size: 22px; font-weight: 700; margin: 0 0 12px 0; color: #09090b;">
              ${title}
            </h2>
            <p style="font-size: 15px; line-height: 1.6; color: #52525b; margin: 0 0 24px 0; background-color: #fafafa; padding: 16px; border-radius: 8px; border: 1px solid #f4f4f5;">
              ${notes || "<i>No additional notes provided for this task.</i>"}
            </p>
            
            <!-- CTA Button -->
            <div style="margin-top: 28px;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/reminders" style="background-color: #18181b; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; display: inline-block;">
                View in Dashboard →
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: #fafafa; padding: 20px 32px; border-top: 1px solid #e4e4e7; text-align: center; font-size: 12px; color: #71717a;">
            Sent automatically by FlowCRM — Built for Small Business Simplicity.
          </div>
        </div>
      </body>
    </html>
    `
}




export const sendReminderEmail = async (toEmail: string, title: string, notes: string) => {
    
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
        console.log("---------------------------------------------------------");
        console.log(`📨 [EMAIL MOCK INTERCEPTION] (SMTP not configured)`);
        console.log(`To:      ${toEmail}`);
        console.log(`Subject: ${title}`);
        console.log(`Notes:   ${notes}`);
        console.log("---------------------------------------------------------");
        return
    }
    // Initialize Nodemailer Transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    })
    // Transmit HTML payload
    await transporter.sendMail({
       from:`"FlowCRM Bot" <${process.env.SMTP_EMAIL}>`,
       to:toEmail,
       subject:`[Reminder] ${title}`,
       text: notes || title,
       html:generateReminderHTML(title,notes)
    });
}