import { MartialWeapon } from './martial-weapon';

export enum DamageType {
  Lightning = 'lightning',
  Fire = 'fire',
  Cold = 'cold',
  Chaos = 'chaos',
  Physical = 'physical',
  name = 'DamageType',
}

export enum DamageFamily {
  Elemental = 'elemental',
  Chaos = 'chaos',
  Physical = 'physical',
}

export const damageFamily = Object.values(DamageFamily);
export const damageType = Object.values(DamageType);

export const DamageFamilies: Record<DamageType | string, { family: DamageFamily; affectedByQuality: boolean }> = {
  chaos: { family: DamageFamily.Chaos, affectedByQuality: false },
  cold: { family: DamageFamily.Elemental, affectedByQuality: false },
  fire: { family: DamageFamily.Elemental, affectedByQuality: false },
  lightning: { family: DamageFamily.Elemental, affectedByQuality: false },
  physical: { family: DamageFamily.Physical, affectedByQuality: true },
} as const;

export type DamageConstructor =
  | {
      min: number;
      max: number;
      range?: never;
      type: DamageType;
      weapon?: MartialWeapon;
    }
  | { min?: never; max?: never; range: string; type: DamageType; weapon?: MartialWeapon };

export class Damage {
  declare min: number;
  declare max: number;
  declare readonly type: DamageType;
  declare private readonly _damageFamily: (typeof DamageFamilies)[DamageType];
  declare readonly weapon?: MartialWeapon;

  constructor({ min, max, range, type, weapon }: DamageConstructor) {
    if (range !== null && range !== undefined) {
      this.setDamageRange(range);
    } else {
      this.setDamage(min, max);
    }

    this.type = type;

    this._damageFamily = DamageFamilies[type];
    this.weapon = weapon;
  }

  setDamageRange(range: string) {
    [this.min, this.max] = range.split('-').map((range) => +range);
  }

  setDamage(min: number, max: number) {
    this.min = min;
    this.max = max;
  }

  private roundDPS(dps: number) {
    return Math.round(dps * 100) / 100;
  }

  private getBaseDPS(quality?: number) {
    const qualityMultiplier = 1 + (quality ?? 0) / 100;

    const averageDamage = (Math.round(this.min * qualityMultiplier) + Math.round(this.max * qualityMultiplier)) / 2;
    const dps = averageDamage * (this.weapon?.attacksPerSecond ?? 1);
    return this.roundDPS(dps);
  }

  /**
   * Calculates the damage per second for a given attacks per second and critical chance.
   * @param criticalBonus The critical hit bonus, ex 150% is passed as 150.
   * @returns The damage per second.
   */
  getCriticalDPS(criticalBonus: number = 200) {
    const baseDPS = this.getBaseDPS();
    const totalDPS = baseDPS * (1 + ((this.weapon?.criticalChance ?? 0) * (criticalBonus - 100)) / 10000);
    return this.roundDPS(totalDPS);
  }

  getDPS(quality?: number) {
    const dps = this.getBaseDPS(this.shouldApplyQuality ? quality : undefined);

    return this.roundDPS(dps);
  }

  get family() {
    return this._damageFamily.family;
  }

  get shouldApplyQuality() {
    return this._damageFamily.affectedByQuality;
  }
}
