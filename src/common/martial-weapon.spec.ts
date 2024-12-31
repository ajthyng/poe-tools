import { MartialWeapon } from './martial-weapon';

describe('MartialWeapon', () => {
  describe('setDamage', () => {
    it('should set damage', () => {
      const weapon = new MartialWeapon({ criticalChance: 10, attacksPerSecond: 1.4, quality: 0 });
      weapon.setDamage(10, 20, 'lightning');

      expect(weapon.damageByType.lightning[0].min).toBe(10);
      expect(weapon.damageByFamily.elemental[0].max).toBe(20);
    });
  });

  describe('getDPS', () => {
    it('should calculate physical dps', () => {
      const weapon = new MartialWeapon({ criticalChance: 10, attacksPerSecond: 1.4, quality: 0 });
      weapon.setDamage(10, 20, 'physical');

      expect(weapon.getDPS('physical')).toBe(21);
    });

    it('should calculate elemental dps', () => {
      const weapon = new MartialWeapon({ criticalChance: 10, attacksPerSecond: 1.4, quality: 0 });
      weapon.setDamage(10, 20, 'lightning');
      weapon.setDamage(30, 40, 'fire');
      weapon.setDamage(50, 60, 'cold');

      expect(weapon.getDPS('elemental')).toBe(147);
    });

    it('should calculate chaos dps', () => {
      const weapon = new MartialWeapon({ criticalChance: 10, attacksPerSecond: 1.0, quality: 0 });
      weapon.setDamage(10, 20, 'lightning');
      weapon.setDamage(30, 40, 'fire');
      weapon.setDamage(50, 60, 'chaos');

      expect(weapon.getDPS('chaos')).toBe(55);
    });
  });

  describe('getTotalDPS', () => {
    it('should calculate total dps', () => {
      const weapon = new MartialWeapon({ criticalChance: 10, attacksPerSecond: 1.4, quality: 0 });
      weapon.setDamage(10, 20, 'physical');
      weapon.setDamage(30, 40, 'lightning');
      weapon.setDamage(50, 60, 'fire');
      weapon.setDamage(60, 70, 'chaos');
      weapon.setDamage(60, 80, 'cold');

      expect(weapon.getDPS()).toBe(336);
    });

    it('should get dps with quality applied', () => {
      const weapon = new MartialWeapon({ criticalChance: 10, attacksPerSecond: 1.4, quality: 20 });
      weapon.setDamage(41, 78, 'physical');

      expect(weapon.getDPS()).toBe(100.1);
    });

    it('should not apply quality to elemental dps', () => {
      const weapon = new MartialWeapon({ criticalChance: 10, attacksPerSecond: 1.4, quality: 20 });
      weapon.setDamage(41, 78, 'lightning');
      weapon.setDamage(41, 78, 'cold');
      weapon.setDamage(41, 78, 'fire');

      expect(weapon.getDPS('elemental')).toBe(83.3 * 3);
    });
  });
});
