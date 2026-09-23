import {z} from "zod";

export const profileSchema = z.object({
  displayName: z.string().trim().min(2).max(60),
  username: z.string().trim().min(3).max(30).regex(/^[a-z0-9_]+$/),
  bio: z.string().trim().max(300),
  preferredLocale: z.enum(["zh", "en", "ja"])
});
