"use client";

import { Form, FormControl, FormField } from "@/components/ui/form";
import { Field, FieldContent, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, ChevronDown } from "lucide-react";

const formSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Le message est requis" })
    .min(2, { message: "Le message doit contenir au moins 2 caractères" }),
});

type FormValues = z.infer<typeof formSchema>;

type ConcernsFormProps = {
  onSubmit?: (values: FormValues) => void | Promise<void>;
  onSuccess?: () => void;
};

export function ConcernsForm({ onSubmit, onSuccess }: ConcernsFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    // TODO: add submit logic
  };

  return (
    <section className="flex gap-2 flex-col md:flex-row md:items-center justify-end bg-white py-1.5 px-[14px] rounded-[11px] w-full">
      <h4 className="text-sm font-medium whitespace-nowrap">
        Avez-vous des préoccupations ?
      </h4>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-lg w-full flex items-center gap-2"
        >
          <div className="relative max-w-xl w-full">
            <FormField
              control={form.control}
              name="message"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ecrivez votre message"
                        className="w-full h-10 rounded-[9px] text-xs pr-10"
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
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-[#767676] h-8 w-8 hover:bg-transparent"
              disabled={form.formState.isSubmitting}
            >
              <Send className="size-4" />
            </Button>
          </div>
          <ChevronDown className="size-4 text-[#767676] shrink-0" />
        </form>
      </Form>
    </section>
  );
}
