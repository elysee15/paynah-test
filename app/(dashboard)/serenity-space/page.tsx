import BankCard from "@/components/serenity-space/bank-card";
import PointOfSalesList from "@/components/serenity-space/point-of-sales-list";
import { MetricCards } from "@/components/serenity-space/metric-cards";
import RecentOperations from "@/components/serenity-space/recent-operations";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { QuickOperations } from "@/components/serenity-space/quick-operations";
import { ConcernsForm } from "@/components/serenity-space/concerns-form";

function SerenityPage() {
  return (
    <>
      <header className="flex items-center justify-between flex-col lg:flex-row gap-2">
        <h1 className="text-xl md:text-2xl text-[#767676] font-medium w-full">
          Serenity space
        </h1>

        <div className="hidden md:block w-full">
          <ConcernsForm />
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(300px,300px)_minmax(500px,1fr)_minmax(300px,300px)] gap-4 grow">
        <section className="flex flex-col gap-4">
          <div className="flex gap-4 *:w-full">
            <BankCard />
            <div className="grid-cols-2 gap-4 hidden md:grid lg:hidden">
              <Button
                variant="outline"
                className="w-full border-[#767676] gap-0 bg-[#F4F4F7]! shadow-none h-40 whitespace-normal flex flex-col items-center justify-center text-xs text-[#767676] border-dashed"
              >
                <PlusIcon className="size-6 stroke-[2px]" />
                Ajouter un nouveau client
              </Button>
              <MetricCards />
            </div>
          </div>
          <QuickOperations />
        </section>
        <article className="flex flex-col gap-4">
          <section className="grid md:hidden lg:grid md:grid-cols-4 grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="w-full border-[#767676] gap-0 bg-[#F4F4F7]! shadow-none h-40 whitespace-normal flex flex-col items-center justify-center text-xs text-[#767676] border-dashed"
            >
              <PlusIcon className="size-6 stroke-[2px]" />
              Ajouter un nouveau client
            </Button>
            <MetricCards />
          </section>
          <section className="grow">
            <RecentOperations />
          </section>
        </article>
        <section>
          <PointOfSalesList />
        </section>
      </div>
    </>
  );
}

export default SerenityPage;
