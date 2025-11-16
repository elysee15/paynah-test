"use client";

import { Link, CreditCard, Globe, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useDynamicHeight } from "@/lib/hooks/use-dynamic-height";
import { ScrollArea } from "../ui/scroll-area";
import CircleStar from "../icons/circle-star";

type PointOfSale = {
  id: string;
  name: string;
  description?: string;
  icon: "link" | "terminal" | "globe";
  isDefault?: boolean;
  status: "active" | "inactive";
};

const mockData: PointOfSale[] = [
  {
    id: "default",
    name: "Point de vente par défaut",
    description: "Lien de paiement",
    icon: "link",
    isDefault: true,
    status: "active",
  },
  {
    id: "23840349",
    name: "TPE Vallon 1",
    icon: "terminal",
    status: "active",
  },
  {
    id: "ONL4593",
    name: "Timbre ONECI",
    icon: "globe",
    status: "inactive",
  },
  {
    id: "23840350",
    name: "TPE Vallon 1",
    icon: "terminal",
    status: "active",
  },
  {
    id: "23840351",
    name: "TPE Vallon 1",
    icon: "terminal",
    status: "active",
  },
  {
    id: "ONL4594",
    name: "Timbre ONECI",
    icon: "globe",
    status: "inactive",
  },
  {
    id: "23840352",
    name: "TPE Vallon 1",
    icon: "terminal",
    status: "active",
  },
  {
    id: "23840353",
    name: "TPE Vallon 1",
    icon: "terminal",
    status: "active",
  },
  {
    id: "23840354",
    name: "TPE Vallon 1",
    icon: "terminal",
    status: "active",
  },
  {
    id: "23840355",
    name: "TPE Vallon 1",
    icon: "terminal",
    status: "active",
  },
];

function PointOfSalesList() {
  const { containerRef, headerRef, calculatedHeight } = useDynamicHeight({
    gap: 16,
    padding: 48,
  });

  return (
    <article
      ref={containerRef}
      className="flex flex-col gap-4 rounded-[15px] bg-white py-6 h-full min-h-[400px] sm:min-h-[350px] 2xl:min-h-full"
    >
      <header
        ref={headerRef}
        className="flex items-center justify-between px-6"
      >
        <h2 className="text-lg font-medium">Points de vente</h2>
        <button className="flex items-center gap-1 text-sm text-[#909090] hover:text-gray-900 transition-colors">
          Voir tout
          <ChevronRight className="size-4" />
        </button>
      </header>

      <ScrollArea
        className="flex flex-col"
        style={{ height: `${calculatedHeight}px` }}
      >
        {mockData.map((pointOfSale) => (
          <PointOfSaleItem key={pointOfSale.id} pointOfSale={pointOfSale} />
        ))}
      </ScrollArea>
    </article>
  );
}

function PointOfSaleIcon({
  icon,
  isDefault,
}: {
  icon: PointOfSale["icon"];
  isDefault?: boolean;
}) {
  const iconConfig = {
    link: {
      component: Link,
      bgColor: "bg-[#FFE5D9]",
    },
    terminal: {
      component: CreditCard,
      bgColor: "bg-[#E8D5FF]",
    },
    globe: {
      component: Globe,
      bgColor: "bg-[#FFF4CC]",
    },
  };

  const { component: IconComponent, bgColor } = iconConfig[icon];

  return (
    <div
      className={cn(
        "relative 2xl:size-12 size-10 rounded-full flex items-center justify-center",
        bgColor
      )}
    >
      <IconComponent className="2xl:size-6 size-4 text-black" />
      {isDefault && (
        <span className="text-[11px] absolute bottom-0 right-0">
          <CircleStar className="size-3" />
        </span>
      )}
    </div>
  );
}

function PointOfSaleItem({ pointOfSale }: { pointOfSale: PointOfSale }) {
  return (
    <div className="flex items-center gap-4 bg-white hover:bg-[#FAFAFA]! py-2 px-6 transition-all duration-300 cursor-pointer">
      <PointOfSaleIcon
        icon={pointOfSale.icon}
        isDefault={pointOfSale.isDefault}
      />

      <div className="grow">
        <h3 className="text-[13px] font-medium text-gray-900 truncate max-w-[100px]">
          {pointOfSale.name}
        </h3>
        {pointOfSale.description && (
          <p className="text-[11px] text-gray-500">{pointOfSale.description}</p>
        )}
        {pointOfSale.id !== "default" && (
          <p className="text-xs text-gray-500">ID {pointOfSale.id}</p>
        )}
      </div>

      <Badge
        variant={pointOfSale.status === "active" ? "default" : "outline"}
        className={cn(
          "rounded-full px-4 py-0.5 text-[11px] font-normal border-none",
          pointOfSale.status === "active"
            ? "bg-green-100 text-green-700 hover:bg-green-100"
            : "bg-gray-100 text-gray-600 hover:bg-gray-100"
        )}
      >
        {pointOfSale.status === "active" ? "Actif" : "Inactif"}
      </Badge>
    </div>
  );
}

export default PointOfSalesList;
