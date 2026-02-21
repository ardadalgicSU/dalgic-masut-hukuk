"use client";

import { useState } from "react";

const formatCurrency = (value: number) =>
  value.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  });

type Result = {
  artisOrani: number;
  yeniKira: number;
  artisTutar: number;
  uygulananKaynak: "tufe" | "tavan";
};

type KiraArtisCalculatorConfig = {
  tavanOrani?: number;
};

type KiraArtisCalculatorProps = {
  config?: unknown;
};

const DEFAULT_TAVAN = 25;

const KiraArtisCalculator = ({ config }: KiraArtisCalculatorProps) => {
  const [result, setResult] = useState<Result | null>(null);
  const parsedConfig = (config as KiraArtisCalculatorConfig | undefined) ?? {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const mevcutKira = Number(formData.get("mevcutKira"));
    const tufeOrani = Number(formData.get("tufeOrani"));
    const yasalTavan = Number(formData.get("tavanOrani")) || parsedConfig.tavanOrani || DEFAULT_TAVAN;
    const isKonut = formData.get("isKonut") === "on";

    if (!mevcutKira || mevcutKira <= 0) {
      setResult(null);
      return;
    }

    const tufeCarpani = 1 + Math.max(tufeOrani, 0) / 100;
    const tavanCarpani = 1 + Math.max(yasalTavan, 0) / 100;

    const artisCarpani = isKonut ? Math.min(tufeCarpani, tavanCarpani) : tufeCarpani;
    const uygulananKaynak = !isKonut
      ? "tufe"
      : artisCarpani === tufeCarpani
        ? "tufe"
        : "tavan";

    const yeniKira = mevcutKira * artisCarpani;
    const artisOrani = (artisCarpani - 1) * 100;
    const artisTutar = yeniKira - mevcutKira;

    setResult({ artisOrani, yeniKira, artisTutar, uygulananKaynak });
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="font-heading text-xl text-gray-900">Kira Artış Oranı Hesaplayıcı</h3>
      <p className="mt-2 text-sm text-gray-600">
        TÜFE on iki aylık ortalaması ve yasal tavan oranını dikkate alarak yeni kira tutarını
        hesaplar. Sonuç, bilgilendirme amaçlıdır.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Mevcut Aylık Kira (TL)
          </label>
          <input
            type="number"
            name="mevcutKira"
            min="0"
            step="0.01"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            required
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              TÜFE On İki Aylık Ortalaması (%)
            </label>
            <input
              type="number"
              name="tufeOrani"
              min="0"
              step="0.01"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Yasal Tavan (%)
            </label>
            <input
              type="number"
              name="tavanOrani"
              min="0"
              step="0.01"
              defaultValue={parsedConfig.tavanOrani ?? DEFAULT_TAVAN}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              Konut kiralarında 2024 sonuna kadar %25 tavan uygulanmaktadır.
            </p>
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-600">
          <input type="checkbox" name="isKonut" defaultChecked className="h-4 w-4" />
          Konut kiralaması (tavan uygulanır)
        </label>
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
            <span>Uygulanan artış oranı</span>
            <span>%{result.artisOrani.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3">
            <span>Yeni kira tutarı</span>
            <span>{formatCurrency(result.yeniKira)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-dashed border-brand/40 px-4 py-3 font-semibold text-brand">
            <span>Aylık artış tutarı</span>
            <span>{formatCurrency(result.artisTutar)}</span>
          </div>
          <p className="text-xs text-gray-500">
            Hesaplama {result.uygulananKaynak === "tavan" ? "%25 tavan" : "TÜFE oranı"} esas
            alınarak yapılmıştır. Ticari kiralamalarda yalnızca TÜFE ortalaması uygulanır.
          </p>
        </div>
      )}
    </div>
  );
};

export default KiraArtisCalculator;
