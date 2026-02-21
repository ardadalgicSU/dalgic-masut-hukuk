"use client";

import { useState } from "react";

const DAMGA_VERGISI_ORANI = 0.00759;

const formatCurrency = (value: number) =>
  value.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  });

type Result = {
  saatlikUcret: number;
  fazlaMesaiUcreti: number;
  damgaVergisi: number;
  netOdenecek: number;
};

type FazlaMesaiCalculatorConfig = {
  damgaVergisiOrani?: number;
  zamOrani?: number;
};

type FazlaMesaiCalculatorProps = {
  config?: unknown;
};

const DEFAULT_ZAM_ORANI = 0.5; // %50 zamlı ücret

const FazlaMesaiCalculator = ({ config }: FazlaMesaiCalculatorProps) => {
  const [result, setResult] = useState<Result | null>(null);
  const parsedConfig = (config as FazlaMesaiCalculatorConfig | undefined) ?? {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const aylikBrut = Number(formData.get("aylikBrut"));
    const haftalikCalisma = Number(formData.get("haftalikCalisma"));
    const fazlaSaat = Number(formData.get("fazlaSaat"));
    const zamOrani =
      Number(formData.get("zamOrani")) / 100 || parsedConfig.zamOrani || DEFAULT_ZAM_ORANI;
    const damgaOrani =
      Number(formData.get("damgaVergisiOrani")) / 100 ||
      parsedConfig.damgaVergisiOrani ||
      DAMGA_VERGISI_ORANI;

    if (!aylikBrut || !haftalikCalisma || haftalikCalisma <= 0 || !fazlaSaat) {
      setResult(null);
      return;
    }

    const aylikCalismaSaat = haftalikCalisma * 4.33; // aylık ortalama
    const saatlikUcret = aylikBrut / aylikCalismaSaat;
    const fazlaMesaiUcreti = Math.max(0, saatlikUcret * (1 + zamOrani) * fazlaSaat);
    const damgaVergisi = fazlaMesaiUcreti * damgaOrani;
    const netOdenecek = fazlaMesaiUcreti - damgaVergisi;

    setResult({
      saatlikUcret,
      fazlaMesaiUcreti,
      damgaVergisi,
      netOdenecek,
    });
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="font-heading text-xl text-gray-900">Fazla Mesai Ücreti Hesaplayıcı</h3>
      <p className="mt-2 text-sm text-gray-600">
        Aylık brüt ücretiniz, haftalık çalışma süreniz ve fazla mesai saatlerinize göre %50 zamlı
        fazla çalışma ücretini hesaplar.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Aylık Brüt Ücret (TL)
          </label>
          <input
            type="number"
            name="aylikBrut"
            min="0"
            step="0.01"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            required
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Haftalık Çalışma Süresi (Saat)
            </label>
            <input
              type="number"
              name="haftalikCalisma"
              min="1"
              defaultValue={45}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Aylık Fazla Mesai (Saat)
            </label>
            <input
              type="number"
              name="fazlaSaat"
              min="0"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
              required
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Zam Oranı (%)
            </label>
            <input
              type="number"
              name="zamOrani"
              min="0"
              step="1"
              defaultValue={(parsedConfig.zamOrani ?? DEFAULT_ZAM_ORANI) * 100}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Damga Vergisi Oranı (%)
            </label>
            <input
              type="number"
              name="damgaVergisiOrani"
              min="0"
              step="0.01"
              defaultValue={(parsedConfig.damgaVergisiOrani ?? DAMGA_VERGISI_ORANI) * 100}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
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
          <div className="flex items-center justify-between rounded-2xl bg-brand/5 px-4 py-3">
            <span>Normal saatlik ücret</span>
            <span>{formatCurrency(result.saatlikUcret)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3">
            <span>Fazla mesai ücreti (brüt)</span>
            <span>{formatCurrency(result.fazlaMesaiUcreti)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-gray-100 px-4 py-3 text-gray-600">
            <span>Damga vergisi</span>
            <span>- {formatCurrency(result.damgaVergisi)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-dashed border-brand/40 px-4 py-3 font-semibold text-brand">
            <span>Tahmini net ödeme</span>
            <span>{formatCurrency(result.netOdenecek)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FazlaMesaiCalculator;
