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

    const raw = (await req.json()) as Partial<ContactForm>;
    const str = (v: unknown, max: number) =>
      typeof v === "string" ? v.trim().slice(0, max) : "";
    const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");
    const body = {
      name: oneLine(str(raw.name, 100)),
      email: str(raw.email, 255),
      phone: oneLine(str(raw.phone, 30)),
      message: str(raw.message, 5000),
      projectTitle: oneLine(str(raw.projectTitle, 200)),
    };

    const badRequest = (error: string) =>
      new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    if (!body.name || !body.email || !body.message) {
      return badRequest("Name, email, and message are required");
    }
    if (!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(body.email)) {
      return badRequest("Please provide a valid email address");
    }

    const esc = (s: string) =>
      s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const subject = body.projectTitle
      ? `New Project Inquiry: ${body.projectTitle}`
      : `New Contact Form Submission from ${body.name}`;

    const htmlContent = `
      <h2>${esc(subject)}</h2>
      <p><strong>Name:</strong> ${esc(body.name)}</p>
      <p><strong>Email:</strong> ${esc(body.email)}</p>
      ${body.phone ? `<p><strong>Phone:</strong> ${esc(body.phone)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${esc(body.message).replace(/\n/g, "<br>")}</p>
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
