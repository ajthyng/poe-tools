import { Damage } from './damage';
import { Quarterstaff } from '../quarterstaff';

describe('Damage', () => {
  const testWeapon = new Quarterstaff({ criticalChance: 10, attacksPerSecond: 1.4, quality: 0 });

  it('should calculate lightning dps', () => {
    const damage = new Damage({ min: 13, max: 54, type: 'lightning', weapon: testWeapon });
    expect(damage.getDPS()).toBe(46.9);
  });

  it('should calculate physical DPS', () => {
    const damage = new Damage({ min: 43, max: 72, type: 'physical', weapon: testWeapon });

    expect(damage.getDPS()).toBe(80.5);
  });

  it('should calculate DPS with critical hit chance', () => {
    const damage = new Damage({ min: 29, max: 60, type: 'physical', weapon: testWeapon });

    expect(damage.getCriticalDPS()).toBe(68.53);
  });
});
