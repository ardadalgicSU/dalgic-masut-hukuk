import type { ReactElement } from "react";
import KidemCalculator from "./KidemCalculator";
import NafakaCalculator from "./NafakaCalculator";
import IhbarCalculator from "./IhbarCalculator";
import TrafikTazminatCalculator from "./TrafikTazminatCalculator";
import IseIadeCalculator from "./IseIadeCalculator";
import FazlaMesaiCalculator from "./FazlaMesaiCalculator";
import IsKazasiCalculator from "./IsKazasiCalculator";
import KiraArtisCalculator from "./KiraArtisCalculator";

export const calculatorComponentMap: Record<string, (config?: unknown) => ReactElement> = {
  "kidem-tazminati": (config) => <KidemCalculator config={config} />,
  nafaka: (config) => <NafakaCalculator config={config} />,
  "ihbar-tazminati": (config) => <IhbarCalculator config={config} />,
  "trafik-tazminati": (config) => <TrafikTazminatCalculator config={config} />,
  "ise-iade": (config) => <IseIadeCalculator config={config} />,
  "fazla-mesai": (config) => <FazlaMesaiCalculator config={config} />,
  "is-kazasi": (config) => <IsKazasiCalculator config={config} />,
  "kira-artis": (config) => <KiraArtisCalculator config={config} />,
};

export const isSupportedCalculator = (slug: string) =>
  Object.prototype.hasOwnProperty.call(calculatorComponentMap, slug);
