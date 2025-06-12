
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = forgotPasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: "Invalid input", errors: validation.error.flatten().fieldErrors }, { status: 400 });
    }

    const { email } = validation.data;

    console.log(`Password reset requested for email: ${email}`);
    // In a real application:
    // 1. Check if email exists in the database.
    // 2. Generate a unique, secure password reset token.
    // 3. Store the token with an expiry date, associated with the user.
    // 4. Send an email to the user with a link containing this token
    //    (e.g., https://yourdomain.com/reset-password?token=YOUR_UNIQUE_TOKEN)
    // 5. Create a /reset-password page that accepts the token, verifies it, and allows the user to set a new password.

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({ message: "If your email address is registered with us, you will receive a password reset link shortly." }, { status: 200 });

  } catch (error) {
    console.error("Forgot password API error:", error);
    return NextResponse.json({ message: "Internal Server Error. Please try again later." }, { status: 500 });
  }
}
