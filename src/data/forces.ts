// 双方番号:一侧作战单元
// 强度为约数(教材通行说法,精确到 1k 已足够读图)

export type Force = {
  id: string;
  name: string;
  side: "red" | "kmt";
  faction: "central" | "sichuan" | "yunnan" | "guizhou";
  commander: string;
  strength: number;
  color: string;
};

export const forces: Force[] = [
  // 红军方面军
  { id: "r-1st", name: "红一军团", side: "red", faction: "central", commander: "林彪", strength: 8000, color: "var(--red-army)" },
  { id: "r-3rd", name: "红三军团", side: "red", faction: "central", commander: "彭德怀", strength: 6500, color: "var(--red-army)" },
  { id: "r-5th", name: "红五军团", side: "red", faction: "central", commander: "董振堂", strength: 5000, color: "var(--red-army)" },
  { id: "r-9th", name: "红九军团", side: "red", faction: "central", commander: "罗炳辉", strength: 3000, color: "var(--red-army)" },
  { id: "r-zyz", name: "中央纵队", side: "red", faction: "central", commander: "党中央 / 中革军委", strength: 7500, color: "var(--red-army)" },

  // 国民党中央军(薛岳)
  { id: "k-xueyue", name: "薛岳兵团", side: "kmt", faction: "central", commander: "薛岳", strength: 80000, color: "var(--kmt-central)" },
  { id: "k-wuqiwei", name: "吴奇伟纵队", side: "kmt", faction: "central", commander: "吴奇伟", strength: 14000, color: "var(--kmt-central)" },
  { id: "k-zhouhunyuan", name: "周浑元纵队", side: "kmt", faction: "central", commander: "周浑元", strength: 18000, color: "var(--kmt-central)" },
  { id: "k-ouzhen", name: "欧震纵队", side: "kmt", faction: "central", commander: "欧震", strength: 16000, color: "var(--kmt-central)" },

  // 川军
  { id: "k-panwenhua", name: "川军·潘文华", side: "kmt", faction: "sichuan", commander: "潘文华", strength: 12000, color: "var(--kmt-sichuan)" },
  { id: "k-fanshaozeng", name: "川军·范绍增", side: "kmt", faction: "sichuan", commander: "范绍增", strength: 8000, color: "var(--kmt-sichuan)" },
  { id: "k-zhouhuacheng", name: "川军·周化成", side: "kmt", faction: "sichuan", commander: "周化成", strength: 6000, color: "var(--kmt-sichuan)" },
  { id: "k-liubiao", name: "川军·刘湘主力", side: "kmt", faction: "sichuan", commander: "刘湘", strength: 20000, color: "var(--kmt-sichuan)" },

  // 滇军
  { id: "k-sundu", name: "滇军·孙渡纵队", side: "kmt", faction: "yunnan", commander: "孙渡", strength: 14000, color: "var(--kmt-yunnan)" },
  { id: "k-longyun", name: "滇军·龙云", side: "kmt", faction: "yunnan", commander: "龙云", strength: 10000, color: "var(--kmt-yunnan)" },

  // 黔军
  { id: "k-wangjialie", name: "黔军·王家烈", side: "kmt", faction: "guizhou", commander: "王家烈", strength: 8000, color: "var(--kmt-guizhou)" },
  { id: "k-hezhizhong", name: "黔军·何知重", side: "kmt", faction: "guizhou", commander: "何知重", strength: 6000, color: "var(--kmt-guizhou)" },
  { id: "k-baihuizhang", name: "黔军·柏辉章", side: "kmt", faction: "guizhou", commander: "柏辉章", strength: 5000, color: "var(--kmt-guizhou)" },
];

export const forceById = Object.fromEntries(forces.map((f) => [f.id, f]));

export function forcesBySide(side: "red" | "kmt") {
  return forces.filter((f) => f.side === side);
}