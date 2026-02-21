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
  bosSureAy: number;
  bosSureTutari: number;
  iseBaslatmamaAy: number;
  iseBaslatmamaTutari: number;
  damgaVergisi: number;
  toplamNet: number;
};

type IseIadeCalculatorConfig = {
  damgaVergisiOrani?: number;
  bosSureVarsayilan?: number;
  iseBaslatmamaVarsayilan?: number;
};

type IseIadeCalculatorProps = {
  config?: unknown;
};

const IseIadeCalculator = ({ config }: IseIadeCalculatorProps) => {
  const [result, setResult] = useState<Result | null>(null);
  const parsedConfig = (config as IseIadeCalculatorConfig | undefined) ?? {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const brutMaas = Number(formData.get("brutMaas"));
    const bosSureAy = Number(formData.get("bosSureAy"));
    const iseBaslatmamaAy = Number(formData.get("iseBaslatmamaAy"));
    const damgaOrani =
      Number(formData.get("damgaVergisiOrani")) / 100 ||
      parsedConfig.damgaVergisiOrani ||
      DAMGA_VERGISI_ORANI;

    if (!brutMaas || brutMaas <= 0) {
      setResult(null);
      return;
    }

    const bosSureTutari = brutMaas * Math.min(Math.max(bosSureAy, 0), 4);
    const iseBaslatmamaTutari = brutMaas * Math.min(Math.max(iseBaslatmamaAy, 4), 8);
    const toplamBrut = bosSureTutari + iseBaslatmamaTutari;
    const damgaVergisi = toplamBrut * damgaOrani;
    const toplamNet = toplamBrut - damgaVergisi;

    setResult({
      bosSureAy,
      bosSureTutari,
      iseBaslatmamaAy,
      iseBaslatmamaTutari,
      damgaVergisi,
      toplamNet,
    });
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="font-heading text-xl text-gray-900">İşe İade Tazminatı Hesaplayıcı</h3>
      <p className="mt-2 text-sm text-gray-600">
        Geçersiz fesih halinde hükmedilebilecek boşta geçen süre ücreti ve işe başlatmama
        tazminatını brüt maaşınız üzerinden tahmini olarak hesaplar.
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
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Boşta Geçen Süre (Ay)
            </label>
            <input
              type="number"
              name="bosSureAy"
              min="0"
              max="4"
              defaultValue={parsedConfig.bosSureVarsayilan ?? 4}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">Mahkeme en çok 4 aya kadar hükmeder.</p>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              İşe Başlatmama Tazminatı (Ay)
            </label>
            <input
              type="number"
              name="iseBaslatmamaAy"
              min="4"
              max="8"
              defaultValue={parsedConfig.iseBaslatmamaVarsayilan ?? 5}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">4 ile 8 aylık ücret arasında belirlenir.</p>
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
          <div className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3">
            <span>Boşta geçen süre ücreti</span>
            <span>{formatCurrency(result.bosSureTutari)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3">
            <span>İşe başlatmama tazminatı</span>
            <span>{formatCurrency(result.iseBaslatmamaTutari)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-gray-100 px-4 py-3 text-gray-600">
            <span>Damga vergisi</span>
            <span>- {formatCurrency(result.damgaVergisi)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-dashed border-brand/40 px-4 py-3 font-semibold text-brand">
            <span>Tahmini net ödeme</span>
            <span>{formatCurrency(result.toplamNet)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IseIadeCalculator;
