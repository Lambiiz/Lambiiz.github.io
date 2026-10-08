// Quality presets. Low reduces pixel ratio, bloom, shadows and cosmetic particles; combat is identical.
export type QualityLevel = 'high' | 'low';

export interface QualitySettings {
  maxPixelRatio: number;
  shadowMapSize: number;
  bloom: boolean;
  bloomStrength: number;
  msaaSamples: number;
  particleBudget: number; // cosmetic only
  dustCount: number;
}

export const QUALITY: Record<QualityLevel, QualitySettings> = {
  high: { maxPixelRatio: 1.5, shadowMapSize: 2048, bloom: true, bloomStrength: 0.42, msaaSamples: 4, particleBudget: 1200, dustCount: 260 },
  low: { maxPixelRatio: 1.0, shadowMapSize: 1024, bloom: false, bloomStrength: 0, msaaSamples: 2, particleBudget: 500, dustCount: 90 },
};

export const PALETTE = {
  midnight: 0x121b2b,
  ceramic: 0xd8d0b7,
  brass: 0xb59a63,
  turquoise: 0x69dad0,
  coral: 0xe28174,
  void: 0x05080f,
  ink: 0x1d2333,
};
