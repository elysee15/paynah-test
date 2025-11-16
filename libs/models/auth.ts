import z from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Identifiant est requis" })
    .email({ message: "Identifiant doit être une adresse email valide" }),
  accessKey: z.string().min(1, { message: "Clé d'accès est requise" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
