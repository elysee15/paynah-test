"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Smartphone, Building2, Building, LucideIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/libs/utils";

type TransactionMethod = "mobile-money" | "virement" | "versement";

type TransactionMethodOption = {
  value: TransactionMethod;
  id: string;
  icon: LucideIcon;
  label: string;
  showLabel: boolean;
};

const TRANSACTION_METHODS: TransactionMethodOption[] = [
  {
    value: "mobile-money",
    id: "mobile-money",
    icon: Smartphone,
    label: "Mobile money",
    showLabel: true,
  },
  {
    value: "virement",
    id: "virement",
    icon: Building2,
    label: "Virement",
    showLabel: true,
  },
  {
    value: "versement",
    id: "versement",
    icon: Building,
    label: "Versement",
    showLabel: true,
  },
];

type OperatorCountry = {
  code: string;
  name: string;
  flag: string;
};

type Operator = {
  id: string;
  name: string;
  icon?: string;
};

const COUNTRIES: OperatorCountry[] = [
  {
    code: "CI",
    name: "Côte d'Ivoire",
    flag: "/icons/flag-ci.jpg",
  },
];

const OPERATORS: Operator[] = [
  {
    id: "1",
    name: "Wave",
    icon: "/icons/wave.jpeg",
  },
];

const formSchema = z.object({
  transactionMethod: z.enum(["mobile-money", "virement", "versement"], {
    required_error: "Veuillez sélectionner une méthode de transaction",
  }),
  country: z.string().min(1, { message: "Veuillez sélectionner un pays" }),
  operator: z
    .string()
    .min(1, { message: "Veuillez sélectionner un opérateur" }),
  accountNumber: z
    .string()
    .min(1, { message: "Le numéro de compte est requis" })
    .min(5, {
      message: "Le numéro de compte doit contenir au moins 5 caractères",
    }),
});

type FormValues = z.infer<typeof formSchema>;

type RechargementFormProps = {
  onSubmit?: (values: FormValues) => void | Promise<void>;
  defaultValues?: Partial<FormValues>;
};

export function RechargementForm({
  onSubmit,
  defaultValues,
}: RechargementFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionMethod: defaultValues?.transactionMethod || "mobile-money",
      country: defaultValues?.country || COUNTRIES[0]?.code || "",
      operator: defaultValues?.operator || "",
      accountNumber: defaultValues?.accountNumber || "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const countryValue = useWatch({
    control: form.control,
    name: "country",
  });

  const selectedCountry = COUNTRIES.find((c) => c.code === countryValue);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <FormField
            control={form.control}
            name="transactionMethod"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid grid-cols-3 gap-3 place-items-center px-3"
                    >
                      {TRANSACTION_METHODS.map((method) => {
                        const Icon = method.icon;
                        return (
                          <div
                            key={method.id}
                            className={cn(
                              "relative flex flex-col items-center justify-center gap-1.5",
                              method.showLabel ? "text-center" : ""
                            )}
                          >
                            <RadioGroupItem
                              value={method.value}
                              id={method.id}
                              className="hidden peer"
                            />
                            <label
                              htmlFor={method.id}
                              className={cn(
                                "flex flex-col items-center justify-center gap-3 h-16 aspect-square rounded-xl border-2 cursor-pointer transition-all hover:bg-gray-200",
                                "peer-data-[state=checked]:border-black peer-data-[state=checked]:text-black peer-data-[state=checked]:bg-white",
                                "peer-data-[state=unchecked]:border peer-data-[state=unchecked]:border-[#EAEAEA] peer-data-[state=unchecked]:text-[#707071] peer-data-[state=unchecked]:bg-[#F2F2F2]"
                              )}
                            >
                              <div className="relative">
                                <Icon className="size-6" />
                              </div>
                              {!method.showLabel && (
                                <span className="text-sm font-medium sr-only">
                                  {method.label}
                                </span>
                              )}
                            </label>
                            <span
                              className={cn(
                                "text-xs font-medium whitespace-nowrap",
                                "peer-data-[state=checked]:text-black",
                                "peer-data-[state=unchecked]:text-[#707070]"
                              )}
                            >
                              {method.label}
                            </span>
                          </div>
                        );
                      })}
                    </RadioGroup>
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
            name="country"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Pays opérateur</FieldLabel>
                <FieldContent>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          {selectedCountry && (
                            <span className="flex items-center gap-2">
                              <Image
                                src={selectedCountry.flag}
                                alt="Country flag"
                                width={20}
                                height={20}
                                className="rounded-[3px]"
                              />
                              <span>{selectedCountry.name}</span>
                            </span>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <span className="flex items-center gap-2">
                              <Image
                                src={country.flag}
                                alt="Country flag"
                                width={20}
                                height={20}
                                className="rounded-[3px]"
                              />
                              <span>{country.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FieldError
                    errors={fieldState.error ? [fieldState.error] : []}
                  />
                </FieldContent>
              </Field>
            )}
          />

          <div className="flex gap-3">
            <FormField
              control={form.control}
              name="operator"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="w-[25%] shrink-0"
                >
                  <FieldLabel>Opérateur</FieldLabel>
                  <FieldContent>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionnez un opérateur">
                            {field.value && (
                              <span>
                                {OPERATORS.find((op) => op.id === field.value)
                                  ?.icon && (
                                  <Image
                                    src={
                                      OPERATORS.find(
                                        (op) => op.id === field.value
                                      )?.icon || ""
                                    }
                                    alt="Operator icon"
                                    width={30}
                                    height={30}
                                    className="rounded"
                                  />
                                )}
                              </span>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {OPERATORS.map((op) => (
                            <SelectItem key={op.id} value={op.id}>
                              <span className="flex items-center gap-2">
                                {op.icon && (
                                  <Image
                                    src={op.icon}
                                    alt={`${op.name} icon`}
                                    width={20}
                                    height={20}
                                    className="rounded"
                                  />
                                )}
                                <span>{op.name}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
              name="accountNumber"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-[75%]">
                  <FieldLabel>Numéro de compte</FieldLabel>
                  <FieldContent>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Entrez le numéro de compte"
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
          </div>

          <Button
            type="submit"
            className="w-full rounded-full bg-black text-white hover:bg-black/90"
            size="lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Traitement..."
              : "Initier le rechargement"}
          </Button>
        </FieldGroup>
      </form>
    </Form>
  );
}
