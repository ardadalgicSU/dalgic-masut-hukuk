import { Quote, Star } from "lucide-react";
import { Testimonial } from "@/lib/types";

type TestimonialsProps = {
  testimonials: Testimonial[];
};

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  if (!testimonials.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-brand py-24">
      {/* Arkaplan deseni */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-brand-dark/50 blur-3xl" />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Başlık */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-white/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              Müvekkil Yorumları
            </span>
            <div className="h-px w-8 bg-white/40" />
          </div>
          <h2 className="font-heading text-3xl text-white md:text-4xl lg:text-5xl">
            Müvekkillerimizden gelen
            <br />geri bildirimler
          </h2>
        </div>

        {/* Yorumlar */}
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
            >
              {/* Üst süs */}
              <div className="absolute inset-x-0 top-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Yıldızlar */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Tırnak işareti */}
              <Quote size={32} className="text-white/20 mb-3" />

              {/* Yorum metni */}
              <p className="flex-1 text-sm leading-relaxed text-white/80">{testimonial.quote}</p>

              {/* Kişi bilgisi */}
              <div className="mt-6 flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-heading text-white">
                  {testimonial.author.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-heading text-base text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-xs text-white/50">
                    {[testimonial.role, testimonial.company]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
