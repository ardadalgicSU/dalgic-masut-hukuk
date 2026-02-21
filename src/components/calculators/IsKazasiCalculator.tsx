"use client";

import { useState } from "react";

const formatCurrency = (value: number) =>
  value.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  });

type Result = {
  geciciIsGoremezlik: number;
  kaliciGelirKaybi: number;
  toplamTazminat: number;
};

type IsKazasiCalculatorConfig = {
  geciciIsGoremezlikOrani?: number;
  iskontoOrani?: number;
};

type IsKazasiCalculatorProps = {
  config?: unknown;
};

const DEFAULT_GECICI_ORAN = 0.5; // SGK günlük kazanç %50
const DEFAULT_ISKONTO = 0.03;

const IsKazasiCalculator = ({ config }: IsKazasiCalculatorProps) => {
  const [result, setResult] = useState<Result | null>(null);
  const parsedConfig = (config as IsKazasiCalculatorConfig | undefined) ?? {};

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const aylikGelir = Number(formData.get("aylikGelir"));
    const maluliyetOrani = Number(formData.get("maluliyetOrani"));
    const geciciGun = Number(formData.get("geciciGun"));
    const destekYil = Number(formData.get("destekYil"));
    const iskontoOrani =
      Number(formData.get("iskontoOrani")) / 100 || parsedConfig.iskontoOrani || DEFAULT_ISKONTO;
    const geciciOran =
      (Number(formData.get("geciciOran")) / 100 ||
        parsedConfig.geciciIsGoremezlikOrani ||
        DEFAULT_GECICI_ORAN);

    if (!aylikGelir || aylikGelir <= 0) {
      setResult(null);
      return;
    }

    const gunlukGelir = aylikGelir / 30;
    const geciciIsGoremezlik = Math.max(0, gunlukGelir * geciciOran * Math.max(geciciGun, 0));

    const yillikKayip = aylikGelir * 12 * Math.max(maluliyetOrani, 0) / 100;
    let kaliciGelirKaybi = 0;
    for (let yil = 1; yil <= Math.max(destekYil, 0); yil += 1) {
      kaliciGelirKaybi += yillikKayip / Math.pow(1 + Math.max(iskontoOrani, 0), yil);
    }

    const toplamTazminat = Math.max(0, geciciIsGoremezlik + kaliciGelirKaybi);

    setResult({
      geciciIsGoremezlik,
      kaliciGelirKaybi,
      toplamTazminat,
    });
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="font-heading text-xl text-gray-900">İş Kazası Gelir Kaybı Hesaplayıcı</h3>
      <p className="mt-2 text-sm text-gray-600">
        İş kazası sonucu oluşan geçici iş göremezlik ile kalıcı maluliyet nedeniyle ortaya çıkan
        gelir kayıplarını tahmini olarak hesaplar.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            Aylık Brüt Gelir (TL)
          </label>
          <input
            type="number"
            name="aylikGelir"
            min="0"
            step="0.01"
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            required
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Maluliyet Oranı (%)
            </label>
            <input
              type="number"
              name="maluliyetOrani"
              min="0"
              max="100"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Geçici İş Göremezlik (Gün)
            </label>
            <input
              type="number"
              name="geciciGun"
              min="0"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
              defaultValue={0}
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Destek Süresi (Yıl)
            </label>
            <input
              type="number"
              name="destekYil"
              min="0"
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
              defaultValue={10}
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              Geçici Ödeme Oranı (%)
            </label>
            <input
              type="number"
              name="geciciOran"
              min="0"
              max="100"
              defaultValue={(parsedConfig.geciciIsGoremezlikOrani ?? DEFAULT_GECICI_ORAN) * 100}
              className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">SGK uygulamasında günlük kazancın %50’si esas alınır.</p>
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
              defaultValue={(parsedConfig.iskontoOrani ?? DEFAULT_ISKONTO) * 100}
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
            <span>Geçici iş göremezlik ödeneği</span>
            <span>{formatCurrency(result.geciciIsGoremezlik)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-gray-100 px-4 py-3">
            <span>Kalıcı gelir kaybı tazminatı</span>
            <span>{formatCurrency(result.kaliciGelirKaybi)}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-dashed border-brand/40 px-4 py-3 font-semibold text-brand">
            <span>Tahmini toplam tazminat</span>
            <span>{formatCurrency(result.toplamTazminat)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IsKazasiCalculator;
