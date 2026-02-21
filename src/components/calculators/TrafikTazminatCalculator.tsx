"use client";

import { useState } from "react";

export type TrafikCalculatorConfig = {
  iskontoOrani?: number;
  destekPayiVarsayilan?: number;
};

type TrafikResult = {
  yillikDestekGeliri: number;
  buguneGetirilmisDeger: number;
  kusurCarpani: number;
  toplamTazminat: number;
};

const DEFAULT_ISKONTO_ORANI = 0.03;
const DEFAULT_DESTEK_PAYI = 0.5;

const formatCurrency = (value: number) =>
  value.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  });

type TrafikTazminatCalculatorProps = {
  config?: unknown;
};

const TrafikTazminatCalculator = ({ config }: TrafikTazminatCalculatorProps) => {
  const [result, setResult] = useState<TrafikResult | null>(null);
  const parsedConfig = (config as TrafikCalculatorConfig | undefined) ?? {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const aylikGelir = Number(formData.get("aylikGelir"));
    const destekSuresi = Number(formData.get("destekSuresi"));
    const kusurOrani = Number(formData.get("kusurOrani"));
    const destekPayiOrani =
      Number(formData.get("destekPayiOrani")) / 100 ||
      parsedConfig.destekPayiVarsayilan ||
      DEFAULT_DESTEK_PAYI;
    const iskontoOrani =
      Number(formData.get("iskontoOrani")) / 100 ||
      parsedConfig.iskontoOrani ||
      DEFAULT_ISKONTO_ORANI;

    if (!aylikGelir || !destekSuresi) {
      setResult(null);
      return;
    }

    const yillikDestekGeliri = aylikGelir * 12 * Math.max(destekPayiOrani, 0);
    let buguneGetirilmisDeger = 0;
    for (let yil = 1; yil <= destekSuresi; yil += 1) {
      buguneGetirilmisDeger +=
        yillikDestekGeliri / Math.pow(1 + Math.max(iskontoOrani, 0), yil);
    }

    const kusurCarpani = Math.max(0, Math.min(1, (100 - (kusurOrani || 0)) / 100));
    const toplamTazminat = Math.max(0, buguneGetirilmisDeger * kusurCarpani);

    setResult({
      yillikDestekGeliri,
      buguneGetirilmisDeger,
      kusurCarpani,
      toplamTazminat,
    });
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="font-heading text-xl text-gray-900">
        Trafik Tazminatı Hesaplayıcı
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        Destekten yoksun kalma tazminatı için gelir ve kusur oranını esas alan
        ön hesaplama aracı.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Destek Kişinin Aylık Geliri (TL)
          </label>
          <input
            type="number"
            name="aylikGelir"
            min="0"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Destek Süresi (Yıl)
          </label>
          <input
            type="number"
            name="destekSuresi"
            min="1"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Kusur Oranı (%)
          </label>
          <input
            type="number"
            name="kusurOrani"
            min="0"
            max="100"
            defaultValue={0}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Destek Payı Oranı (%)
            </label>
            <input
              type="number"
              name="destekPayiOrani"
              min="0"
              max="100"
              defaultValue={Math.round(
                (parsedConfig.destekPayiVarsayilan ?? DEFAULT_DESTEK_PAYI) * 100,
              )}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              Destekten yararlanan kişilere ayrılan pay. Örn. eş + çocuklar için %50.
            </p>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              İskonto Oranı (%)
            </label>
            <input
              type="number"
              name="iskontoOrani"
              min="0"
              step="0.01"
              defaultValue={(parsedConfig.iskontoOrani ?? DEFAULT_ISKONTO_ORANI) * 100}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              Gelecek yılların bugüne indirimi için varsayılan aktüeryal oran (%3).
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-full px-6 py-3 text-sm font-semibold transition" style={{ backgroundColor: "#8B1A1A", color: "#ffffff" }}
        >
          Hesapla
        </button>
      </form>
      {result && (
        <div className="mt-6 space-y-3 text-sm text-gray-700">
          <div className="flex items-center justify-between rounded-2xl bg-brand/5 px-4 py-3">
            <span>Yıllık destek geliri (pay uygulanmış)</span>
            <span>{formatCurrency(result.yillikDestekGeliri)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3">
            <span>Bugüne indirgenmiş toplam destek değeri</span>
            <span>{formatCurrency(result.buguneGetirilmisDeger)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-dashed border-brand/40 px-4 py-3 font-semibold text-brand">
            <span>Kusur oranı uygulanmış tahmini tazminat</span>
            <span>{formatCurrency(result.toplamTazminat)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrafikTazminatCalculator;
