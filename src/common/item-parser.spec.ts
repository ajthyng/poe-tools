import ItemParser from './item-parser';
import { readFileSync } from 'fs';
import { ItemRarity } from './item-rarity';
import { DamageType } from './damage';

describe('ItemParser', () => {
  const physDpsWeapon = readFileSync('./src/common/mocks/weapon.txt', 'utf-8');
  const elementalWeapon = readFileSync('./src/common/mocks/weapon-elemental.txt', 'utf-8');
  const relicUnidentified = readFileSync('./src/common/mocks/relic-unidentified.txt', 'utf-8');
  const weaponNormalQuality = readFileSync('./src/common/mocks/weapon-normal-quality.txt', 'utf-8');
  const emerald = readFileSync('./src/common/mocks/emerald.txt', 'utf-8');
  const helmetUnique = readFileSync('./src/common/mocks/helmet-unique.txt', 'utf-8');
  const goldRingMagic = readFileSync('./src/common/mocks/gold-ring-magic.txt', 'utf-8');
  const helmetRareQuality = readFileSync('./src/common/mocks/helmet-rare-quality.txt', 'utf-8');
  const helmetRareNegativeQuality = readFileSync('./src/common/mocks/helmet-rare-negative-quality.txt', 'utf-8');
  const bow = readFileSync('./src/common/mocks/bow.txt', 'utf-8');
  const chaosBow = readFileSync('./src/common/mocks/chaos-bow.txt', 'utf-8');
  const elementalChaosBow = readFileSync('./src/common/mocks/elemental-chaos-bow.txt', 'utf-8');

  describe('getRarity', () => {
    it('should parse weapon rarity', () => {
      const rarity = ItemParser.getRarity(physDpsWeapon);

      expect(rarity).toEqual(ItemRarity.Rare);
    });

    it('should parse unidentified rarity', () => {
      const rarity = ItemParser.getRarity(relicUnidentified);

      expect(rarity).toEqual(ItemRarity.Magic);
    });

    it('should parse elemental weapon rarity', () => {
      const rarity = ItemParser.getRarity(elementalWeapon);

      expect(rarity).toEqual(ItemRarity.Rare);
    });

    it('should parse normal rarity w/quality', () => {
      const rarity = ItemParser.getRarity(weaponNormalQuality);
      expect(rarity).toEqual(ItemRarity.Normal);
    });

    it('should parse unique helmet armour rarity', () => {
      const rarity = ItemParser.getRarity(helmetUnique);
      expect(rarity).toEqual(ItemRarity.Unique);
    });

    it('should parse jewel rarity', () => {
      const rarity = ItemParser.getRarity(emerald);
      expect(rarity).toEqual(ItemRarity.Rare);
    });
  });

  describe('getName', () => {
    it('should parse rare weapon name', () => {
      const name = ItemParser.getName(physDpsWeapon);

      expect(name).toEqual('Rage Song');
    });

    it('should parse magic unidentified name', () => {
      const name = ItemParser.getName(relicUnidentified);

      expect(name).toEqual('Tapestry Relic');
    });

    it('should parse rare emerald name', () => {
      const name = ItemParser.getName(emerald);

      expect(name).toEqual('Spirit Spark');
    });

    it('should parse normal weapon name', () => {
      const name = ItemParser.getName(weaponNormalQuality);

      expect(name).toEqual('Superior Barrier Quarterstaff');
    });

    it('should parse magic name', () => {
      const name = ItemParser.getName(goldRingMagic);

      expect(name).toEqual('Elusory Gold Ring of Warmth');
    });

    it('should parse unique helmet armour name', () => {
      const name = ItemParser.getName(helmetUnique);

      expect(name).toEqual('Radiant Grief');
    });
  });

  describe('getQuality', () => {
    it('should parse weapon quality', () => {
      const quality = ItemParser.getQuality(weaponNormalQuality);

      expect(quality).toEqual(5);
    });

    it('should parse helmet quality', () => {
      const quality = ItemParser.getQuality(helmetRareQuality);

      expect(quality).toEqual(20);
    });

    it('should parse negative quality', () => {
      const quality = ItemParser.getQuality(helmetRareNegativeQuality);

      expect(quality).toEqual(-3);
    });
  });

  describe('getAttacksPerSecond', () => {
    it('should parse attacks per second', () => {
      const attacksPerSecond = ItemParser.getAttacksPerSecond(weaponNormalQuality);

      expect(attacksPerSecond).toEqual(1.4);
    });

    it('should parse attacks per second on rare weapon', () => {
      const attacksPerSecond = ItemParser.getAttacksPerSecond(physDpsWeapon);

      expect(attacksPerSecond).toEqual(1.77);
    });

    it('should return 0 for non-weapon', () => {
      const attacksPerSecond = ItemParser.getAttacksPerSecond(relicUnidentified);

      expect(attacksPerSecond).toEqual(0);
    });
  });

  describe('getItemClass', () => {
    it('should parse weapon item class', () => {
      const itemClass = ItemParser.getItemClass(physDpsWeapon);

      expect(itemClass).toEqual('Quarterstaves');
    });

    it('should parse helmet item class', () => {
      const itemClass = ItemParser.getItemClass(helmetRareQuality);

      expect(itemClass).toEqual('Helmets');
    });

    it('should parse helmet item class', () => {
      const itemClass = ItemParser.getItemClass(helmetRareNegativeQuality);

      expect(itemClass).toEqual('Helmets');
    });

    it('should parse jewel item class', () => {
      const itemClass = ItemParser.getItemClass(emerald);

      expect(itemClass).toEqual('Jewels');
    });

    it('should parse relic item class', () => {
      const itemClass = ItemParser.getItemClass(relicUnidentified);

      expect(itemClass).toEqual('Relics');
    });

    it('should parse a bow item class', () => {
      const itemClass = ItemParser.getItemClass(bow);

      expect(itemClass).toEqual('Bows');
    });
  });

  describe('getCriticalChance', () => {
    it('should parse weapon critical chance', () => {
      const criticalChance = ItemParser.getCriticalChance(weaponNormalQuality);

      expect(criticalChance).toEqual(10);
    });

    it('should parse helmet critical chance as 0', () => {
      const criticalChance = ItemParser.getCriticalChance(helmetRareQuality);

      expect(criticalChance).toEqual(0);
    });

    it('should parse bow critical chance', () => {
      const criticalChance = ItemParser.getCriticalChance(bow);

      expect(criticalChance).toEqual(5);
    });
  });

  describe('getDamages', () => {
    it('should parse weapon damage', () => {
      const damage = ItemParser.getDamages(weaponNormalQuality);

      expect(damage).toHaveLength(1);
      expect(damage[0].min).toEqual(35);
      expect(damage[0].max).toEqual(58);
      expect(damage[0].type).toEqual(DamageType.Physical);
    });

    it('should parse multiple weapon damages', () => {
      const damages = ItemParser.getDamages(elementalWeapon);

      expect(damages).toHaveLength(3);
      expect(damages[0].min).toEqual(412);
      expect(damages[0].max).toEqual(699);
      expect(damages[0].type).toEqual(DamageType.Physical);
      expect(damages[1].min).toEqual(38);
      expect(damages[1].max).toEqual(57);
      expect(damages[1].type).toEqual(DamageType.Fire);
      expect(damages[2].min).toEqual(2);
      expect(damages[2].max).toEqual(60);
      expect(damages[2].type).toEqual(DamageType.Lightning);
    });

    it('should parse a chaos bow', () => {
      const damages = ItemParser.getDamages(chaosBow);

      expect(damages).toHaveLength(2);
      expect(damages[0].min).toEqual(1);
      expect(damages[0].max).toEqual(6);
      expect(damages[0].type).toEqual(DamageType.Physical);
      expect(damages[1].min).toEqual(41);
      expect(damages[1].max).toEqual(69);
      expect(damages[1].type).toEqual(DamageType.Chaos);
    });

    it('should parse an elemental chaos bow', () => {
      const damages = ItemParser.getDamages(elementalChaosBow);

      expect(damages).toHaveLength(4);
    });
  });
});
