import { Weapon } from '../weapon';
import { Damage, damageFamily, DamageFamily, damageType, DamageType } from './damage';

export type MartialWeaponConstructor = {
  criticalChance: number;
  attacksPerSecond: number;
  quality: number;
};

export class MartialWeapon extends Weapon {
  attacksPerSecond: number;
  criticalChance: number;
  damageByType = damageType.reduce(
    (acc, type) => {
      acc[type] = [];
      return acc;
    },
    {} as Record<DamageType, Damage[]>,
  );
  damageByFamily = damageFamily.reduce(
    (acc, family) => {
      acc[family] = [];
      return acc;
    },
    {} as Record<DamageFamily, Damage[]>,
  );

  constructor({ criticalChance, attacksPerSecond, quality }: MartialWeaponConstructor) {
    super({ quality });
    this.attacksPerSecond = attacksPerSecond;
    this.criticalChance = criticalChance;
  }

  setDamage(min: number, max: number, type: DamageType) {
    const damage = new Damage({ min, max, type, weapon: this });
    this.damageByType[type].push(damage);
    this.damageByFamily[damage.family].push(damage);
  }

  getDPS(type?: DamageType | DamageFamily) {
    const damageType = type as DamageType;
    const damageFamily = type as DamageFamily;

    if (this.damageByFamily[damageFamily]) {
      return this.damageByFamily[damageFamily].reduce((total, damage) => {
        return total + damage.getDPS(this.quality);
      }, 0);
    }

    if (this.damageByType[damageType]) {
      return this.damageByType[damageType].reduce((total, damage) => {
        return total + damage.getDPS(this.quality);
      }, 0);
    }

    return this.getTotalDPS();
  }

  private getTotalDPS() {
    const damages = Object.values(this.damageByType).flat();

    return damages.reduce((total, damage) => {
      return total + damage.getDPS(this.quality);
    }, 0);
  }

  parseWeapon() {}
}
