"use client";

import { Form, FormControl, FormField } from "@/components/ui/form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";

const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Le nom est requis" })
      .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
    email: z
      .string()
      .min(1, { message: "Adresse email est requise" })
      .email("Adresse email invalide"),
    password: z
      .string()
      .min(1, { message: "Mot de passe est requise" })
      .min(8, { message: "Mot de passe doit contenir au moins 8 caractères" }),
    confirmPassword: z
      .string()
      .min(1, { message: "La confirmation du mot de passe est requise" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

function RegisterForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check credentials
      if (values.email === "admin" && values.password === "admin") {
        toast.success("Inscription réussie!", {
          description: "Redirection en cours...",
        });
        
        // Simulate redirect delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        router.push(ROUTES.HOME);
      } else {
        toast.error("Inscription échouée", {
          description: "Utilisez 'admin' comme email et mot de passe pour tester.",
        });
      }
    } catch (error) {
      toast.error("Erreur d'inscription", {
        description: "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Votre nom"
                      {...field}
                    />
                  </FormControl>
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </FieldContent>
              </Field>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </FieldContent>
              </Field>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </FieldContent>
              </Field>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </FieldContent>
              </Field>
            )}
          />
          <Button type="submit" className="w-full">
            S&apos;inscrire
          </Button>
        </FieldGroup>
      </form>
    </Form>
  );
}

export default RegisterForm;
