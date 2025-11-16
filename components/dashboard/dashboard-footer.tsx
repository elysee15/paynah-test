"use client";

import Logo from "@/components/misc/logo";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink } from "@/components/ui/nav-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/libs/utils";
import { useScrollIndicator } from "@/libs/hooks/use-scroll-indicator";

type MenuItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type DashboardFooterProps = {
  menuItems: MenuItem[];
};

export function DashboardFooter({ menuItems }: DashboardFooterProps) {
  const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
    useScrollIndicator(200);

  return (
    <footer className="sticky bottom-3 md:bottom-5 bg-white mx-5 md:mx-10 px-5 py-2 md:py-3 rounded-[15px] mb-3 md:mb-5 md:gap-6 gap-3 flex items-center justify-between shadow-2xl md:shadow-[0px_-6px_20px_0px_rgba(0,0,0,0.01)]">
      <Logo className="hidden md:block shrink-0" />
      <section className="relative flex items-center justify-center w-full grow min-w-0 max-w-xl lg:max-w-4xl ">
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-4 z-10 h-8 w-8 rounded-full bg-white dark:bg-black/80 shadow-md hover:bg-gray-100"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="size-4" />
          </Button>
        )}
        <TooltipProvider>
          <ul
            ref={scrollRef}
            className="list-none m-0 *:mb-0 flex items-center justify-center-safe gap-3 overflow-x-auto scrollbar-hide scroll-smooth w-full"
          >
            {menuItems.map((item) => (
              <li key={item.label} className="shrink-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <NavLink
                      href={item.href}
                      activeClassName="bg-black! text-white"
                      className="size-11 md:size-12 bg-[#FAFAFA] group transition-all duration-300 hover:bg-[#EAEAEA] rounded-[15px] flex items-center justify-center"
                    >
                      <span className="group-hover:scale-110 transition-all duration-300">
                        {item.icon}
                      </span>
                    </NavLink>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </TooltipProvider>
        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 z-10 h-8 w-8 rounded-full bg-white dark:bg-black/80 shadow-md hover:bg-gray-100"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="size-4" />
          </Button>
        )}
      </section>
      <section className="shrink-0 flex items-center md:gap-2">
        <NavLink
          href="/settings"
          activeClassName="bg-black! text-white"
          className="size-11 md:size-12 group transition-all duration-300 hover:bg-[#EAEAEA] hover:text-black rounded-[15px] flex items-center justify-center"
        >
          <span className="group-hover:scale-110 transition-all duration-300">
            <Settings className="size-5 md:size-6" />
          </span>
        </NavLink>
        <Avatar className="size-12 rounded-[15px] bg-[#FFC5AF]">
          <AvatarImage
            src="/icons/avatar.svg"
            alt="Avatar"
            className="rounded-[15px]"
          />
          <AvatarFallback className="rounded-[15px] bg-[#FFC5AF] text-[#FF723B] font-medium">
            {getInitials("John", "Doe")}
          </AvatarFallback>
        </Avatar>
      </section>
    </footer>
  );
}
