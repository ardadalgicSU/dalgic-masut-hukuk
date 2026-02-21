"use client";

import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, ChevronDown, ChevronUp } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { FAQ } from "@/lib/types";

type FAQAccordionProps = {
  faqs: FAQ[];
};

const INITIAL_VISIBLE_COUNT = 6;

const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null);
  const [showAll, setShowAll] = useState(false);
  const hasFaqs = faqs.length > 0;
  const limitedFaqs = useMemo(() => faqs.slice(0, INITIAL_VISIBLE_COUNT), [faqs]);
  const visibleFaqs = showAll ? faqs : limitedFaqs;

  useEffect(() => {
    if (!showAll && openId && !limitedFaqs.some((faq) => faq.id === openId)) {
      setOpenId(limitedFaqs[0]?.id ?? null);
    }
  }, [showAll, openId, limitedFaqs]);

  const handleToggle = (faqId: number) => {
    setOpenId((current) => (current === faqId ? null : faqId));
  };

  if (!hasFaqs) {
    return null;
  }

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">
            Sıkça Sorulan Sorular
          </span>
          <h2 className="mt-3 font-heading text-3xl text-gray-900 md:text-4xl">
            Hukuki süreçler hakkında merak edilenler
          </h2>
        </div>
        <div className="mt-10 divide-y divide-gray-200 rounded-3xl border border-gray-200 bg-white">
          {visibleFaqs.map((faq) => {
            const isOpen = faq.id === openId;

            return (
              <button
                key={faq.id}
                type="button"
                className="w-full text-left"
                onClick={() => handleToggle(faq.id)}
              >
                <div className="flex items-center justify-between px-6 py-6">
                  <div>
                    <p className="text-base font-semibold text-gray-900">
                      {faq.question}
                    </p>
                    {isOpen && (
                      <div
                        className="mt-3 text-sm text-gray-600"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.answer) }}
                      />
                    )}
                  </div>
                  <div className="rounded-full border border-gray-200 p-2 text-brand">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {faqs.length > INITIAL_VISIBLE_COUNT && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-brand px-5 py-2 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Daha az göster" : "Tüm soruları göster"}
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQAccordion;
