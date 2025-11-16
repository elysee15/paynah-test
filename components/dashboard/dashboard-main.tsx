type DashboardMainProps = {
  children: React.ReactNode;
};

export function DashboardMain({ children }: DashboardMainProps) {
  return (
    <main className="grow px-5 md:px-10 md:py-5 py-4 flex flex-col">
      <div className="flex-1 flex flex-col md:gap-4 gap-3">{children}</div>
    </main>
  );
}

