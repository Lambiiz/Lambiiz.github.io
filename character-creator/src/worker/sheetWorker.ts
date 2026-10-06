/// <reference lib="webworker" />
// Renders sprite sheets off the main thread so the creator stays responsive.
import { FAMILY_MAP } from '../families';
import { renderSheet, type SheetOptions } from '../export/sheet';
import type { Genome } from '../model/types';

self.onmessage = (e: MessageEvent<{ id: number; genome: Genome; options: SheetOptions }>) => {
  const { id, genome, options } = e.data;
  try {
    const family = FAMILY_MAP.get(genome.family);
    if (!family) throw new Error(`unknown family ${genome.family}`);
    const res = renderSheet(family, genome, options, (done, total) => (self as unknown as Worker).postMessage({ id, progress: done / total }));
    (self as unknown as Worker).postMessage({ id, result: { w: res.w, h: res.h, meta: res.meta, buffer: res.pixels.buffer } }, [res.pixels.buffer]);
  } catch (err) {
    (self as unknown as Worker).postMessage({ id, error: String(err) });
  }
};
