
import api from "@/lib/api";
export async function sendContactForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}) {
  // Adjust the API URL if needed for production
  const res = await api.post("/contact", data);
  return res.data;
}
