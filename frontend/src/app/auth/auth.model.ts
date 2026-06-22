import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
// Export the schemas for use in your app
export { loginFormSchema };

// Optionally, infer types from the schemas for better type safety
export type LoginFormData = z.infer<typeof loginFormSchema>;