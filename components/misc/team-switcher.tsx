"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type Team = {
  id: string;
  name: string;
  logo?: string;
  ref?: string;
};

type TeamSwitcherProps = {
  teams: Team[];
  selectedTeam?: Team;
  onTeamChange?: (team: Team) => void;
  className?: string;
};

export function TeamSwitcher({
  teams,
  selectedTeam,
  onTeamChange,
  className,
}: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const currentTeam = selectedTeam || teams[0];

  const handleSelect = (team: Team) => {
    onTeamChange?.(team);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 rounded-[15px] border border-[#CFCFCF] bg-[#FAFAFA] p-1.5 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            className
          )}
        >
          <Avatar className="size-10">
            {currentTeam.logo && (
              <AvatarImage src={currentTeam.logo} alt={currentTeam.name} />
            )}
            <AvatarFallback className="text-xs">
              {currentTeam.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left ml-2.5">
            <span className="font-medium">{currentTeam.name}</span>
            {currentTeam.ref && (
              <span className="text-xs text-[#767676]">{currentTeam.ref}</span>
            )}
          </div>
          <ChevronDown className="ml-auto size-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Rechercher..." />
          <CommandList>
            <CommandEmpty>Aucun élément trouvé.</CommandEmpty>
            <CommandGroup>
              {teams.map((team) => (
                <CommandItem
                  key={team.id}
                  value={team.name}
                  onSelect={() => handleSelect(team)}
                  className="flex items-center gap-2"
                >
                  <Avatar className="size-5">
                    {team.logo && (
                      <AvatarImage src={team.logo} alt={team.name} />
                    )}
                    <AvatarFallback className="text-xs">
                      {team.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="flex-1">{team.name}</span>
                  {currentTeam.id === team.id && (
                    <Check className="size-4 text-primary" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
