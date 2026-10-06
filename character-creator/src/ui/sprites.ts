import { SkeletonPose } from '../anatomy/pose';
import { DEG } from '../core/math';
import { DIRECTIONS, cellBox, frameTime, renderPose, type CellBox, type CreatureModel } from '../model/model';
import type { ClipDef } from '../model/types';
import { Frame, Renderer, toImageData } from '../render/raster';

export interface ViewOptions {
  elevationDeg: number;
  shadow: boolean;
  outline: boolean;
}

/** Rendered frames of one model, cached as canvases (all cells share size and pivot). */
export class SpriteCache {
  readonly box: CellBox;
  private readonly frames = new Map<string, HTMLCanvasElement>();
  private readonly renderer = new Renderer();
  private readonly pose: SkeletonPose;
  private liveCanvas: HTMLCanvasElement | null = null;
  private frame: Frame | undefined;

  constructor(readonly model: CreatureModel, readonly view: ViewOptions, clips?: ClipDef[], dirs?: readonly { yaw: number }[]) {
    this.box = cellBox(model, view.elevationDeg * DEG, clips ?? model.animator.clips, dirs ?? DIRECTIONS);
    this.pose = new SkeletonPose(model.anatomy);
  }

  private draw(clipId: string, yaw: number, u: number, target?: HTMLCanvasElement): HTMLCanvasElement {
    this.model.animator.pose(clipId, u, this.pose);
    this.frame = renderPose(this.renderer, this.model, this.pose, yaw, this.box, { elevation: this.view.elevationDeg * DEG, shadow: this.view.shadow, outline: this.view.outline }, this.frame);
    const c = target ?? document.createElement('canvas');
    c.width = this.box.w;
    c.height = this.box.h;
    c.getContext('2d')!.putImageData(toImageData(this.frame), 0, 0);
    return c;
  }

  /** A cached sprite-sheet frame. */
  get(clip: ClipDef, dir: number, frame: number): HTMLCanvasElement {
    const key = `${clip.id}|${dir}|${frame}`;
    let c = this.frames.get(key);
    if (!c) {
      c = this.draw(clip.id, DIRECTIONS[dir].yaw, frameTime(clip, frame));
      this.frames.set(key, c);
    }
    return c;
  }

  /** An uncached frame at any time and yaw (smooth playback, free rotation). */
  live(clipId: string, yaw: number, u: number): HTMLCanvasElement {
    this.liveCanvas = this.draw(clipId, yaw, u, this.liveCanvas ?? undefined);
    return this.liveCanvas;
  }
}
