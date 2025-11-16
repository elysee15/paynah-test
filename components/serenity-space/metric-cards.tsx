import MetricCard from "./metric-card";

type MetricData = {
  title: string;
  balance: number;
  currency?: string;
};

type MetricCardsProps = {
  metrics?: MetricData[];
};

const defaultMetrics: MetricData[] = [
  {
    title: "Salaire Corporate",
    balance: 2873456,
    currency: "XOF",
  },
  {
    title: "Salaire pompiste",
    balance: 1873456,
    currency: "XOF",
  },
  {
    title: "Factures",
    balance: 6873456,
    currency: "XOF",
  },
];

export function MetricCards({ metrics = defaultMetrics }: MetricCardsProps) {
  return (
    <>
      {metrics.map((metric) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          balance={metric.balance}
          currency={metric.currency}
        />
      ))}
    </>
  );
}
