import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  message: string;
  projectTitle?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const body: ContactForm = await req.json();

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const subject = body.projectTitle
      ? `New Project Inquiry: ${body.projectTitle}`
      : `New Contact Form Submission from ${body.name}`;

    const htmlContent = `
      <h2>${subject}</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      ${body.phone ? `<p><strong>Phone:</strong> ${body.phone}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${body.message.replace(/\n/g, "<br>")}</p>
    `;

    // Send to both email addresses
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Dice Website <onboarding@resend.dev>",
        to: ["info@dicelimited.co.ke", "dicelimited@yahoo.com"],
        subject,
        html: htmlContent,
        reply_to: body.email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", data);
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
