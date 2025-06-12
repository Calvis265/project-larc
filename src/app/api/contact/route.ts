
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Define a schema for input validation
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = contactFormSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: "Invalid input", errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { name, email, message } = validation.data;

    // Simulate sending an email
    console.log("Contact form submission received on server:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    // -------------------------------------------------------------------------
    // TODO: Implement actual email sending logic here
    // You would typically use a library like Nodemailer and an email service
    // (e.g., SendGrid, Resend, AWS SES, Mailgun).
    //
    // Example with Nodemailer (requires setup and credentials):
    //
    // import nodemailer from 'nodemailer';
    //
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.example.com', // Your SMTP host
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: process.env.EMAIL_USER, // Your email user from .env
    //     pass: process.env.EMAIL_PASS, // Your email password from .env
    //   },
    // });
    //
    // try {
    //   await transporter.sendMail({
    //     from: `"${name}" <${email}>`, // Sender address (could be your noreply@yourdomain.com)
    //     to: process.env.YOUR_RECEIVING_EMAIL, // Your email address to receive enquiries
    //     subject: `New Contact Form Submission from ${name}`,
    //     text: message,
    //     html: `<p>You have a new contact form submission:</p>
    //            <p><strong>Name:</strong> ${name}</p>
    //            <p><strong>Email:</strong> ${email}</p>
    //            <p><strong>Message:</strong></p>
    //            <p>${message}</p>`,
    //   });
    //   console.log('Email sent successfully (simulated)');
    // } catch (emailError) {
    //   console.error('Error sending email (simulated):', emailError);
    //   return NextResponse.json({ message: "Error sending email" }, { status: 500 });
    // }
    // -------------------------------------------------------------------------


    return NextResponse.json({ message: "Message received successfully!" }, { status: 200 });

  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
