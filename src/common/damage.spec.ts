import { Damage, DamageType } from './damage';
import { readFileSync } from 'fs';
import { MartialWeapon } from './martial-weapon';

describe('Damage', () => {
  it('should calculate lightning dps', () => {
    const damage = new Damage({ min: 13, max: 54, type: DamageType.Lightning });
    expect(damage.getDPS()).toBe(33.5);
  });

  it('should calculate physical DPS', () => {
    const damage = new Damage({ min: 43, max: 72, type: DamageType.Physical });

    expect(damage.getDPS()).toBe(57.5);
  });

  it('should calculate DPS with critical hit chance', () => {
    const weaponString = readFileSync('./src/common/mocks/weapon-normal-quality.txt', 'utf-8');

    const weapon = new MartialWeapon({ item: weaponString });
    
    const damage = new Damage({ min: 29, max: 60, type: DamageType.Physical, weapon });

    expect(damage.getCriticalDPS()).toBe(68.53);
  });
});
