import { MartialWeapon } from './martial-weapon';

export const damageType = ['lightning', 'fire', 'cold', 'chaos', 'physical'] as const;
export const damageFamily = ['elemental', 'chaos', 'physical'] as const;

export type DamageType = (typeof damageType)[number];
export type DamageFamily = (typeof damageFamily)[number];

export const DamageFamilies: Record<DamageType, { family: DamageFamily; affectedByQuality: boolean }> = {
  chaos: { family: 'chaos', affectedByQuality: false },
  cold: { family: 'elemental', affectedByQuality: false },
  fire: { family: 'elemental', affectedByQuality: false },
  lightning: { family: 'elemental', affectedByQuality: false },
  physical: { family: 'physical', affectedByQuality: true },
} as const;

export type DamageConstructor = {
  min: number;
  max: number;
  type: DamageType;
  weapon: MartialWeapon;
};

export class Damage {
  declare readonly min: number;
  declare readonly max: number;
  declare readonly type: DamageType;
  declare private readonly _damageFamily: (typeof DamageFamilies)[DamageType];
  declare readonly weapon: MartialWeapon;

  constructor({ min, max, type, weapon }: DamageConstructor) {
    this.min = min;
    this.max = max;
    this.type = type;

    this._damageFamily = DamageFamilies[type];
    this.weapon = weapon;
  }

  private roundDPS(dps: number) {
    return Math.round(dps * 100) / 100;
  }

  private getBaseDPS(quality?: number) {
    const qualityMultiplier = 1 + (quality ?? 0) / 100;

    const averageDamage = (Math.round(this.min * qualityMultiplier) + Math.round(this.max * qualityMultiplier)) / 2;
    const dps = averageDamage * this.weapon.attacksPerSecond;
    return this.roundDPS(dps);
  }

  /**
   * Calculates the damage per second for a given attacks per second and critical chance.
   * @param criticalBonus The critical hit bonus, ex 150% is passed as 150.
   * @returns The damage per second.
   */
  getCriticalDPS(criticalBonus: number = 200) {
    const baseDPS = this.getBaseDPS();
    const totalDPS = baseDPS * (1 + (this.weapon.criticalChance * (criticalBonus - 100)) / 10000);
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
