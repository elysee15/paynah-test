"use client";

import { Form, FormControl, FormField } from "@/components/ui/form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import OvalLoader from "../ui/oval-loader";
import { Card, CardContent } from "../ui/card";
import { useLogin } from "@/lib/hooks/use-login";
import { cn } from "@/lib/utils";
import LockIcon from "../icons/lock";

function LoginForm() {
  const { form, onSubmit, error } = useLogin();

  const description = (
    <p className="text-xs text-muted-foreground leading-normal">
      Identifiant : <span className="font-bold">admin@paynah.com</span> /{" "}
      <span className="font-bold">paynah123</span>
    </p>
  );

  return (
    <Card
      className={cn(
        "shadow-none transition-all duration-300",
        error && "border-destructive bg-destructive/3"
      )}
    >
      <CardContent>
        <div className="flex items-center justify-center mb-3 gap-1 flex-col">
          <LockIcon className={cn("size-6", error && "text-destructive")} />
          {error ? (
            <p className="text-xs text-center text-destructive">{error}</p>
          ) : (
            description
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormField
                control={form.control}
                name="identifier"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FormControl>
                        <Input
                          id="identifier"
                          type="email"
                          placeholder="Identifiant"
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
              <div>
                <FormField
                  control={form.control}
                  name="accessKey"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <FormControl>
                          <PasswordInput
                            id="accessKey"
                            placeholder="Clé d'accès"
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
                <Link
                  href={ROUTES.FORGOT_ACCESS_KEY}
                  className="text-sm mt-1.5 hover:font-bold"
                >
                  J&apos;ai perdu ma clé
                </Link>
              </div>
              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
                className="w-full"
              >
                {form.formState.isSubmitting ? (
                  <OvalLoader className="size-6" />
                ) : (
                  "Déverrouiller"
                )}
              </Button>
            </FieldGroup>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
