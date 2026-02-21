"use client";

import { useState } from "react";

export type NafakaCalculatorConfig = {
  yoksullukOrani?: number;
  cocukOranlari?: {
    "0_6"?: number;
    "7_12"?: number;
    "13_18"?: number;
  };
  minimumCocukKatkisi?: number;
};

type NafakaResult = {
  yoksulluk: number;
  istirakToplam: number;
  istirakKalemleri: {
    label: string;
    tutar: number;
  }[];
};

const DEFAULT_CONFIG: Required<NafakaCalculatorConfig> = {
  yoksullukOrani: 0.15,
  cocukOranlari: {
    "0_6": 0.12,
    "7_12": 0.15,
    "13_18": 0.18,
  },
  minimumCocukKatkisi: 1500,
};

const formatCurrency = (value: number) =>
  value.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  });

type NafakaCalculatorProps = {
  config?: unknown;
};

const NafakaCalculator = ({ config }: NafakaCalculatorProps) => {
  const parsedConfig = (config as NafakaCalculatorConfig | undefined) ?? {};
  const effectiveConfig = {
    ...DEFAULT_CONFIG,
    ...parsedConfig,
    cocukOranlari: {
      ...DEFAULT_CONFIG.cocukOranlari,
      ...(parsedConfig.cocukOranlari ?? {}),
    },
  };

  const [result, setResult] = useState<NafakaResult | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const yukumlulukGeliri = Number(formData.get("yukumlulukGeliri"));
    const baskaninenGeliri = Number(formData.get("baskaGelir"));
    const cocuk0_6 = Number(formData.get("cocuk0_6")) || 0;
    const cocuk7_12 = Number(formData.get("cocuk7_12")) || 0;
    const cocuk13_18 = Number(formData.get("cocuk13_18")) || 0;

    if (!yukumlulukGeliri || yukumlulukGeliri < 0) {
      setResult(null);
      return;
    }

    const gelirFarki = Math.max(0, yukumlulukGeliri - (baskaninenGeliri || 0));
    const yoksulluk = gelirFarki * effectiveConfig.yoksullukOrani;

    const cocukGruplari = [
      {
        label: "0-6 yaş",
        adet: cocuk0_6,
        oran: effectiveConfig.cocukOranlari["0_6"] ?? 0.12,
      },
      {
        label: "7-12 yaş",
        adet: cocuk7_12,
        oran: effectiveConfig.cocukOranlari["7_12"] ?? 0.15,
      },
      {
        label: "13-18 yaş",
        adet: cocuk13_18,
        oran: effectiveConfig.cocukOranlari["13_18"] ?? 0.18,
      },
    ];

    const istirakKalemleri = cocukGruplari
      .filter((item) => item.adet > 0)
      .map((item) => {
        const tutarHam = gelirFarki * item.oran;
        const tutarToplam = Math.max(
          item.adet * effectiveConfig.minimumCocukKatkisi,
          tutarHam * item.adet,
        );
        return {
          label: item.label,
          tutar: tutarToplam,
        };
      });

    const istirakToplam = istirakKalemleri.reduce((sum, item) => sum + item.tutar, 0);

    setResult({
      yoksulluk,
      istirakToplam,
      istirakKalemleri,
    });
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="font-heading text-xl text-gray-900">
        Nafaka Tahmini Hesaplayıcı
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        Gelir durumlarına göre tedbir veya yoksulluk nafakası için temel bir ön
        hesaplama yapın.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Nafaka Ödeyecek Kişinin Aylık Geliri (TL)
          </label>
          <input
            type="number"
            name="yukumlulukGeliri"
            min="0"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Nafaka Alacak Kişinin Aylık Geliri (TL)
          </label>
          <input
            type="number"
            name="baskaGelir"
            min="0"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            defaultValue={0}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              0-6 Yaş Çocuk Sayısı
            </label>
            <input
              type="number"
              name="cocuk0_6"
              min="0"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
              defaultValue={0}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              7-12 Yaş Çocuk Sayısı
            </label>
            <input
              type="number"
              name="cocuk7_12"
              min="0"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
              defaultValue={0}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              13-18 Yaş Çocuk Sayısı
            </label>
            <input
              type="number"
              name="cocuk13_18"
              min="0"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
              defaultValue={0}
            />
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
          <div className="rounded-2xl bg-brand/5 px-4 py-4">
            <div className="flex items-center justify-between font-semibold text-brand">
              <span>Yoksulluk Nafakası</span>
              <span>{formatCurrency(result.yoksulluk)}</span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Gelir farkının %{Math.round(
                (effectiveConfig.yoksullukOrani ?? 0) * 100,
              )}’i esas alınarak hesaplandı.
            </p>
          </div>
          {result.istirakKalemleri.length > 0 && (
            <div className="rounded-2xl border border-gray-100 px-4 py-4">
              <div className="flex items-center justify-between font-semibold text-brand">
                <span>İştirak Nafakası</span>
                <span>{formatCurrency(result.istirakToplam)}</span>
              </div>
              <ul className="mt-3 space-y-2 text-xs text-gray-500">
                {result.istirakKalemleri.map((item) => (
                  <li key={item.label} className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <span>{formatCurrency(item.tutar)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex items-center justify-between rounded-2xl border border-dashed border-brand/40 px-4 py-3 font-semibold text-brand">
            <span>Toplam Tahmini Nafaka</span>
            <span>{formatCurrency(result.yoksulluk + result.istirakToplam)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NafakaCalculator;
