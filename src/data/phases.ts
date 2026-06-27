
import { placeById } from "./places";
import { forceById } from "./forces";

 // 5 个阶段:战前 + 四渡
 // 每一阶段说明一个时间断面上的态势,以及我军主力的去向

 export type Side = "red" | "kmt";

 export type PhaseForce = {
   forceId: string;
   // 用 placeId 锚定在某个已知地点,或者用直接坐标(比如"在叙永北 20 里")
   placeId?: string;
   x?: number;
   y?: number;
   note?: string;
   // 该阶段此番号是否被"打散"或"调到别处"——UI 上淡化
   faded?: boolean;
 };

 export type PhaseRoute = {
   from: { placeId?: string; x?: number; y?: number };
   to: { placeId?: string; x?: number; y?: number };
   side: Side;
   // move: 我军机动;attack: 进攻路线
   kind: "move" | "attack";
   label?: string;
 };

 export type PhaseBattle = {
   placeId?: string;
   x?: number;
   y?: number;
   name: string;
   result: "win" | "loss" | "draw";
   note?: string;
 };

 export type Phase = {
   id: "pre" | "first" | "second" | "third" | "fourth";
   index: number;
   label: string;       // 段落标题
   tagline: string;     // 副标题
   date: string;        // 起
   endDate: string;     // 止
   narrative: string[]; // 叙事段落
   insight: string;     // 战略点评
   facts: { k: string; v: string }[];
   forces: PhaseForce[];
   routes: PhaseRoute[];
   battles: PhaseBattle[];
 };

 // 工具:把 placeId 解析为 {x,y},便于绘图组件直接消费
 export function resolve(p: { placeId?: string; x?: number; y?: number }) {
   if (p.placeId && placeById[p.placeId]) {
     return { x: placeById[p.placeId].x, y: placeById[p.placeId].y };
   }
   return { x: p.x ?? 0, y: p.y ?? 0 };
 }

 export const phases: Phase[] = [
   // ===== Phase 0: 战前态势 =====
   {
     id: "pre",
     index: 0,
     label: "战前态势",
     tagline: "遵义会议后,中央红军被围在黔北一隅",
     date: "1935-01-19",
     endDate: "1935-01-28",
     narrative: [
       "1935 年 1 月 7 日,中央红军自乌江南渡,9 日进抵遵义。15 日至 17 日,遵义会议召开,改组了中央领导,毛泽东进入三人军事指挥小组。这是一切的前提:从此红军的行止,从被动逃亡变成了有意识、有节奏的机动。",
       "此时中央红军约 3 万人,集结于遵义、桐梓、湄潭一带,东面乌江、南面贵阳、北面长江均被国民党重兵封堵。蒋介石以薛岳率中央军 8 万追击,川军、滇军、黔军合计约 30 万沿赤水河、乌江、金沙江布防。三万对四十万,空间只有黔北这一小片。",
       "1 月 19 日,红军分三路自遵义北上桐梓、习水,准备从土城一带西渡赤水,入川与红四方面军会合,这是当时最自然的出路——也正是蒋介石设下包围圈所预期的那一步。",
     ],
     insight:
       "四渡赤水不是神来之笔,而是当所有`正确的选项`都被堵死之后,毛泽东选择放弃最优目标、转为机动换空间的必然结果。其后每一次渡河,都是在放弃与重新选择之间的小步腾挪。",
     facts: [
       { k: "红军兵力", v: "约 30,000" },
       { k: "敌方兵力", v: "约 400,000" },
       { k: "主要被围方向", v: "东:乌江 / 北:长江 / 南:贵阳" },
     ],
     forces: [
       { forceId: "r-zyz", placeId: "zunyi" },
       { forceId: "r-1st", placeId: "tongzi" },
       { forceId: "r-3rd", placeId: "zunyi", x: 580, y: 380, note: "遵义南、虾子一带" },
       { forceId: "r-5th", placeId: "zunyi", x: 560, y: 340, note: "泗渡 / 板桥" },
       { forceId: "r-9th", placeId: "meitan" },

       { forceId: "k-wuqiwei", placeId: "xifeng", note: "已南渡乌江,正向息烽推进" },
       { forceId: "k-zhouhunyuan", placeId: "maotai", x: 478, y: 320, note: "鲁班场、仁怀一带" },
       { forceId: "k-ouzhen", placeId: "qianxi" },

       { forceId: "k-panwenhua", placeId: "xuyong", note: "扼守川南、长江北岸" },
       { forceId: "k-fanshaozeng", placeId: "gulin" },
       { forceId: "k-zhouhuacheng", placeId: "tucheng", x: 500, y: 215, note: "扼土城、赤水一线" },

       { forceId: "k-sundu", placeId: "zhaxi", note: "滇军扼川滇边境" },

       { forceId: "k-hezhizhong", placeId: "tongzi", x: 555, y: 270, note: "黔军,遵义北" },
       { forceId: "k-baihuizhang", placeId: "zunyi", x: 600, y: 360, note: "黔军,遵义城内" },
       { forceId: "k-wangjialie", placeId: "zunyi", note: "黔军主帅王家烈坐镇遵义" },
     ],
     routes: [
       { from: { placeId: "wengan" }, to: { placeId: "xifeng" }, side: "kmt", kind: "attack", label: "吴奇伟南渡乌江" },
     ],
     battles: [],
   },

   // ===== Phase 1: 一渡赤水 =====
   {
     id: "first",
     index: 1,
     label: `一渡赤水`,
     tagline: "青杠坡失利,放弃北渡长江",
     date: "1935-01-29",
     endDate: "1935-02-09",
     narrative: [
       "1 月 27 日,红军抵达土城,与川军郭勋祺部在青杠坡一带接战。战前情报不准——原以为川军只有 4 个团,实际超过 6 个。激战一日,双方伤亡都大,红军未能打开局面。",
       "28 日,毛泽东与政治局在土城召开会议,当机立断:放弃原定的北渡长江与红四方面军会合的计划,改为轻装西渡赤水,转向川南、滇东北。29 日凌晨,中央红军主力分多路从元厚、土城西南一渡赤水河。",
       "一渡之后,中央红军在古蔺、叙永、扎西(今威信)一带的川南滇东北山区集结。那里山高路险,人烟稀少,蒋介石的中央军一时无法深入;但同时,川军、滇军也摸不清红军去向,犹豫观望。",
     ],
     insight:
        "一渡的关键不在`渡`,而在`放弃`——毛泽东第一次真正撤下了原定的战略目标。这等于承认了`过金沙江与张国烬会合`短期内不可行,转而以空间换时间,把战场从黔北搬到蒋介石的包围圈外线。",
     facts: [
       { k: "时间", v: "1935-01-29" },
       { k: "主渡口", v: "元厚、土城西南" },
       { k: "去向", v: "川南古蔺、叙永、扎西" },
       { k: "关键战役", v: "青杠坡(失利)" },
     ],
     forces: [
       { forceId: "r-zyz", placeId: "zhaxi", x: 285, y: 320, note: "中央纵队已抵扎西" },
       { forceId: "r-1st", placeId: "gulin", x: 430, y: 290, note: "古蔺西、站底一带" },
       { forceId: "r-3rd", placeId: "gulin", x: 480, y: 305, note: "古蔺南" },
       { forceId: "r-5th", placeId: "xuyong", x: 360, y: 280, note: "叙永东南" },
       { forceId: "r-9th", placeId: "meitan", x: 760, y: 360, note: "九军团奉命留湄潭,牵制敌人" },

       { forceId: "k-zhouhuacheng", placeId: "tucheng", note: "川军扼守土城、赤水一线" },
       { forceId: "k-panwenhua", placeId: "xuyong", note: "川军已沿赤水河西进" },
       { forceId: "k-fanshaozeng", placeId: "gulin", x: 440, y: 295, note: "川军已西进至古蔺" },
       { forceId: "k-sundu", placeId: "zhaxi", x: 230, y: 340, note: "滇军孙渡奉命入黔堵截" },

       { forceId: "k-wuqiwei", placeId: "guiyang", x: 656, y: 500, note: "吴奇伟已南进至贵阳、龙里" },
       { forceId: "k-zhouhunyuan", placeId: "maotai", note: "周浑元仍据茅台、鲁班场" },
       { forceId: "k-hezhizhong", placeId: "tongzi", faded: true, note: "黔军退守桐梓以北" },
     ],
     routes: [
       { from: { placeId: "tucheng" }, to: { placeId: "gulin" }, side: "red", kind: "move", label: "西渡赤水,入川南" },
       { from: { placeId: "gulin" }, to: { placeId: "zhaxi" }, side: "red", kind: "move", label: "深入滇东北" },
       { from: { placeId: "tucheng" }, to: { placeId: "gulin" }, side: "kmt", kind: "attack", label: "川军西进追击" },
     ],
     battles: [
       { placeId: "tucheng", x: 480, y: 240, name: "青杠坡战斗", result: "loss", note: "未能攻克土城,伤亡较大" },
     ],
   },

   // ===== Phase 2: 二渡赤水 =====
   {
     id: "second",
     index: 2,
     label: "二渡赤水",
     tagline: "再渡东进,夺遵义,长征以来最大胜仗",
     date: "1935-02-18",
     endDate: "1935-02-28",
     narrative: [
       "在川南、滇东北的扎西,中央政治局 2 月 5 日至 9 日连续召开会议,决定:暂缓北渡,回师东进,再渡赤水,重返黔北。蒋介石的部署是`围堵川南`,但他没想到毛泽东会把原方向 180°掉头。",
       "2 月 18 日至 21 日,中央红军在太平渡、二郎滩二渡赤水河,再次进入贵州腹地。25 日,红一军团在娄山关击破黔军王家烈部;26 日至 27 日,红三军团在遵义城南的老鸦山、红花岗一线,与中央军吴奇伟部两个师决战,取得完胜。",
       "这是长征以来中央红军最大的一次胜仗:歼灭和俘虏敌军约三千,缴获枪支两千余,还得到了大量物资补充。蒋介石在重庆得知后称之为`国军追击以来的奇耻大辱`。",
     ],
     insight:
       "二渡是`动`与`静`颠倒的关键。蒋介石和川、滇军以为红军还要西进,主力在川南集结;毛泽东借这个错觉反向机动,让红军`插回`到敌人认为不可能再出现的地方——自己熟悉的黔北山区。",
     facts: [
       { k: "时间", v: "1935-02-18 至 02-28" },
       { k: "主渡口", v: "太平渡、二郎滩" },
       { k: "关键战役", v: "娄山关、遵义" },
       { k: "战果", v: "俘 3,000+, 缴枪 2,000+" },
     ],
     forces: [
       { forceId: "r-zyz", placeId: "zunyi" },
       { forceId: "r-1st", placeId: "loushan", note: "攻下娄山关后进至板桥" },
       { forceId: "r-3rd", placeId: "zunyi", x: 590, y: 360, note: "主攻遵义,激战老鸦山" },
       { forceId: "r-5th", placeId: "zunyi", x: 565, y: 340, note: "扼守红花岗,断敌退路" },
       { forceId: "r-9th", placeId: "meitan", note: "九军团在湄潭一带活动,牵制敌人" },

       { forceId: "k-wuqiwei", placeId: "zunyi", x: 640, y: 360, note: "吴奇伟率 2 个师来援,被击溃南逃" },
       { forceId: "k-zhouhunyuan", placeId: "maotai", note: "周浑元未及时增援遵义" },
       { forceId: "k-ouzhen", placeId: "guiyang", x: 670, y: 530, note: "欧震远在贵阳东" },
       { forceId: "k-hezhizhong", placeId: "loushan", faded: true, note: "黔军何知重被击溃" },
       { forceId: "k-baihuizhang", placeId: "zunyi", faded: true, note: "黔军柏辉章被击溃" },
     ],
     routes: [
       { from: { placeId: "zhaxi" }, to: { placeId: "gulin" }, side: "red", kind: "move" },
       { from: { placeId: "gulin" }, to: { placeId: "cross-taipingdu" }, side: "red", kind: "move" },
       { from: { placeId: "cross-taipingdu" }, to: { placeId: "tongzi" }, side: "red", kind: "move" },
       { from: { placeId: "tongzi" }, to: { placeId: "loushan" }, side: "red", kind: "attack", label: "攻娄山关" },
       { from: { placeId: "loushan" }, to: { placeId: "zunyi" }, side: "red", kind: "attack", label: "再夺遵义" },
       { from: { placeId: "zunyi" }, to: { placeId: "guiyang" }, side: "kmt", kind: "move", label: "吴奇伟残部南逃" },
     ],
     battles: [
       { placeId: "loushan", name: "娄山关之战", result: "win", note: "红一军团击破黔军,2 月 25-26 日" },
       { placeId: "zunyi", name: "遵义之战", result: "win", note: "红三军团击败吴奇伟 2 师,2 月 27-28 日" },
     ],
   },

   // ===== Phase 3: 三渡赤水 =====
   {
     id: "third",
     index: 3,
     label: "三渡赤水",
     tagline: "示形于西,诱敌往川南集结",
     date: "1935-03-16",
     endDate: "1935-03-17",
     narrative: [
       "遵义大捷后,蒋介石 3 月 2 日飞抵重庆,5 日又亲赴贵阳`督剿`,调集中央军、川军、滇军四面合围,要求在黔北围歼红军。3 月 14 日,红军主动进攻鲁班场周浑元部,激战一日未能攻克,毛泽东决定再次西渡。",
        "3 月 16 日至 17 日,中央红军主力自茅台渡口三渡赤水河,再次进入川南古蔺一带。同时派出一支小部队,伪装成主力,大张旗鼓地向古蔺、叙永方向前进,沿途宣称`要到金沙江去`。",
       "蒋介石得报,判断红军仍要西渡金沙江、入川会合红四方面军,急令川军、滇军、中央军在川南、滇东北构筑第二道封锁线;他还调动黔军、桂军各一部北上,堵住乌江渡口。",
     ],
     insight:
       "三渡赤水的本质是`造势`——用一个 1,000 人的佯动,把十几万敌人从黔北调到川南去。等敌人在川南重新布好口袋,红军已经悄悄回到赤水河东岸。声东击西的关键,不是`声`做得多大,而是对方真的信了。",
     facts: [
       { k: "时间", v: "1935-03-16 至 03-17" },
       { k: "主渡口", v: "茅台" },
       { k: "去向", v: "古蔺、叙永" },
       { k: "关键佯动", v: "1 个团伪装主力向川南急进" },
     ],
     forces: [
       { forceId: "r-zyz", placeId: "cross-maotai", x: 480, y: 320, note: "已三渡,集结于古蔺东" },
       { forceId: "r-1st", placeId: "gulin", x: 420, y: 305, note: "主力已抵古蔺" },
       { forceId: "r-3rd", placeId: "gulin", x: 470, y: 310 },
       { forceId: "r-5th", placeId: "gulin", x: 450, y: 295 },
       { forceId: "r-9th", placeId: "gulin", x: 410, y: 320, note: "九军团也随主力西渡" },

       { forceId: "k-zhouhunyuan", placeId: "lubanchang", note: "周浑元仍据茅台、鲁班场一线" },
       { forceId: "k-wuqiwei", placeId: "guiyang", x: 670, y: 530, note: "吴奇伟在贵阳收整残部" },
       { forceId: "k-ouzhen", placeId: "guiyang", x: 700, y: 520 },
       { forceId: "k-panwenhua", placeId: "xuyong", x: 350, y: 250, note: "川军主力正向叙永集结" },
       { forceId: "k-fanshaozeng", placeId: "gulin", x: 430, y: 285, note: "已抵古蔺" },
       { forceId: "k-sundu", placeId: "xuyong", x: 330, y: 270, note: "滇军孙渡兼程南下" },
     ],
     routes: [
       { from: { placeId: "lubanchang" }, to: { placeId: "cross-maotai" }, side: "red", kind: "move" },
       { from: { placeId: "cross-maotai" }, to: { placeId: "gulin" }, side: "red", kind: "move", label: "三渡赤水,入川南" },
       { from: { placeId: "gulin" }, to: { placeId: "xuyong" }, side: "red", kind: "move", label: "佯动,声言北上金沙江" },
       { from: { placeId: "gulin" }, to: { placeId: "xuyong" }, side: "kmt", kind: "move", label: "川、滇军向川南急进" },
     ],
     battles: [
       { placeId: "lubanchang", name: "鲁班场战斗", result: "draw", note: "3 月 15 日,未能攻克周浑元部" },
     ],
   },

   // ===== Phase 4: 四渡赤水 =====
   {
     id: "fourth",
     index: 4,
     label: "四渡赤水",
     tagline: "出其不意,再次东渡,直插乌江以南",
     date: "1935-03-21",
     endDate: "1935-03-22",
     narrative: [
       "蒋介石 3 月 20 日飞到贵阳督战,认为红军`必入川南、必渡金沙江`,把中央军和川、滇军的精锐都往西调——贵阳一时成了后方。这正是毛泽东等的时机。",
       "3 月 20 日夜,中央红军在古蔺以东的山地间隐蔽集结。21 日至 22 日,主力出其不意地自太平渡、九溪口、林滩等渡口四渡赤水河,折回贵州。一夜之间,红军从敌人以为的`西去主力`变成了`东返奇兵`。",
       "四渡之后,红军快速南下,3 月 29 日到达乌江南岸。31 日,从瓮安西南的江界河、孙家渡、茶山关等渡口南渡乌江,跳出川、黔、滇军的合围。蒋介石 3 月 31 日还在贵阳督战,4 月初发现红军主力已到贵阳以南、紫云、长顺一线,方知上当。",
     ],
     insight:
       "四渡赤水是整个战役的`胜负手`。前三次渡河,只是让红军在包围圈里腾挪;第四次,毛泽东把西进的佯动做足,等蒋介石把精锐都调到西边后,突然反向。这不是`声东击西`的简单重复,而是在佯动方向上构建了一个足够逼真的`假目标`,让敌人在关键时间点上做出错误决策。",
     facts: [
       { k: "时间", v: "1935-03-21 至 03-22" },
       { k: "主渡口", v: "太平渡、九溪口、林滩" },
       { k: "去向", v: "乌江以南" },
       { k: "后续", v: "3-31 南渡乌江,直插贵阳以南" },
     ],
     forces: [
       { forceId: "r-zyz", placeId: "cross-taipingdu", x: 420, y: 270, note: "已四渡,正向遵义以东南下" },
       { forceId: "r-1st", placeId: "shatan", x: 510, y: 270, note: "红一军团经沙滩南下" },
       { forceId: "r-3rd", placeId: "banqiao", x: 555, y: 320, note: "红三军团经板桥南下" },
       { forceId: "r-5th", placeId: "yaxi", note: "红五军团鸭溪一带掩护" },
       { forceId: "r-9th", placeId: "gulin", x: 410, y: 320, note: "九军团在古蔺东继续佯动,牵制川军" },

       { forceId: "k-panwenhua", placeId: "xuyong", x: 350, y: 260, note: "川军仍在叙永,扑空" },
       { forceId: "k-fanshaozeng", placeId: "gulin", x: 430, y: 295, note: "扑空,被甩在赤水河西" },
       { forceId: "k-sundu", placeId: "xuyong", x: 330, y: 270, note: "滇军扑空" },
       { forceId: "k-zhouhunyuan", placeId: "lubanchang", note: "周浑元未察觉" },
       { forceId: "k-wuqiwei", placeId: "guiyang", x: 656, y: 482, note: "吴奇伟奉命回防贵阳" },
       { forceId: "k-ouzhen", placeId: "guiyang", x: 670, y: 480 },
     ],
     routes: [
       { from: { placeId: "gulin" }, to: { placeId: "cross-taipingdu" }, side: "red", kind: "move", label: "秘密东渡" },
       { from: { placeId: "cross-taipingdu" }, to: { placeId: "banqiao" }, side: "red", kind: "move" },
       { from: { placeId: "banqiao" }, to: { placeId: "jiangjiehe" }, side: "red", kind: "move", label: "急行军,准备南渡乌江" },
       { from: { placeId: "jiangjiehe" }, to: { placeId: "xifeng" }, side: "red", kind: "move" },
       { from: { placeId: "gulin" }, to: { placeId: "xuyong" }, side: "kmt", kind: "move", label: "川、滇军急进,扑空" },
     ],
     battles: [
       { placeId: "cross-taipingdu", name: "四渡赤水", result: "win", note: "3-21/22,秘密东返" },
       { placeId: "jiangjiehe", name: "南渡乌江", result: "win", note: "3-31,从江界河等渡口突破" },
     ],
   },
 ];


// ——— 主图(全程态势)用辅助:把日期串转成数字 ———
export function dateNum(s: string): number {
  // yyyy-mm-dd -> 19350119
  return Number(s.replaceAll("-", ""));
}

// ——— 主图用:在给定日期,从该部队参与的相邻两个阶段之间线性插值 ———
export function getForcePosAt(
  forceId: string,
  dateStr: string,
): { x: number; y: number; phase: Phase; side: "red" | "kmt"; faction: string; commander: string; strength: number; name: string; faded: boolean } | null {
  // 该部队参与过的阶段
  const occurrences = phases
    .map((p, i) => ({ phase: p, index: i, force: p.forces.find((fp) => fp.forceId === forceId) }))
    .filter((o) => o.force);
  if (occurrences.length === 0) return null;
  // 该部队的首次出现阶段:在 date 之前/正好,则用其位置
  // 处于两次出现之间:用线性插值
  // 处于该部队所有出现之外:返回 null(不在场上)

  const dt = dateNum(dateStr);
  // 早于首次出现 → 还在出发地之前的概念:用首次出现的位置
  if (dt < dateNum(occurrences[0].phase.date)) {
    const f = occurrences[0].force!;
    return makePos(occurrences[0].phase, f);
  }
  // 晚于末次出现 → 用末次出现
  const last = occurrences[occurrences.length - 1];
  if (dt > dateNum(last.phase.endDate)) {
    const f = last.force!;
    return makePos(last.phase, f);
  }
  // 在出现区间内:看是处于哪个阶段内,或两个相邻出现之间
  for (let i = 0; i < occurrences.length; i++) {
    const o = occurrences[i];
    if (dt >= dateNum(o.phase.date) && dt <= dateNum(o.phase.endDate)) {
      // 处于该阶段
      return makePos(o.phase, o.force!);
    }
    if (i + 1 < occurrences.length) {
      const next = occurrences[i + 1];
      if (dt > dateNum(o.phase.endDate) && dt < dateNum(next.phase.date)) {
        // 两个阶段之间的"间歇期",用 lerp
        const a = makePos(o.phase, o.force!);
        const b = makePos(next.phase, next.force!);
        const t = (dt - dateNum(o.phase.endDate)) / (dateNum(next.phase.date) - dateNum(o.phase.endDate));
        return { ...a, x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, faded: false };
      }
    }
  }
  return makePos(last.phase, last.force!);
}

function makePos(phase: Phase, fp: PhaseForce) {
  const f = forceById[fp.forceId];
  const pos = resolve({ placeId: fp.placeId, x: fp.x, y: fp.y });
  return {
    x: pos.x,
    y: pos.y,
    phase,
    side: f!.side,
    faction: f!.faction,
    commander: f!.commander,
    strength: f!.strength,
    name: f!.name,
    faded: !!fp.faded,
  };
}

// ——— 主图用:在给定日期已经走过的所有路线(累计) ———
export function getRoutesUpTo(dateStr: string): Array<PhaseRoute & { phaseId: string; phaseLabel: string }> {
  const dt = dateNum(dateStr);
  const out: Array<PhaseRoute & { phaseId: string; phaseLabel: string }> = [];
  for (const p of phases) {
    if (dateNum(p.endDate) <= dt) {
      for (const r of p.routes) out.push({ ...r, phaseId: p.id, phaseLabel: p.label });
    } else if (dateNum(p.date) <= dt) {
      // 处于该阶段内:只显示已完成的部分(用 from->to 的 50% 动画模拟)
      for (const r of p.routes) out.push({ ...r, phaseId: p.id, phaseLabel: p.label });
    }
  }
  return out;
}

// ——— 主图用:在给定日期已发生的战斗 ———
export function getBattlesUpTo(dateStr: string): Array<PhaseBattle & { phaseId: string }> {
  const dt = dateNum(dateStr);
  const out: Array<PhaseBattle & { phaseId: string }> = [];
  for (const p of phases) {
    if (dateNum(p.endDate) <= dt) {
      for (const b of p.battles) out.push({ ...b, phaseId: p.id });
    }
  }
  return out;
}