import { ItemRarity } from '../item-rarity';
import { ItemClass } from '../item-class';
import ItemParser from '../item-parser';

export type ItemConstructor = {
  item: string;
  parser?: typeof ItemParser;
};

export class Item {
  name: string;
  rarity: ItemRarity;
  itemClass: ItemClass;
  parser: typeof ItemParser;

  constructor({ item, parser }: ItemConstructor) {
    this.parser = parser ?? ItemParser;

    this.name = this.parser.getName(item);
    this.rarity = this.parser.getRarity(item);
    this.itemClass = this.parser.getItemClass(item);
  }
}
