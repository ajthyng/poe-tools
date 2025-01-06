import { MartialWeapon } from './martial-weapon';
import { DamageType } from './damage';
import { readFileSync } from 'fs';

describe('MartialWeapon', () => {
  const weaponNormalQuality = readFileSync('./src/common/mocks/weapon-normal-quality.txt', 'utf-8');

  describe('setDamage', () => {
    it('should set damage', () => {
      const weapon = new MartialWeapon({ item: weaponNormalQuality });
      weapon.setDamage(10, 20, DamageType.Lightning);

      expect(weapon.damageByType.lightning[0].min).toBe(10);
      expect(weapon.damageByFamily.elemental[0].max).toBe(20);
    });
  });

  describe('getDPS', () => {
    it('should calculate physical dps', () => {
      const weapon = new MartialWeapon({ item: weaponNormalQuality });
      weapon.setDamage(10, 20, DamageType.Physical);

      expect(weapon.getDPS(DamageType.Physical)).toBe(22.4);
    });

    it('should calculate elemental dps', () => {
      const weapon = new MartialWeapon({ item: weaponNormalQuality });
      weapon.setDamage(10, 20, DamageType.Lightning);
      weapon.setDamage(30, 40, DamageType.Fire);
      weapon.setDamage(50, 60, DamageType.Cold);

      expect(weapon.getDPS()).toBe(147);
    });

    it('should calculate chaos dps', () => {
      const weapon = new MartialWeapon({ item: weaponNormalQuality });
      weapon.setDamage(10, 20, DamageType.Lightning);
      weapon.setDamage(30, 40, DamageType.Fire);
      weapon.setDamage(50, 60, DamageType.Chaos);

      expect(weapon.getDPS(DamageType.Chaos)).toBe(77);
    });
  });

  describe('getTotalDPS', () => {
    it('should calculate total dps', () => {
      const weapon = new MartialWeapon({ item: weaponNormalQuality });
      weapon.setDamage(10, 20, DamageType.Physical);
      weapon.setDamage(30, 40, DamageType.Lightning);
      weapon.setDamage(50, 60, DamageType.Fire);
      weapon.setDamage(60, 70, DamageType.Chaos);
      weapon.setDamage(60, 80, DamageType.Cold);

      expect(weapon.getDPS()).toBe(337.4);
    });

    it('should get dps with quality applied', () => {
      const weapon = new MartialWeapon({ item: weaponNormalQuality });
      weapon.setDamage(41, 78, DamageType.Physical);

      expect(weapon.getDPS()).toBe(87.5);
    });

    it('should not apply quality to elemental dps', () => {
      const weapon = new MartialWeapon({ item: weaponNormalQuality });
      weapon.setDamage(41, 78, DamageType.Lightning);
      weapon.setDamage(41, 78, DamageType.Cold);
      weapon.setDamage(41, 78, DamageType.Fire);

      expect(weapon.getDPS()).toBe(83.3 * 3);
    });
  });
});
