import {z} from "zod";
import * as schemas from "@/entities/client/schemas/client-schema";

// defineste tipurile schema-urilor
export type ClientCreateRequestSchema = z.infer<typeof schemas.clientCreateRequestSchema>
export type ClientUpdateRequestSchema = z.infer<typeof schemas.clientUpdateRequestSchema>


export type Client = {
    id: string;

    email: string;
    full_name: string;

    preferred_language: string;
    account_status: "active" | "suspended" | "deleted";

    created_at: string;
    updated_at: string;

    subscription_status: "free" | "premium" | "cancelled";
    role: "user" | "admin";

    last_login_at: string | null;

    consent_accepted: boolean;
    consent_timestamp: string | null;

    gdpr_deleted_at: string | null;

    total_projects_created: number;
    total_images_generated: number;
};