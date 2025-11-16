import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { DashboardMain } from "@/components/dashboard/dashboard-main";
import {
  LayoutPanelLeft,
  Forward,
  Link,
  Wallet,
  MapPinHouse,
  Download,
  ArrowLeftRight,
  ChevronsLeftRightEllipsis,
  MessageCircle,
  Users,
} from "lucide-react";

const menuItems = [
  {
    label: "Serenity Space",
    href: "/",
    icon: <LayoutPanelLeft className="size-5 stroke-[3px]" />,
  },
  {
    label: "Envoi d'argent",
    href: "/send-money",
    icon: <Forward className="size-5 stroke-[4px]" />,
  },
  {
    label: "Lieu de paiement",
    href: "/payment-location",
    icon: <Link className="size-5 stroke-[3px]" />,
  },
  {
    label: "Comptes",
    href: "/accounts",
    icon: <Wallet className="size-5 stroke-[3px]" />,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: <ArrowLeftRight className="size-5 stroke-[3px]" />,
  },
  {
    label: "Points de vente",
    href: "/points-de-vente",
    icon: <MapPinHouse className="size-5 stroke-[3px]" />,
  },
  {
    label: "Approvisionnement",
    href: "/supply",
    icon: <Download className="size-5 stroke-[3px]" />,
  },
  {
    label: "Intégration",
    href: "/integration",
    icon: <ChevronsLeftRightEllipsis className="size-5 stroke-[3px]" />,
  },
  {
    label: "Support",
    href: "/support",
    icon: <MessageCircle className="size-5 stroke-[3px]" />,
  },
  {
    label: "Equipes",
    href: "/teams",
    icon: <Users className="size-5 stroke-[3px]" />,
  },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F4F4F7] min-h-screen flex flex-col justify-between">
      <DashboardHeader />
      <DashboardMain>{children}</DashboardMain>
      <DashboardFooter menuItems={menuItems} />
    </div>
  );
}

export default DashboardLayout;
