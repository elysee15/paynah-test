"use client";

import Logo from "@/components/misc/logo";
import { LanguageSelector } from "@/components/misc/language-selector";
import { ROUTES } from "@/libs/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

function AuthLayout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen relative justify-between">
      <div className="px-5 container mx-auto size-full grow flex flex-col justify-between z-10">
        <header className="py-5 flex items-center justify-between">
          <Logo />
          <section className="flex items-center">
            <LanguageSelector className="flex md:hidden" />
            <ThemeSwitcher />
          </section>
        </header>
        <main className="grow flex items-center justify-center z-10 py-10">
          <article className="w-full max-w-md">{children}</article>
        </main>
        <footer className="flex items-center md:justify-between justify-center gap-4 py-3 z-10">
          <LanguageSelector className="hidden md:flex" />

          <p className="text-sm font-light text-center md:text-left leading-relaxed">
            <span>Copyright © {currentYear} Paynah. Tous droits réservés</span>{" "}
            <span className="hidden md:inline">|</span>{" "}
            <Link href={ROUTES.PRIVACY} className="font-light">
              Politique de confidentialité
            </Link>
          </p>
        </footer>
      </div>
      <Image
        src="/images/paynah-bg-pattern.svg"
        alt="Paynah's background pattern"
        fill
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

export default AuthLayout;
