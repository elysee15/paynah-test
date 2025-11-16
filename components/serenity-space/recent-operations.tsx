"use client";

import { useState, useMemo, RefObject } from "react";
import { Send, ChevronRight, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useDynamicHeight } from "@/lib/hooks/use-dynamic-height";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/datatable";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type OperationType = "debit" | "credit";
type OperationStatus = "completed" | "in_progress" | "failed" | "expired";

type Operation = {
  id: string;
  description: string;
  reference: string;
  amount: number;
  date: string;
  status: OperationStatus;
};

const mockOperations: Operation[] = [
  {
    id: "1",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: -5000,
    date: "18 Fev 11:00",
    status: "completed",
  },
  {
    id: "2",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: 30000,
    date: "10 Fev 18:00",
    status: "completed",
  },
  {
    id: "3",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: 50000,
    date: "20 Jan 18:00",
    status: "in_progress",
  },
  {
    id: "4",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: -50000,
    date: "20 Jan 18:00",
    status: "failed",
  },
  {
    id: "5",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: -10000,
    date: "20 Jan 18:00",
    status: "expired",
  },
  {
    id: "6",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: 50000,
    date: "20 Jan 18:00",
    status: "completed",
  },
  {
    id: "7",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: -20000,
    date: "20 Jan 18:00",
    status: "completed",
  },
  {
    id: "8",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: 50000,
    date: "20 Jan 18:00",
    status: "in_progress",
  },
  {
    id: "9",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: 50000,
    date: "20 Jan 18:00",
    status: "completed",
  },
  {
    id: "10",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: 50000,
    date: "20 Jan 18:00",
    status: "completed",
  },
  {
    id: "11",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: 50000,
    date: "20 Jan 18:00",
    status: "completed",
  },
  {
    id: "12",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: 50000,
    date: "20 Jan 18:00",
    status: "completed",
  },
  {
    id: "13",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: 50000,
    date: "20 Jan 18:00",
    status: "completed",
  },
  {
    id: "14",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: 50000,
    date: "20 Jan 18:00",
    status: "completed",
  },
  {
    id: "15",
    description: "Envoi à Ben Ismael Diomande | Visa ****1093",
    reference: "TZ09XY263UI",
    amount: 50000,
    date: "20 Jan 18:00",
    status: "completed",
  },
];

const columns: ColumnDef<Operation>[] = [
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const operation = row.original;
      return (
        <article className="flex items-center gap-2.5">
          <div className="size-7 rounded-[5px] bg-[#D8F7FF] flex items-center justify-center">
            <Send className="size-3 text-black" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[13px] text-black leading-none">
              {operation.description}
            </p>
            <p className="text-[11px] text-black leading-none">
              Ref {operation.reference}
            </p>
          </div>
        </article>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Montant",
    cell: ({ row }) => {
      const operation = row.original;
      const isNegative = operation.amount < 0;
      const formattedAmount = Math.abs(operation.amount).toLocaleString(
        "fr-FR"
      );
      return (
        <span
          className={cn(
            "font-medium",
            isNegative ? "text-[#FF0000]" : "text-teal-600"
          )}
        >
          {isNegative ? "-" : ""}
          {formattedAmount} FCFA
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">{row.getValue("date")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const operation = row.original;
      const statusConfig = {
        completed: {
          label: "Effectué",
          className: "bg-green-100 text-green-700 hover:bg-green-100",
        },
        in_progress: {
          label: "En cours",
          className: "bg-orange-100 text-orange-700 hover:bg-orange-100",
        },
        failed: {
          label: "Echoué",
          className: "bg-red-100 text-red-700 hover:bg-red-100",
        },
        expired: {
          label: "Expiré",
          className: "bg-gray-100 text-gray-600 hover:bg-gray-100",
        },
      };
      const status = statusConfig[operation.status];
      return (
        <Badge
          variant="outline"
          className={cn(
            "rounded-full px-3 py-0.5 text-[11px] font-normal border-none",
            status.className
          )}
        >
          {status.label}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: () => (
      <Button
        variant="ghost"
        size="icon"
        className="text-[#626262] transition-colors size-6 bg-[#F0F0F0] rounded-full"
      >
        <MoreVertical className="size-3" />
      </Button>
    ),
  },
];

function RecentOperations() {
  const [operationType, setOperationType] = useState<OperationType>("debit");
  const { containerRef, headerRef, calculatedHeight } = useDynamicHeight({
    gap: 16,
    padding: 48,
  });

  const filteredOperations = useMemo(
    () =>
      mockOperations.filter((op) => {
        if (operationType === "debit") {
          return op.amount < 0;
        }
        return op.amount > 0;
      }),
    [operationType]
  );

  return (
    <article
      ref={containerRef}
      className="flex flex-col gap-4 rounded-[15px] bg-white py-6 h-full min-h-[400px] sm:min-h-[350px] 2xl:min-h-full"
    >
      <header ref={headerRef}>
        <section className="flex items-center justify-between px-6">
          <h2 className="text-base md:text-xl font-medium">
            Opérations récentes
          </h2>

          <RadioGroup
            value={operationType}
            onValueChange={(value) => setOperationType(value as OperationType)}
            className="items-center gap-2.5 rounded-lg p-1 hidden md:flex"
          >
            <div className="flex items-center gap-1">
              <RadioGroupItem
                value="debit"
                id="debit"
                className="hidden peer"
              />
              <label
                htmlFor="debit"
                className={cn(
                  "px-4 py-1.5 text-xs border-[0.2px] rounded-full font-medium transition-colors cursor-pointer",
                  "peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white",
                  "peer-data-[state=unchecked]:border-[#626262]!"
                )}
              >
                Débit
              </label>
            </div>
            <div className="flex items-center gap-1">
              <RadioGroupItem
                value="credit"
                id="credit"
                className="hidden peer"
              />
              <label
                htmlFor="credit"
                className={cn(
                  "px-4 py-1.5 text-xs border-[0.2px] rounded-full border-transparent font-medium transition-colors cursor-pointer",
                  "peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white",
                  "peer-data-[state=unchecked]:border-[#626262]!"
                )}
              >
                Crédit
              </label>
            </div>
          </RadioGroup>
          <button className="flex items-center gap-1 text-sm text-[#909090] hover:text-gray-900 transition-colors">
            Voir tout
            <ChevronRight className="size-4" />
          </button>
        </section>
        <RadioGroup
          value={operationType}
          onValueChange={(value) => setOperationType(value as OperationType)}
          className="items-center gap-2.5 rounded-lg p-1 flex md:hidden justify-center"
        >
          <div className="flex items-center gap-1">
            <RadioGroupItem value="debit" id="debit" className="hidden peer" />
            <label
              htmlFor="debit"
              className={cn(
                "px-4 py-1.5 text-xs border-[0.2px] rounded-full font-medium transition-colors cursor-pointer",
                "peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white",
                "peer-data-[state=unchecked]:border-[#626262]!"
              )}
            >
              Débit
            </label>
          </div>
          <div className="flex items-center gap-1">
            <RadioGroupItem
              value="credit"
              id="credit"
              className="hidden peer"
            />
            <label
              htmlFor="credit"
              className={cn(
                "px-4 py-1.5 text-xs border-[0.2px] rounded-full border-transparent font-medium transition-colors cursor-pointer",
                "peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white",
                "peer-data-[state=unchecked]:border-[#626262]!"
              )}
            >
              Crédit
            </label>
          </div>
        </RadioGroup>
      </header>

      <div
        className={cn("overflow-auto flex flex-col h-full grow")}
        style={{ height: `${calculatedHeight}px` }}
      >
        <DataTable columns={columns} data={filteredOperations} />
      </div>
    </article>
  );
}

export default RecentOperations;
