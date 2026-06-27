// 地理坐标都映射到一张 1000×700 的 SVG 视口
// 经度 104.0°E–108.0°E → x: 60–940 (每度 220)
// 纬度 25.5°N–29.5°N → y: 660–40 (每度 155,北高南低)
// 边界外点已做钳制,避免被裁掉

export type Place = {
  id: string;
  name: string;
  pinyin?: string;
  x: number;
  y: number;
  kind: "city" | "pass" | "crossing" | "town" | "mount";
  note?: string;
};

const P = (lng: number, lat: number): { x: number; y: number } => ({
  x: Math.max(40, Math.min(960, 60 + (lng - 104) * 220)),
  y: Math.max(30, Math.min(670, 660 - (lat - 25.5) * 155)),
});

export const places: Place[] = [
  // 主要城市
  { id: "zunyi", name: "遵义", pinyin: "Zunyi", ...P(106.91, 27.69), kind: "city", note: "黔北重镇,遵义会议召开地" },
  { id: "guiyang", name: "贵阳", pinyin: "Guiyang", ...P(106.71, 26.65), kind: "city", note: "贵州省会,蒋介石 3 月 20 日飞抵督战" },
  { id: "chongqing", name: "重庆", pinyin: "Chongqing", ...P(106.55, 29.56), kind: "city", note: "国民政府行营,川军后方" },
  { id: "luzhou", name: "泸州", pinyin: "Luzhou", ...P(105.43, 28.87), kind: "city", note: "川南重镇,扼长江上游" },
  { id: "zhaotong", name: "昭通", pinyin: "Zhaotong", ...P(103.71, 27.34), kind: "city" },
  { id: "bijie", name: "毕节", pinyin: "Bijie", ...P(105.30, 27.30), kind: "city", note: "黔西北枢纽" },
  { id: "tongzi", name: "桐梓", pinyin: "Tongzi", ...P(106.82, 28.13), kind: "town", note: "黔北门户,北拒川南" },
  { id: "xishui", name: "习水", pinyin: "Xishui", ...P(106.20, 28.33), kind: "town" },
  { id: "tucheng", name: "土城", pinyin: "Tucheng", ...P(106.00, 28.30), kind: "town", note: "青杠坡战斗地" },
  { id: "maotai", name: "茅台", pinyin: "Maotai", ...P(106.39, 27.85), kind: "town", note: "三渡赤水渡口,以酒闻名" },
  { id: "loushan", name: "娄山关", pinyin: "Loushan Pass", ...P(106.78, 27.85), kind: "pass", note: "川黔要隘,二渡关键一战" },
  { id: "gulin", name: "古蔺", pinyin: "Gulin", ...P(105.81, 27.95), kind: "town" },
  { id: "xuyong", name: "叙永", pinyin: "Xuyong", ...P(105.44, 28.16), kind: "town" },
  { id: "zhaxi", name: "扎西(威信)", pinyin: "Zhaxi/Weixin", ...P(105.05, 27.85), kind: "town", note: "今云南威信,二渡前集结地" },
  { id: "zhenxiong", name: "镇雄", pinyin: "Zhenxiong", ...P(104.87, 27.45), kind: "town" },
  { id: "dading", name: "大定", pinyin: "Dading", ...P(105.61, 27.14), kind: "town" },
  { id: "qianxi", name: "黔西", pinyin: "Qianxi", ...P(106.04, 27.03), kind: "town" },
  { id: "zhijin", name: "织金", pinyin: "Zhijin", ...P(105.77, 26.66), kind: "town" },
  { id: "anshun", name: "安顺", pinyin: "Anshun", ...P(105.95, 26.25), kind: "city" },
  { id: "xifeng", name: "息烽", pinyin: "Xifeng", ...P(106.73, 27.10), kind: "town", note: "乌江南岸要点" },
  { id: "jiangjiehe", name: "江界河", pinyin: "Jiangjiehe", ...P(107.20, 27.27), kind: "crossing", note: "四渡后南渡乌江主要渡口" },
  { id: "wengan", name: "瓮安", pinyin: "Wengan", ...P(107.47, 27.07), kind: "town" },
  { id: "meitan", name: "湄潭", pinyin: "Meitan", ...P(107.48, 27.77), kind: "town" },
  { id: "yuqing", name: "余庆", pinyin: "Yuqing", ...P(107.88, 27.22), kind: "town" },
  { id: "kaiyang", name: "开阳", pinyin: "Kaiyang", ...P(106.97, 27.06), kind: "town" },
  { id: "xiuwen", name: "修文", pinyin: "Xiuwen", ...P(106.59, 26.85), kind: "town" },
  { id: "ziyun", name: "紫云", pinyin: "Ziyun", ...P(106.08, 25.75), kind: "town" },
  { id: "changshun", name: "长顺", pinyin: "Changshun", ...P(106.45, 26.02), kind: "town" },
  { id: "huishui", name: "惠水", pinyin: "Huishui", ...P(106.66, 26.13), kind: "town" },
  { id: "longli", name: "龙里", pinyin: "Longli", ...P(106.97, 26.45), kind: "town" },
  { id: "panxian", name: "盘县", pinyin: "Panxian", ...P(104.65, 25.81), kind: "town" },
  { id: "qinglong", name: "晴隆", pinyin: "Qinglong", ...P(105.22, 25.83), kind: "town", note: "盘江渡口" },
  { id: "guanling", name: "关岭", pinyin: "Guanling", ...P(105.62, 25.94), kind: "town" },
  { id: "zhenning", name: "镇宁", pinyin: "Zhenning", ...P(105.77, 26.07), kind: "town" },
  { id: "huize", name: "会泽", pinyin: "Huize", ...P(103.30, 26.42), kind: "city", note: "滇东北要冲" },
  { id: "qiaojia", name: "巧家", pinyin: "Qiaojia", ...P(103.15, 26.92), kind: "town" },
  { id: "xuanwei", name: "宣威", pinyin: "Xuanwei", ...P(104.10, 26.21), kind: "city" },
  { id: "jiaopingdu", name: "皎平渡", pinyin: "Jiaopingdu", ...P(102.43, 26.78), kind: "crossing", note: "巧渡金沙江主要渡口" },
  { id: "yongshan", name: "永善", pinyin: "Yongshan", ...P(103.63, 28.23), kind: "town" },
  { id: "ludian", name: "鲁甸", pinyin: "Ludian", ...P(103.55, 27.19), kind: "town" },
  { id: "shatan", name: "沙滩", pinyin: "Shatan", ...P(106.50, 28.20), kind: "town" },
  { id: "banqiao", name: "板桥", pinyin: "Banqiao", ...P(106.80, 27.90), kind: "town" },
  { id: "yaxi", name: "鸭溪", pinyin: "Yaxi", ...P(106.65, 27.65), kind: "town" },
  { id: "fengxiang", name: "枫香", pinyin: "Fengxiang", ...P(106.55, 27.60), kind: "town" },
  { id: "lubanchang", name: "鲁班场", pinyin: "Lubanchang", ...P(106.30, 27.70), kind: "town", note: "三渡前 3 月 15 日攻坚未克" },
  { id: "gouba", name: "苟坝", pinyin: "Gouba", ...P(106.75, 27.85), kind: "town", note: "苟坝会议召开地" },
  { id: "changgan", name: "长干山", pinyin: "Changgan Shan", ...P(106.70, 27.80), kind: "mount", note: "遵义南侧制高点" },
  { id: "laoya", name: "老鸦山", pinyin: "Laoya Shan", ...P(106.95, 27.70), kind: "mount" },
  { id: "honghua", name: "红花岗", pinyin: "Honghuagang", ...P(106.90, 27.70), kind: "mount" },
  // 赤水河重要渡口
  { id: "cross-yuanhou", name: "元厚渡口", pinyin: "Yuanhou", ...P(105.95, 28.30), kind: "crossing", note: "一渡西进主渡口" },
  { id: "cross-taipingdu", name: "太平渡", pinyin: "Taipingdu", ...P(106.10, 28.13), kind: "crossing", note: "二渡、四渡东返主渡口" },
  { id: "cross-elangtan", name: "二郎滩", pinyin: "Erlangtan", ...P(106.18, 28.05), kind: "crossing", note: "二渡、四渡东返辅渡口" },
  { id: "cross-maotai", name: "茅台渡口", pinyin: "Maotai", ...P(106.39, 27.85), kind: "crossing", note: "三渡西进主渡口" },
  { id: "cross-chashanguan", name: "茶山关", pinyin: "Chashanguan", ...P(106.32, 27.65), kind: "crossing" },
];

export const placeById = Object.fromEntries(places.map((p) => [p.id, p]));