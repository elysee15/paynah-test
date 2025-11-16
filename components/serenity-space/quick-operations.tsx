"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useDynamicHeight } from "@/lib/hooks/use-dynamic-height";
import { RechargementForm } from "./rechargement-form";

const COUNTRIES = [
  {
    code: "CI",
    name: "Côte d'Ivoire",
    flag: "🇨🇮",
  },
];

export function QuickOperations() {
  const { containerRef, headerRef } = useDynamicHeight({
    gap: 16,
    padding: 48,
  });

  const [activeTab, setActiveTab] = React.useState("rechargement");

  const handleRechargementSubmit = async (values: {
    transactionMethod: "mobile-money" | "virement" | "versement";
    country: string;
    operator: string;
    accountNumber: string;
  }) => {
    // TODO: Implement API call to submit rechargement form
    console.log("Form submitted:", values);
  };

  return (
    <article
      ref={containerRef}
      className="w-full lg:h-full flex flex-col mx-auto bg-white rounded-[15px]"
    >
      <div className="w-full lg:h-full md:max-w-md flex flex-col mx-auto p-4 bg-white rounded-[15px]">
        <header ref={headerRef} className="flex items-center justify-between">
          <h2 className="text-base md:text-xl font-medium mb-4">
            Opérations rapides
          </h2>
        </header>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full lg:h-10 grow overflow-auto max-w-md mx-auto"
        >
          <TabsList className="w-auto">
            <TabsTrigger value="envoi" disabled className="text-[11px]">
              Envoi d&apos;argent
            </TabsTrigger>
            <TabsTrigger value="lien" disabled className="text-[11px]">
              Lien de paiement
            </TabsTrigger>
            <TabsTrigger value="rechargement" className="text-[11px]">
              Rechargement
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rechargement" className="pt-2 scrollbar-hide">
            <RechargementForm
              onSubmit={handleRechargementSubmit}
              defaultValues={{
                transactionMethod: "mobile-money",
                country: COUNTRIES[0].code,
              }}
            />
          </TabsContent>

          <TabsContent value="envoi" className="pt-2 scrollbar-hide">
            <p className="text-center text-muted-foreground py-8">
              Contenu pour Envoi d&apos;argent
            </p>
          </TabsContent>

          <TabsContent value="lien" className="pt-2 scrollbar-hide">
            <p className="text-center text-muted-foreground py-8">
              Contenu pour Lien de paiement
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </article>
  );
}
