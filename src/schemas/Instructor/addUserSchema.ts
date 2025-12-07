import { z } from "zod";

export const addUserSchema = z.object({
  full_name: z.string().min(1, { message: "Full name is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
  mobile_no: z
    .string()
    .min(7, { message: "Phone number too short" })
    .max(20, { message: "Phone number too long" })
    .regex(/^[0-9+\-\s()]*$/, { message: "Invalid phone number" }),

  // NUMERIC ROLE VALIDATION
  role_id: z.string().min(1, { message: "Role is required" }),

  group_ids: z.array(z.number()).min(1, {
    message: "Select at least one group",
  }),

  courses: z.array(z.number()).min(1, {
    message: "Select at least one course",
  }),
});

export type AddUserFormValues = z.infer<typeof addUserSchema>;
