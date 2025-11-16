import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href={ROUTES.HOME}
      className={cn("no-underline relative inline-block h-[45px]", className)}
    >
      <Image
        src="/icons/paynah.svg"
        alt="Paynah's logo"
        width={100}
        height={100}
      />
      <span className="text-xl font-extralight absolute bottom-0 right-0">
        PRO
      </span>
    </Link>
  );
}

export default Logo;
