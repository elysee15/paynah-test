import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
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
            <h1 className="text-8xl font-bold text-[#767676]">404</h1>
            <h2 className="text-2xl font-semibold text-[#767676]">
              Page non trouvée
            </h2>
            <p className="text-base text-muted-foreground">
              La page que vous recherchez n&apos;existe pas ou a été déplacée.
            </p>
          </section>

          <nav className="pt-4">
            <Button asChild size="lg">
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
