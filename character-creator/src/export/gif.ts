/**
 * Minimal GIF89a encoder (looping animation, one global palette, 1-bit transparency, LZW).
 * Sprites have few colours, so a global palette of up to 255 colours plus transparency always fits;
 * anything beyond that is mapped to the nearest palette entry.
 */

export interface GifOptions {
  /** Frame delay in hundredths of a second. */
  delay: number;
  /** Integer upscale (nearest neighbour). */
  scale: number;
  /** Packed 0xAABBGGRR background; transparent pixels stay transparent when omitted. */
  background?: number;
}

export function encodeGif(frames: Uint32Array[], w: number, h: number, o: GifOptions): Uint8Array {
  const S = Math.max(1, Math.floor(o.scale));
  const W = w * S, H = h * S;
  // palette: index 0 transparent, then every opaque colour
  const colors: number[] = [0];
  const index = new Map<number, number>();
  const flat = (p: number) => {
    if ((p >>> 24) < 128) return o.background !== undefined ? o.background | 0xff000000 : 0;
    return (p | 0xff000000) >>> 0;
  };
  for (const f of frames) {
    for (let i = 0; i < f.length; i++) {
      const c = flat(f[i]);
      if (c === 0 || index.has(c)) continue;
      if (colors.length < 256) {
        index.set(c, colors.length);
        colors.push(c);
      }
    }
  }
  const nearest = (c: number): number => {
    let best = 1, bd = Infinity;
    for (let k = 1; k < colors.length; k++) {
      const a = colors[k];
      const d = ((a & 255) - (c & 255)) ** 2 + (((a >>> 8) & 255) - ((c >>> 8) & 255)) ** 2 + (((a >>> 16) & 255) - ((c >>> 16) & 255)) ** 2;
      if (d < bd) {
        bd = d;
        best = k;
      }
    }
    index.set(c, best);
    return best;
  };
  let bits = 1;
  while (1 << bits < colors.length) bits++;
  const tableSize = 1 << Math.max(1, bits);

  const out: number[] = [];
  const u16 = (v: number) => out.push(v & 255, (v >> 8) & 255);
  const str = (s: string) => {
    for (let i = 0; i < s.length; i++) out.push(s.charCodeAt(i));
  };
  str('GIF89a');
  u16(W);
  u16(H);
  out.push(0x80 | ((Math.max(1, bits) - 1) << 4) | (Math.max(1, bits) - 1), 0, 0);
  for (let k = 0; k < tableSize; k++) {
    const c = colors[k] ?? 0;
    out.push(c & 255, (c >>> 8) & 255, (c >>> 16) & 255);
  }
  // loop forever
  out.push(0x21, 0xff, 0x0b);
  str('NETSCAPE2.0');
  out.push(0x03, 0x01, 0x00, 0x00, 0x00);

  const px = new Uint8Array(W * H);
  for (const f of frames) {
    for (let y = 0; y < H; y++) {
      const sy = Math.floor(y / S);
      for (let x = 0; x < W; x++) {
        const c = flat(f[sy * w + Math.floor(x / S)]);
        px[y * W + x] = c === 0 ? 0 : index.get(c) ?? nearest(c);
      }
    }
    // graphic control: disposal 2 (restore to background), transparent index 0
    out.push(0x21, 0xf9, 0x04, (2 << 2) | 1);
    u16(o.delay);
    out.push(0, 0);
    out.push(0x2c);
    u16(0);
    u16(0);
    u16(W);
    u16(H);
    out.push(0);
    const min = Math.max(2, bits);
    out.push(min);
    const data = lzw(px, min);
    for (let i = 0; i < data.length; i += 255) {
      const n = Math.min(255, data.length - i);
      out.push(n);
      for (let k = 0; k < n; k++) out.push(data[i + k]);
    }
    out.push(0);
  }
  out.push(0x3b);
  return new Uint8Array(out);
}

function lzw(px: Uint8Array, min: number): number[] {
  const clear = 1 << min, eoi = clear + 1;
  let size = min + 1, next = eoi + 1;
  const dict = new Map<number, number>();
  const out: number[] = [];
  let acc = 0, nbits = 0;
  const emit = (code: number) => {
    acc |= code << nbits;
    nbits += size;
    while (nbits >= 8) {
      out.push(acc & 255);
      acc >>>= 8;
      nbits -= 8;
    }
  };
  emit(clear);
  let prefix = px[0];
  for (let i = 1; i < px.length; i++) {
    const k = px[i];
    const key = prefix * 256 + k;
    const found = dict.get(key);
    if (found !== undefined) {
      prefix = found;
      continue;
    }
    emit(prefix);
    if (next < 4096) {
      dict.set(key, next++);
      if (next > 1 << size && size < 12) size++;
    } else {
      emit(clear);
      dict.clear();
      size = min + 1;
      next = eoi + 1;
    }
    prefix = k;
  }
  emit(prefix);
  emit(eoi);
  if (nbits > 0) out.push(acc & 255);
  return out;
}
