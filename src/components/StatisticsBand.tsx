import { Statistic } from "@/lib/types";

type StatisticsBandProps = {
  statistics: Statistic[];
};

const StatisticsBand = ({ statistics }: StatisticsBandProps) => {
  if (!statistics.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gray-100 py-32">

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {statistics.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center px-6 text-center"
            >
              <p className="font-heading text-4xl font-bold text-brand lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-gray-800">
                {stat.label}
              </p>
              {stat.description && (
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{stat.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsBand;
