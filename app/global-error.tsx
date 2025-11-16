"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen relative justify-between">
      <main className="px-5 container mx-auto size-full grow flex flex-col justify-center items-center z-10">
        <article className="w-full max-w-md text-center space-y-6">
          <header className="flex justify-center mb-8">
            <Image
              src="/icons/paynah.svg"
              alt="Paynah's logo"
              width={150}
              height={150}
              className="h-auto"
            />
          </header>

          <section className="space-y-4">
            <h1 className="text-8xl font-bold text-[#767676]">500</h1>
            <h2 className="text-2xl font-semibold text-[#767676]">
              Une erreur s&apos;est produite
            </h2>
            <p className="text-base text-muted-foreground">
              Désolé, une erreur inattendue s&apos;est produite. Veuillez
              réessayer.
            </p>
          </section>

          <nav className="pt-4 flex flex-col gap-3">
            <Button onClick={reset} size="lg">
              <RefreshCw className="size-5" />
              Réessayer
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/" className="no-underline">
                <ArrowLeft className="size-5" />
                Retour à l&apos;accueil
              </Link>
            </Button>
          </nav>
        </article>
      </main>
      <Image
        src="/images/paynah-bg-pattern.svg"
        alt="Paynah's background pattern"
        fill
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
