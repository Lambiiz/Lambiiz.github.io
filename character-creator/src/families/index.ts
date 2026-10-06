import type { Family } from '../model/types';
import { humanFamily } from './human';
import { humanoidFamily } from './humanoid';
import { quadrupedFamily } from './quadruped';

/** Every creature family, in menu order. */
export const FAMILIES: Family[] = [humanFamily, humanoidFamily, quadrupedFamily];

export const FAMILY_MAP = new Map(FAMILIES.map((f) => [f.id, f]));
