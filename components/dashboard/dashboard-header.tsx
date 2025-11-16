"use client";

import { useState } from "react";
import Image from "next/image";
import LockIcon from "@/components/icons/lock";
import { TeamSwitcher } from "@/components/misc/team-switcher";
import { ConcernsForm } from "../serenity-space/concerns-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

type Team = {
  id: string;
  name: string;
  logo?: string;
  ref?: string;
};

const teams: Team[] = [
  {
    id: "1",
    name: "Paynah PRO",
    ref: "Npa487738CI",
    logo: "/icons/total-energies.svg",
  },
  {
    id: "2",
    name: "Acme Inc.",
    ref: "Npa487738CI",
    logo: "/icons/total-energies.svg",
  },
  {
    id: "3",
    name: "Startup Co.",
    ref: "Npa487738CI",
    logo: "/icons/total-energies.svg",
  },
];

export function DashboardHeader() {
  const [selectedTeam, setSelectedTeam] = useState<Team>(teams[0]);

  return (
    <>
      <header className="py-3 border-b border-[#D3D3D3] bg-white">
        <div className="flex items-center justify-between w-full gap-4 px-5 md:px-10 md:mx-auto">
          <p className="font-bold shrink-0">
            <Image
              src="/icons/mini-logo.svg"
              alt="Paynah"
              width={50}
              height={50}
            />
          </p>
          <div className="flex items-center gap-3 md:gap-10">
            <ul className="list-none m-0 *:mb-0 hidden md:flex md:flex-col">
              <li className="flex items-center gap-2">
                <span className="text-[#909090]">Solde : </span>
                <span className="font-bold">1000000 FCFA</span>{" "}
                <LockIcon className="size-4" />
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#909090]">Solde disponible : </span>
                <span className="font-bold flex items-center gap-2">
                  <span>**********</span> <LockIcon className="size-4" />
                </span>
              </li>
            </ul>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-[#767676]"
                >
                  <MessageCircle className="size-5" />
                  <span className="sr-only">
                    Avez-vous des préoccupations ?
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[calc(100vw-2rem)] max-w-md p-4"
                align="end"
              >
                <ConcernsForm />
              </PopoverContent>
            </Popover>
            <TeamSwitcher
              teams={teams}
              selectedTeam={selectedTeam}
              onTeamChange={setSelectedTeam}
            />
          </div>
        </div>
      </header>
    </>
  );
}
