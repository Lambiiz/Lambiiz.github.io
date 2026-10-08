// Retargets clips from the Quaternius Universal Animation Library (UE-mannequin
// style skeleton) onto a VRM's normalized humanoid rig.
//
// The VRM normalized rig has identity rest rotations in world space, so every
// source bone rotation is converted to a world-space delta from the source
// rest pose:  q' = parentRestWorld * qLocal * restWorld^-1
// Composing those along a chain telescopes into the bone's world delta, which
// is exactly what a normalized VRM bone expects.
import * as THREE from 'three';

export const UAL_TO_VRM = {
  pelvis: 'hips',
  spine_01: 'spine',
  spine_02: 'chest',
  spine_03: 'upperChest',
  neck_01: 'neck',
  Head: 'head',
  clavicle_l: 'leftShoulder',
  upperarm_l: 'leftUpperArm',
  lowerarm_l: 'leftLowerArm',
  hand_l: 'leftHand',
  clavicle_r: 'rightShoulder',
  upperarm_r: 'rightUpperArm',
  lowerarm_r: 'rightLowerArm',
  hand_r: 'rightHand',
  thigh_l: 'leftUpperLeg',
  calf_l: 'leftLowerLeg',
  foot_l: 'leftFoot',
  ball_l: 'leftToes',
  thigh_r: 'rightUpperLeg',
  calf_r: 'rightLowerLeg',
  foot_r: 'rightFoot',
  ball_r: 'rightToes',
};
for (const side of ['l', 'r']) {
  const S = side === 'l' ? 'left' : 'right';
  UAL_TO_VRM[`thumb_01_${side}`] = `${S}ThumbMetacarpal`;
  UAL_TO_VRM[`thumb_02_${side}`] = `${S}ThumbProximal`;
  UAL_TO_VRM[`thumb_03_${side}`] = `${S}ThumbDistal`;
  for (const [ual, vrm] of [['index', 'Index'], ['middle', 'Middle'], ['ring', 'Ring'], ['pinky', 'Little']]) {
    UAL_TO_VRM[`${ual}_01_${side}`] = `${S}${vrm}Proximal`;
    UAL_TO_VRM[`${ual}_02_${side}`] = `${S}${vrm}Intermediate`;
    UAL_TO_VRM[`${ual}_03_${side}`] = `${S}${vrm}Distal`;
  }
}

/**
 * Captures the source rig's rest pose. If `restClip` is given, its first frame
 * is used as the rest pose (the UAL bind pose is not a strict T-pose).
 */
export function captureSourceRest(srcRoot, restClip) {
  if (restClip) {
    const mixer = new THREE.AnimationMixer(srcRoot);
    mixer.clipAction(restClip).play();
    mixer.setTime(0);
  }
  srcRoot.updateMatrixWorld(true);
  const rest = new Map();
  srcRoot.traverse((o) => {
    if (!UAL_TO_VRM[o.name]) return;
    rest.set(o.name, {
      world: o.getWorldQuaternion(new THREE.Quaternion()),
      parentWorld: o.parent.getWorldQuaternion(new THREE.Quaternion()),
      parentMatrix: o.parent.matrixWorld.clone(),
      worldPos: o.getWorldPosition(new THREE.Vector3()),
    });
  });
  return rest;
}

/**
 * @param {THREE.AnimationClip} clip  source clip
 * @param {Map} rest                  result of captureSourceRest
 * @param {import('@pixiv/three-vrm').VRM} vrm
 * @param {{inPlace?: boolean, name?: string}} opts
 */
export function retargetClip(clip, rest, vrm, opts = {}) {
  const { inPlace = true } = opts;
  const isVRM0 = vrm.meta?.metaVersion === '0';
  const tracks = [];
  const q = new THREE.Quaternion();
  const v = new THREE.Vector3();

  const vrmHips = vrm.humanoid.getNormalizedBoneNode('hips');
  const vrmHipsRest = vrmHips.position.clone();
  const srcHipsRest = rest.get('pelvis').worldPos;
  const scale = vrmHipsRest.y / srcHipsRest.y;

  for (const track of clip.tracks) {
    const [boneName, prop] = track.name.split('.');
    const vrmBoneName = UAL_TO_VRM[boneName];
    if (!vrmBoneName) continue;
    const node = vrm.humanoid.getNormalizedBoneNode(vrmBoneName);
    if (!node) continue;
    const r = rest.get(boneName);
    if (!r) continue;

    if (prop === 'quaternion') {
      const restInv = r.world.clone().invert();
      const values = new Float32Array(track.values.length);
      for (let i = 0; i < track.values.length; i += 4) {
        q.fromArray(track.values, i);
        q.premultiply(r.parentWorld).multiply(restInv);
        q.toArray(values, i);
        if (isVRM0) {
          values[i] *= -1;
          values[i + 2] *= -1;
        }
      }
      tracks.push(new THREE.QuaternionKeyframeTrack(`${node.name}.quaternion`, track.times, values));
    } else if (prop === 'position' && boneName === 'pelvis') {
      const values = new Float32Array(track.values.length);
      for (let i = 0; i < track.values.length; i += 3) {
        v.fromArray(track.values, i).applyMatrix4(r.parentMatrix).sub(srcHipsRest).multiplyScalar(scale);
        if (inPlace) {
          v.x *= 0.35;
          v.z *= 0.35;
        }
        if (isVRM0) {
          v.x *= -1;
          v.z *= -1;
        }
        v.add(vrmHipsRest).toArray(values, i);
      }
      tracks.push(new THREE.VectorKeyframeTrack(`${node.name}.position`, track.times, values));
    }
  }
  return new THREE.AnimationClip(opts.name || clip.name, clip.duration, tracks);
}
