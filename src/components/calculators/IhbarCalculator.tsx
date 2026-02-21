"use client";

import { useMemo, useState } from "react";

const DAMGA_VERGISI_ORANI = 0.00759;

const formatCurrency = (value: number) =>
  value.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  });

type Result = {
  ihbarSuresiGun: number;
  ihbarTazminati: number;
  yillikIzinGun: number;
  yillikIzinTutari: number;
  damgaVergisi: number;
  toplamNet: number;
};

const noticeWeeksByMonths = (toplamAy: number) => {
  if (toplamAy < 6) return 2;
  if (toplamAy < 18) return 4;
  if (toplamAy < 36) return 6;
  return 8;
};

const annualLeaveDays = (toplamAy: number) => {
  if (toplamAy < 60) return 14; // 5 yıldan az
  if (toplamAy < 180) return 20; // 5-15 yıl
  return 26; // 15 yıl ve üzeri
};

type IhbarCalculatorConfig = {
  damgaVergisiOrani?: number;
};

type IhbarCalculatorProps = {
  config?: unknown;
};

const IhbarCalculator = ({ config }: IhbarCalculatorProps) => {
  const [result, setResult] = useState<Result | null>(null);
  const parsedConfig = useMemo(
    () => (config as IhbarCalculatorConfig | undefined) ?? {},
    [config],
  );
  const damgaOrani = useMemo(
    () => parsedConfig.damgaVergisiOrani ?? DAMGA_VERGISI_ORANI,
    [parsedConfig.damgaVergisiOrani],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const brutMaas = Number(formData.get("brutMaas"));
    const yil = Number(formData.get("yil"));
    const ay = Number(formData.get("ay"));

    if (!brutMaas || brutMaas <= 0) {
      setResult(null);
      return;
    }

    const toplamAy = yil * 12 + ay;
    const ihbarHafta = noticeWeeksByMonths(toplamAy);
    const ihbarGun = ihbarHafta * 7;
    const gunlukUcret = brutMaas / 30;

    const ihbarTazminati = gunlukUcret * ihbarGun;
    const izinGun = annualLeaveDays(toplamAy);
    const izinTutari = gunlukUcret * izinGun;

    const toplamBrut = ihbarTazminati + izinTutari;
    const damgaVergisi = toplamBrut * damgaOrani;
    const toplamNet = toplamBrut - damgaVergisi;

    setResult({
      ihbarSuresiGun: ihbarGun,
      ihbarTazminati,
      yillikIzinGun: izinGun,
      yillikIzinTutari: izinTutari,
      damgaVergisi,
      toplamNet,
    });
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="font-heading text-xl text-gray-900">İhbar Tazminatı Hesaplayıcı</h3>
      <p className="mt-2 text-sm text-gray-600">
        Çalışanın hizmet süresine göre ihbar öneli ve brüt maaş üzerinden hesaplanan ihbar
        tazminatını, yıllık izin alacağı ile birlikte tahmini olarak hesaplar.
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
          <div className="flex items-center justify-between rounded-2xl bg-brand/5 px-4 py-3">
            <span>İhbar süresi</span>
            <span>{result.ihbarSuresiGun} gün</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3">
            <span>İhbar tazminatı (brüt)</span>
            <span>{formatCurrency(result.ihbarTazminati)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3">
            <span>Yıllık izin alacağı (brüt)</span>
            <span>
              {formatCurrency(result.yillikIzinTutari)} ({result.yillikIzinGun} gün)
            </span>
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

export default IhbarCalculator;
