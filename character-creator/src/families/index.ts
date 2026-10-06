import type { Family } from '../model/types';
import { blobFamily } from './blob';
import { flyerFamily } from './flyer';
import { humanFamily } from './human';
import { humanoidFamily } from './humanoid';
import { quadrupedFamily } from './quadruped';
import { serpentFamily } from './serpent';

/** Every creature family, in menu order. */
export const FAMILIES: Family[] = [humanFamily, humanoidFamily, quadrupedFamily, serpentFamily, flyerFamily, blobFamily];

export const FAMILY_MAP = new Map(FAMILIES.map((f) => [f.id, f]));
