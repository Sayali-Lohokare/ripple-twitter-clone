import { z } from "zod";


// Define the shape of the SignUpVerificationForm data using Zod
const createPostFormSchema = z.object({
  message: z.string().min(1, { message: "Post cannot be empty." }),
});

// Export the schemas for use in your app
export { createPostFormSchema };

// Optionally, infer types from the schemas for better type safety
export type CreatePostFormData = z.infer<typeof createPostFormSchema>;