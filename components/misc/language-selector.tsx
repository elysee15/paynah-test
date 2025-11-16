"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Language = {
  code: string;
  label: string;
  icon?: string;
};

type LanguageSelectorProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

const DEFAULT_LANGUAGES: Language[] = [
  {
    code: "fr",
    label: "Français",
    icon: "/icons/globe.svg",
  },
  {
    code: "en",
    label: "English",
    icon: "/icons/globe.svg",
  },
];

function LanguageOption({ language }: { language: Language }) {
  return (
    <span className="flex items-center gap-1 text-sm">
      {language.icon && (
        <Image src={language.icon} alt="Globe" width={16} height={16} />
      )}
      {language.label}
    </span>
  );
}

export function LanguageSelector({
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
}: LanguageSelectorProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue || DEFAULT_LANGUAGES[0]?.code || ""
  );

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const selectedLanguage =
    DEFAULT_LANGUAGES.find((lang) => lang.code === currentValue) ||
    DEFAULT_LANGUAGES[0];

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <Select value={currentValue} onValueChange={handleValueChange}>
      <SelectTrigger
        className={cn(
          "text-sm border-none shadow-none font-medium text-[#626262] w-fit h-auto py-1",
          className
        )}
      >
        <SelectValue>
          <LanguageOption language={selectedLanguage} />
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {DEFAULT_LANGUAGES.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <LanguageOption language={lang} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
