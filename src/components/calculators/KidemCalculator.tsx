"use client";

import { useState } from "react";

export type KidemCalculatorConfig = {
  tavan?: number;
  damgaVergisiOrani?: number;
};

type Result = {
  toplamHizmetYili: number;
  kullanilanBrut: number;
  toplamBrut: number;
  damgaVergisi: number;
  netTutar: number;
};

const DEFAULT_TAVAN = 35058.58; // 2024/2 dönemi kıdem tavanı (TL)
const DAMGA_VERGISI_ORANI = 0.00759;

const formatCurrency = (value: number) =>
  value.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  });

type KidemCalculatorProps = {
  config?: unknown;
};

const KidemCalculator = ({ config }: KidemCalculatorProps) => {
  const [result, setResult] = useState<Result | null>(null);
  const parsedConfig = (config as KidemCalculatorConfig | undefined) ?? {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const brutMaas = Number(formData.get("brutMaas"));
    const yil = Number(formData.get("yil"));
    const ay = Number(formData.get("ay"));
    const tavan = Number(formData.get("tavan")) || parsedConfig.tavan || DEFAULT_TAVAN;
    const damgaOrani = parsedConfig.damgaVergisiOrani ?? DAMGA_VERGISI_ORANI;

    if (!brutMaas || (!yil && !ay)) {
      setResult(null);
      return;
    }

    const toplamYil = yil + ay / 12;
    const kullanilanBrut = Math.min(brutMaas, tavan);
    const toplamBrut = Math.max(0, kullanilanBrut * toplamYil);
    const damgaVergisi = toplamBrut * damgaOrani;
    const netTutar = toplamBrut - damgaVergisi;

    setResult({
      toplamHizmetYili: toplamYil,
      kullanilanBrut,
      toplamBrut,
      damgaVergisi,
      netTutar,
    });
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="font-heading text-xl text-gray-900">
        Kıdem Tazminatı Hesaplayıcı
      </h3>
      <p className="mt-2 text-sm text-gray-600">
        Son brüt maaşınız ve çalışma sürenize göre tahmini kıdem tazminatınızı
        hesaplayın.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Brüt Maaş (TL)
          </label>
          <input
            type="number"
            name="brutMaas"
            min="0"
            step="0.01"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Kıdem Tavanı (TL)
          </label>
          <input
            type="number"
            name="tavan"
            min="0"
            step="0.01"
            defaultValue={(parsedConfig.tavan ?? DEFAULT_TAVAN).toFixed(2)}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">
            Güncel tavan tutarını girerek hesaplamayı ihtiyaca göre
            güncelleyebilirsiniz.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Çalışma Yılı
            </label>
            <input
              type="number"
              name="yil"
              min="0"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Ek Ay
            </label>
            <input
              type="number"
              name="ay"
              min="0"
              max="11"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
              required
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
          <div className="grid gap-2 rounded-2xl bg-brand/5 px-4 py-4">
            <div className="flex items-center justify-between font-semibold text-brand">
              <span>Toplam Kıdem Tazminatı (Brüt)</span>
              <span>{formatCurrency(result.toplamBrut)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Kullanılan brüt maaş</span>
              <span>{formatCurrency(result.kullanilanBrut)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Toplam hizmet süresi</span>
              <span>{result.toplamHizmetYili.toFixed(2)} yıl</span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-600">
            <span>Damga Vergisi (binde 7,59)</span>
            <span>- {formatCurrency(result.damgaVergisi)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-dashed border-brand/40 px-4 py-3 font-semibold text-brand">
            <span>Tahmini Net Ödeme</span>
            <span>{formatCurrency(result.netTutar)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default KidemCalculator;
