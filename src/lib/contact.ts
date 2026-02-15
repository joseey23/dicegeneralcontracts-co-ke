import { supabase } from "@/integrations/supabase/client";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  projectTitle?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: result, error } = await supabase.functions.invoke("send-contact-email", {
      body: data,
    });

    if (error) {
      console.error("Edge function error:", error);
      return { success: false, error: "Failed to send message. Please try again." };
    }

    return { success: true };
  } catch (err) {
    console.error("Network error:", err);
    return { success: false, error: "Network error. Please try again." };
  }
}
