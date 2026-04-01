import { NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Sanitize input to prevent XSS attacks
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>\"']/g, "") // Remove HTML special chars
    .slice(0, 500); // Limit length
};

// Validate and sanitize form data
const validateFormData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Check required fields
  if (!data.name || typeof data.name !== "string") {
    errors.push("Name is required");
  }
  if (!data.email || typeof data.email !== "string") {
    errors.push("Email is required");
  }
  if (!data.message || typeof data.message !== "string") {
    errors.push("Message is required");
  }

  // Validate name (max 100 chars, no HTML)
  if (data.name && data.name.length > 100) {
    errors.push("Name is too long (max 100 characters)");
  }
  if (data.name && /<[^>]*>/.test(data.name)) {
    errors.push("Name contains invalid characters");
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Invalid email format");
  }
  if (data.email && data.email.length > 255) {
    errors.push("Email is too long");
  }

  // Validate message (max 5000 chars, no HTML/scripts)
  if (data.message && data.message.length > 5000) {
    errors.push("Message is too long (max 5000 characters)");
  }
  if (data.message && data.message.length < 10) {
    errors.push("Message is too short (min 10 characters)");
  }
  if (data.message && /<[^>]*>|javascript:|on\w+\s*=/.test(data.message)) {
    errors.push("Message contains invalid characters or scripts");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate form data
    const validation = validateFormData(data);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.errors.join(", ") },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const name = sanitizeInput(data.name);
    const email = sanitizeInput(data.email);
    const message = sanitizeInput(data.message);

    // Send email using Resend
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["pablo@gagazpacho.com"],
      subject: `New Contact Form: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: email,
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Contact form error:", message);

    // Don't expose API errors to client
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

