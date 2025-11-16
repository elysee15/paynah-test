"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LockIcon from "../icons/lock";
import Image from "next/image";

function BankCard() {
  return (
    <article
      className={
        "relative overflow-hidden rounded-2xl bg-[#1a1a1a] p-5 text-white shadow-lg aspect-[1.586/1] min-h-48"
      }
    >
      <Image
        src="/images/paynah-bg-pattern.svg"
        alt="Paynah background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-[#0C0C0C]/70 to-transparent" />

      <div className="relative z-10 flex flex-col gap-4 justify-between h-full">
        <article className="flex items-start justify-between">
          <section className="flex gap-2 grow">
            <div>
              <h3 className="text-sm font-medium text-white">
                Compte principal
              </h3>
              <p className="text-xs leading-none text-gray-400">PA4839CI</p>
            </div>
            <div>
              <Select defaultValue="xof">
                <SelectTrigger className="bg-[#2E2E2E] rounded-[14px] border-none text-white hover:bg-gray-800/70 py-0 h-6! px-2 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xof">Franc CFA</SelectItem>
                  <SelectItem value="eur">Euro</SelectItem>
                  <SelectItem value="usd">Dollar US</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <button className="text-white hover:opacity-80 transition-opacity">
            <LockIcon className="size-4" />
          </button>
        </article>

        <article className="flex flex-col gap-1.5">
          <section className="flex flex-col">
            <h2 className="text-xs font-normal text-gray-400 leading-none">
              Solde
            </h2>
            <p className="text-lg font-bold text-white">7 873 456 XOF</p>
          </section>

          <section className="flex flex-col">
            <h2 className="text-xs font-normal text-gray-400 leading-none">
              Solde disponible
            </h2>
            <p className="text-lg font-bold text-white">6 873 456 XOF</p>
          </section>
        </article>
      </div>
    </article>
  );
}

export default BankCard;
