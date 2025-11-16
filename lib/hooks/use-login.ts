import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { delay } from "../utils";
import { useCallback, useState } from "react";
import { toast } from "sonner";
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

        await delay(1000);

        if (
          values.identifier === "admin@paynah.com" &&
          values.accessKey === "paynah123"
        ) {
          toast.success("Connexion réussie!", {
            description: "Redirection en cours...",
          });

          await delay(500);
          router.push(ROUTES.SERENITY_SPACE);
        } else {
          setError("Identifiant ou clé d’accès incorrect, réessayez !");
        }
      } catch (error) {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    },
    [router, form]
  );

  return { form, onSubmit, error };
}
