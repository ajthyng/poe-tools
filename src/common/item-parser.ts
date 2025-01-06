import { ItemClass } from './item-class';
import { ItemRarity } from './item-rarity';
import { enumValidator } from './util/enum-validator';
import { Damage, DamageType } from './damage';

class ItemParser {
  regex = {
    itemClass: /(?<=Item\sClass:\s)[a-zA-Z]*.+/,
    attacksPerSecond: /(?<=Attacks\sper\sSecond:\s*)\d+\.\d+/i,
    criticalChance: /(?<=Critical Hit Chance:\s*)\d+\.\d+/i,
    rarity: /(?<=Rarity:\s)[a-zA-Z]*/,
    quality: /(?<=Quality:\s)[+-]\d+/,
  };

  damageRegex = {
    physical: /(?<=Physical Damage:\s*)\d+-\d+/,
    fire: /(?<=Adds\s)\d+\s+to\s+\d+(?=\sFire)/,
    lightning: /(?<=Adds\s)\d+\s+to\s+\d+(?=\sLightning)/,
    cold: /(?<=Adds\s)\d+\s+to\s+\d+(?=\sCold)/,
    chaos: /(?<=Chaos Damage:\s*)\d+-\d+/,
  };

  validateItemClass(itemClass: string) {
    return itemClass.match(this.regex.itemClass);
  }

  getItemClass(item: string): ItemClass {
    const itemClass: unknown = this.regex.itemClass.exec(item)?.[0];

    const validClasses = Object.values(ItemClass);
    if (!validClasses.includes(itemClass as ItemClass)) {
      throw new Error(`Invalid item class: ${itemClass}`);
    }

    return itemClass as ItemClass;
  }

  getCriticalChance(item: string) {
    const criticalChance = item.match(this.regex.criticalChance);

    return criticalChance ? +criticalChance[0] : 0;
  }

  getDamages(item: string) {
    const damages: Damage[] = [];

    for (const damageType of Object.values(DamageType)) {
      if (damageType === DamageType.name) continue;

      const regex = new RegExp(this.damageRegex[damageType], 'ig');
      const damage = new Damage({ type: enumValidator(DamageType, damageType), min: 0, max: 0 });

      for (const match of item.matchAll(regex)) {
        damage.setDamageRange(match[0].replace(' to ', '-'));
      }

      if (damage.min === 0 && damage.max === 0) continue;

      damages.push(damage);
    }

    return damages;
  }

  getRarity(item: string) {
    const rarity = item.match(this.regex.rarity)?.[0];

    return enumValidator(ItemRarity, rarity);
  }

  getAttacksPerSecond(item: string) {
    const attacksPerSecond = item.match(this.regex.attacksPerSecond);

    return attacksPerSecond ? +attacksPerSecond[0] : 0;
  }

  getQuality(item: string) {
    const qualityString = item.match(this.regex.quality)?.[0];
    return qualityString ? +qualityString : 0;
  }

  getClassifications(item: string) {
    return item.split('--------')[0].split('\n');
  }

  getName(item: string) {
    const classifications = this.getClassifications(item);

    return classifications[2]?.trim();
  }
}

const itemParser = new ItemParser();

export default itemParser;
