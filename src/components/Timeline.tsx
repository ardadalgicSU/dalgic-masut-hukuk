import { TimelineEvent } from "@/lib/types";

type TimelineProps = {
  events: TimelineEvent[];
};

const Timeline = ({ events }: TimelineProps) => {
  if (!events.length) {
    return null;
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center font-heading text-3xl text-gray-900 md:text-4xl">
          Yolculuğumuz
        </h2>
        <div className="mt-10 space-y-10 border-l border-brand/20 pl-6">
          {events.map((event) => (
            <div key={event.id} className="relative pl-6">
              <span className="absolute -left-3 top-1 h-6 w-6 rounded-full border-4 border-white bg-brand shadow-soft" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                {event.year}
              </p>
              <h3 className="mt-2 font-heading text-xl text-gray-900">
                {event.title}
              </h3>
              {event.description && (
                <p className="mt-2 text-sm text-gray-600">{event.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
