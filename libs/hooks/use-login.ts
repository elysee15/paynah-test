import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCallback, useState } from "react";
import { ROUTES } from "../constants/routes";

const formSchema = z.object({
  identifier: z.string().min(1, { message: "Identifiant est requis" }),
  accessKey: z.string().min(1, { message: "Clé d'accès est requise" }),
});

type FormValues = z.infer<typeof formSchema>;

export function useLogin() {
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      accessKey: "",
    },
  });

  const onSubmit = useCallback(
    async (values: FormValues) => {
      try {
        setError(null);

        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: values.identifier,
            accessKey: values.accessKey,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          router.push(ROUTES.SERENITY_SPACE);
        } else {
          setError(
            data.error || "Identifiant ou clé d'accès incorrect, réessayez !"
          );
        }
      } catch {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    },
    [router]
  );

  return { form, onSubmit, error };
}
