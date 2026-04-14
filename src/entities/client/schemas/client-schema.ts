import { z } from "zod";

export const clientCreateRequestSchema = z.object({
    email: z.string().email("Invalid email format"),
    full_name: z.string().min(2, "At least 2 characters").max(100),
    preferred_language: z.string().min(1).max(10).optional(),
    account_status: z.enum(["active", "suspended", "deleted"]).optional(),
    subscription_status: z.enum(["free", "premium", "cancelled"]).optional(),
    role: z.enum(["user", "admin"]).optional(),
    last_login_at: z.string().datetime().optional(),
    consent_accepted: z.boolean().optional(),
    consent_timestamp: z.string().datetime().optional(),
    gdpr_deleted_at: z.string().datetime().optional(),
    total_projects_created: z.number().int().min(0).optional(),
    total_images_generated: z.number().int().min(0).optional()
});

export const clientUpdateRequestSchema =
    clientCreateRequestSchema.partial();