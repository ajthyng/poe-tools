type WeaponConstructor = {
  quality?: number;
};

export class Weapon {
  quality: number;

  constructor({ quality }: WeaponConstructor) {
    this.quality = quality ?? 0;
  }
}
