"use client";

import { Wallet, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  balance: number;
  currency?: string;
  icon?: React.ReactNode;
  className?: string;
  onMenuClick?: () => void;
}

function MetricCard({
  title,
  balance,
  currency = "XOF",
  icon,
  className,
  onMenuClick,
}: MetricCardProps) {
  return (
    <article
      className={cn(
        "relative bg-white p-4 2xl:p-5 rounded-[30px] h-40",
        className
      )}
    >
      <div className="flex flex-col justify-between h-full gap-4">
        <header className="flex items-start justify-between">
          <div className="flex gap-1.5 flex-col">
            <figure
              className="size-10 rounded-[12px] bg-[#F0F0F0] flex items-center justify-center shrink-0"
              aria-hidden="true"
            >
              {icon || <Wallet className="size-5 text-[#767676]" />}
            </figure>
            <h3 className="text-xs font-medium text-[#626262]">{title}</h3>
          </div>

          <nav aria-label={`Actions pour ${title}`}>
            <button
              type="button"
              className="text-[#767676] hover:text-[#555] outline-none transition-colors p-1"
              onClick={onMenuClick}
              aria-label={`Menu d'actions pour ${title}`}
              aria-haspopup="true"
            >
              <MoreVertical className="size-4" aria-hidden="true" />
            </button>
          </nav>
        </header>

        <section
          className="flex flex-col gap-0.5"
          aria-label="Solde disponible"
        >
          <p className="text-[10px] text-[#767676] font-medium">
            Solde disponible
          </p>
          <p className="text-base font-bold leading-none">
            {balance.toLocaleString()} {currency}
          </p>
        </section>
      </div>
    </article>
  );
}

export default MetricCard;
