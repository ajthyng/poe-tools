import { Item } from '../common/item/item';
import ItemParser from '../common/item-parser';

type WeaponConstructor = {
  item: string;
  parser?: typeof ItemParser;
};

export class Weapon extends Item {
  quality: number;

  constructor({ item, parser }: WeaponConstructor) {
    super({ item, parser });
    this.quality = this.parser.getQuality(item);
  }
}
