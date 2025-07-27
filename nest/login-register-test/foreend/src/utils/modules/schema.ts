import { z } from "zod";

const UserFormSchema = z.object({
  username: z
    .string({
      message: "Username is required.",
    })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(6, {
      message: "Username must be at most 6 characters.",
    }),
  password: z
    .string({
      message: "Password is required.",
    })
    .min(6, {
      message: "password must be at least 2 characters.",
    })
    .max(20, {
      message: "password must be at most 20 characters.",
    }),
});

export {
  UserFormSchema
}