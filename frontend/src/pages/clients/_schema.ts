import {z} from "@/i18n.ts";

export const GenericStringConstraint = z.string().min(1).max(30);

export const clientFormSchema = z.object({
    firstName: GenericStringConstraint,
    lastName: GenericStringConstraint,
    email: z.string().email(),
    lastReminder: z.string().refine(value => /^\d{4}-\d{2}$/.test(value), {params: {i18n: "InvalidDate"}}),
    frequency: z.enum(["semiannual", "annual"]),
});