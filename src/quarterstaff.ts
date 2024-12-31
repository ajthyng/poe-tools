import { MartialWeapon } from './common/martial-weapon';

type QuarterstaffConstructor = {
  criticalChance: number;
  attacksPerSecond: number;
  quality: number;
};

export class Quarterstaff extends MartialWeapon {
  readonly type = 'Quarterstaff';

  constructor({ criticalChance, attacksPerSecond, quality }: QuarterstaffConstructor) {
    super({ criticalChance, attacksPerSecond, quality });
  }
}
