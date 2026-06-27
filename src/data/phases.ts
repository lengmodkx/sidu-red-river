
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
   id: "preface" | "pre" | "first" | "second" | "third" | "fourth" | "aftermath";
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
 ﻿
  // ===== Phase 0: 遵义会议(战役的政治前提) =====
  {
    id: "preface",
    index: 0,
    label: "遵义会议",
    tagline: "改组领导,毛泽东重回决策核心",
    date: "1935-01-07",
    endDate: "1935-01-18",
    narrative: [
      "1935 年 1 月 7 日凌晨,中央红军智取黔北重镇遵义,黔军王家烈弃城而逃。这是中央红军自长征以来攻下的第一座中等城市,也是他们自离开江西中央苏区后,第一次获得稳定休整的机会。",
      "1 月 9 日,红军入城。1 月 15 日至 17 日,中共中央政治局扩大会议在遵义老城召开(柏公馆),持续三天。核心议程是总结第五次反「围剿」失败与长征初期的军事失误。会议决定:`取消博古、李德的最高军事指挥权`,改组中央领导机构;`毛泽东当选政治局常委`,进入最高军事决策核心。",
      "会议还作了一个对未来走向影响深远的安排:确定北上与红四方面军会合的战略目标仍然有效,但具体实施由毛泽东、周恩来、王稼祥组成的三人小组负责军事指挥。这是 30 岁的毛泽东第一次获得中央红军的实际指挥权——尽管名义上仍是「周恩来负总责」。",
      "1 月 18 日会议结束后当晚,中央红军即撤离遵义向北移动,准备从泸州、宜宾一带北渡长江,进入四川与红四方面军会合。1 月 19 日,红军兵分三路,从遵义、桐梓、湄潭地区北上,正式拉开四渡赤水的序幕。",
    ],
    insight:
      "遵义会议本身没有改变任何一处战场态势,但它做了一件更重要的事:`把指挥权交回到懂打仗的人手上`。从此毛泽东可以公开调整军委的作战命令,而不必再以个人建议的方式曲线救国。这是后面三次渡赤水的全部可能性前提。",
    facts: [
      { k: "时间", v: "1935-01-15 至 01-17" },
      { k: "地点", v: "遵义老城(柏公馆)" },
      { k: "核心决议", v: "改组领导、确立毛参与最高军事指挥" },
      { k: "会后去向", v: "北上土城、赤水,准备北渡长江" },
    ],
    forces: [
      { forceId: "r-zyz", placeId: "zunyi", note: "中央纵队驻遵义城内" },
      { forceId: "r-1st", placeId: "tongzi", note: "红一军团在桐梓、遵义北" },
      { forceId: "r-3rd", placeId: "zunyi", x: 595, y: 405, note: "红三军团驻遵义南、虾子" },
      { forceId: "r-5th", placeId: "zunyi", x: 580, y: 385, note: "红五军团驻遵义西,泗渡" },
      { forceId: "r-9th", placeId: "meitan", note: "红九军团在湄潭、瓮安" },

      { forceId: "k-wuqiwei", placeId: "guiyang", x: 755, y: 568, note: "吴奇伟部在贵阳东" },
      { forceId: "k-zhouhunyuan", placeId: "xifeng", note: "周浑元已南渡乌江" },
      { forceId: "k-ouzhen", placeId: "qianxi", note: "欧震在黔西" },
      { forceId: "k-panwenhua", placeId: "xuyong", note: "川军扼守川南" },
      { forceId: "k-fanshaozeng", placeId: "gulin", note: "川军在西面" },
      { forceId: "k-zhouhuacheng", placeId: "tucheng", note: "川军据土城" },
      { forceId: "k-wangjialie", placeId: "zunyi", x: 765, y: 405, note: "黔军王家烈驻遵义" },
      { forceId: "k-sundu", placeId: "zhaxi", note: "滇军在扎西、威信" },
    ],
    routes: [
      { from: { placeId: "xifeng" }, to: { placeId: "zunyi" }, side: "kmt", kind: "attack", label: "中央军向遵义推进" },
    ],
    battles: [],
  },

  // ===== Phase 0: 战前态势 =====
   {
     id: "pre",
     index: 1,
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
     index: 2,
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
     index: 3,
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
﻿  {
    id: "third",
    index: 4,
    label: "三渡赤水",
    tagline: "示形于西,诱敌往川南集结",
    date: "1935-03-10",
    endDate: "1935-03-19",
    narrative: [
      "二渡之后,蒋介石 3 月 2 日飞抵重庆、5 日又亲赴贵阳`督剿`,调集中央军、川军、滇军、黔军四面包围,要求在黔北围歼红军。中央红军主力驻于遵义、鸭溪、枫香一带,等待战机。",
      "3 月 14 日,毛泽东决定在鲁班场打周浑元部,试图把蒋介石的包围圈撕开一个口子。3 月 15 日,红军三个军团围攻鲁班场,激战一日未能攻克,自身伤亡上千——这是遵义会议后毛泽东第一次亲自部署的攻坚战,也是少数没能打成的。",
      "当晚,中共中央在苟坝召开紧急会议,讨论是否进攻打鼓新场的国民党军。会议多数人主张进攻,只有毛泽东反对。会后毛泽东说服周恩来撤销了进攻命令,当夜又提着马灯走了几里路回到会场,重申他的判断:进攻等于让国民党收拢包围圈,红军必须立即西渡赤水,跳到外线去。",
      "3 月 16 日至 17 日,中央红军主力在茅台三渡赤水河,再次进入川南古蔺一带。同时派出一个团伪装主力,大张旗鼓地向古蔺、叙永方向前进,沿途宣称`要到金沙江去`——这是整个四渡赤水中最精妙的佯动。",
      "3 月 18 日至 19 日,蒋介石果然中计,判断红军将西渡金沙江、入川会合红四方面军,急令川军、滇军、中央军在川南、滇东北构筑第二道封锁线;他还调动黔军、桂军各一部北上,堵住乌江渡口。短短两三天,十几万敌军从黔北掉头,急行军赶往川南。",
    ],
    insight:
      "三渡的本质是`造势`——用一个团的佯动,把十几万敌人从黔北调到川南去。等敌人在川南重新布好口袋,红军已经悄悄回到赤水河东岸。声东击西的关键,不是`声`做得多大,而是`让对方真的信了`。这一阶段还埋着另一个关键决策:苟坝会议那晚,毛泽东用一票否决了多数人打鼓新场的提议,从此他在军事决策上的个人权威真正确立。",
    facts: [
      { k: "时间", v: "1935-03-10 至 03-19" },
      { k: "主渡口", v: "茅台" },
      { k: "去向", v: "古蔺、叙永" },
      { k: "关键佯动", v: "1 个团伪装主力向川南急进" },
      { k: "关键会议", v: "苟坝会议(3-15 夜)" },
    ],
    forces: [
      { forceId: "r-zyz", placeId: "gouba", x: 562, y: 405, note: "中央纵队驻苟坝,3-15 夜召开会议" },
      { forceId: "r-1st", placeId: "lubanchang", x: 528, y: 432, note: "红一军团攻鲁班场北侧" },
      { forceId: "r-3rd", placeId: "lubanchang", x: 545, y: 450, note: "红三军团攻鲁班场南侧" },
      { forceId: "r-5th", placeId: "yaxi", x: 540, y: 425, note: "红五军团驻鸭溪作预备队" },
      { forceId: "r-9th", placeId: "meitan", note: "九军团仍留湄潭,牵制敌人" },

      { forceId: "k-zhouhunyuan", placeId: "lubanchang", note: "周浑元据茅台、鲁班场一线,未被攻克" },
      { forceId: "k-wuqiwei", placeId: "guiyang", note: "吴奇伟在贵阳收整残部" },
      { forceId: "k-ouzhen", placeId: "guiyang", x: 770, y: 575 },
      { forceId: "k-panwenhua", placeId: "xuyong", note: "川军主力正向叙永集结" },
      { forceId: "k-fanshaozeng", placeId: "gulin", x: 446, y: 365, note: "已抵古蔺" },
      { forceId: "k-sundu", placeId: "xuyong", note: "滇军孙渡兼程南下" },
    ],
    routes: [
      { from: { placeId: "zunyi" }, to: { placeId: "lubanchang" }, side: "red", kind: "attack", label: "红军围攻鲁班场" },
      { from: { placeId: "lubanchang" }, to: { placeId: "cross-maotai" }, side: "red", kind: "move" },
      { from: { placeId: "cross-maotai" }, to: { placeId: "gulin" }, side: "red", kind: "move", label: "三渡赤水,入川南" },
      { from: { placeId: "gulin" }, to: { placeId: "xuyong" }, side: "red", kind: "move", label: "佯动,声言北上金沙江" },
      { from: { placeId: "gulin" }, to: { placeId: "xuyong" }, side: "kmt", kind: "move", label: "川、滇军向川南急进" },
    ],
    battles: [
      { placeId: "lubanchang", name: "鲁班场战斗", result: "draw", note: "3-15,未能攻克周浑元部" },
    ],
  },

   // ===== Phase 4: 四渡赤水 =====
﻿  {
    id: "fourth",
    index: 5,
    label: "四渡赤水",
    tagline: "出其不意,再次东渡,南渡乌江跳出包围圈",
    date: "1935-03-20",
    endDate: "1935-03-29",
    narrative: [
      "三渡之后,蒋介石 3 月 20 日飞到贵阳亲自督战。他判断红军`必入川南、必渡金沙江`,急令中央军主力吴奇伟、周浑元部西调,川军、滇军全部往川南、滇东北布下第二道封锁线——贵阳一时只剩少量守备,蒋介石的指挥所也岌岌可危。",
      "3 月 20 日夜,中央红军在古蔺以东的山地间隐蔽集结。21 日凌晨至 22 日,主力自太平渡、二郎滩秘密四渡赤水河,重返黔北。蒋介石的川南、滇东北口袋瞬间失效——红军已经从他的「包围圈」里跳了出来,出现在他判断`不可能再出现`的地方。",
      "3 月 23 日至 25 日,红军从遵义、仁怀一带南下,经湄潭、余庆、瓮安,逼近乌江。3 月 28 日至 29 日,红军在江界河、梯子岩等处南渡乌江,跳出蒋介石在黔北设置的整道包围圈。3 月 30 日,中央红军主力全部抵达乌江南岸。",
      "3 月 31 日,蒋介石在贵阳发现红军`主力已到贵阳以南`,这才意识到上了大当。但已经晚了:红军已经在乌江以南,下一站直奔金沙江——这是蒋介石最不希望看到、但又无力阻止的方向。",
    ],
    insight:
      "四渡赤水是整个战局的`胜负手`。前三次渡赤水,只是让红军在包围圈里打转;第四次,毛泽东把西进的佯动做绝,等蒋介石把精锐都调到西边,突然反向。这一步不是`声东击西`的简单重复,而是在佯动方向上构建了一个足够逼真的`假目标`,让敌人在关键时间点上做出错误决策。",
    facts: [
      { k: "时间", v: "1935-03-20 至 03-29" },
      { k: "主渡口", v: "太平渡、二郎滩" },
      { k: "去向", v: "乌江以南" },
      { k: "蒋介石判断", v: "必入川南、必渡金沙江(完全相反)" },
      { k: "后续", v: "3-30 全军过乌江,3-31 蒋方才发现" },
    ],
    forces: [
      { forceId: "r-zyz", placeId: "cross-taipingdu", note: "已四渡,东返赤水河东岸" },
      { forceId: "r-1st", placeId: "banqiao", note: "红一军团经板桥南下" },
      { forceId: "r-3rd", placeId: "shatan", note: "红三军团经沙滩、遵义南" },
      { forceId: "r-5th", placeId: "yaxi", note: "红五军团掩护主力" },
      { forceId: "r-9th", placeId: "meitan", note: "红九军团在湄潭完成牵制任务,南渡乌江归队" },

      { forceId: "k-panwenhua", placeId: "xuyong", note: "川军仍在叙永,扑空" },
      { forceId: "k-fanshaozeng", placeId: "gulin", note: "川军范绍增被甩在古蔺西" },
      { forceId: "k-sundu", placeId: "xuyong", note: "滇军孙渡仍在川南" },
      { forceId: "k-zhouhunyuan", placeId: "lubanchang", note: "周浑元仍据鲁班场,未察觉" },
      { forceId: "k-wuqiwei", placeId: "guiyang", note: "吴奇伟主力西调,贵阳空虚" },
      { forceId: "k-ouzhen", placeId: "guiyang", x: 770, y: 575 },
    ],
    routes: [
      { from: { placeId: "gulin" }, to: { placeId: "cross-taipingdu" }, side: "red", kind: "move", label: "秘密东渡" },
      { from: { placeId: "cross-taipingdu" }, to: { placeId: "shatan" }, side: "red", kind: "move" },
      { from: { placeId: "shatan" }, to: { placeId: "banqiao" }, side: "red", kind: "move" },
      { from: { placeId: "banqiao" }, to: { placeId: "jiangjiehe" }, side: "red", kind: "move", label: "急行军,准备南渡乌江" },
      { from: { placeId: "jiangjiehe" }, to: { placeId: "xifeng" }, side: "red", kind: "move" },
      { from: { placeId: "gulin" }, to: { placeId: "xuyong" }, side: "kmt", kind: "move", label: "川、滇军西调,扑空" },
    ],
    battles: [
      { placeId: "cross-taipingdu", name: "四渡赤水", result: "win", note: "3-21/22,秘密东返" },
      { placeId: "jiangjiehe", name: "南渡乌江", result: "win", note: "3-28/29,江界河、梯子岩等处突破" },
    ],
  },

﻿  {
    id: "aftermath",
    index: 6,
    label: "南渡乌江·强渡大渡河·飞夺泸定桥",
    tagline: "跳出包围圈后,金沙江、大渡河、泸定桥一路向北",
    date: "1935-03-30",
    endDate: "1935-05-29",
    narrative: [
      "3 月 30 日,中央红军主力全部抵达乌江南岸,蒋介石的整道黔北包围圈失效。毛泽东随即部署:以一部兵力佯攻贵阳东面,主力则向西南急进——目标不是贵州,而是云南的金沙江。",
      "4 月 2 日,红军从贵阳东面穿过湘黔公路,直逼贵阳城。蒋介石 4 月 8 日已能听到贵阳城外的红军枪声,急调驻滇的滇军孙渡部驰援——这一调,正好把云南的防御掏空,金沙江防线门户大开。",
      "4 月中下旬,红军主力分两路进入云南:一路经兴义、罗平入滇东,一路经安顺、紫云、贞丰、兴仁直插曲靖、沾益。两路在昆明外围会师,做出要攻昆明的姿态。4 月 27 日,红军逼近昆明城下,实际上却突然折向西北。",
      "5 月 3 日至 9 日,红军主力在禄劝皎平渡巧渡金沙江——干部团偷渡成功后架浮桥,主力五天五夜全部过江。同时间,红一军团在洪门渡、红三军团在龙街渡分别佯渡,吸引了金沙江沿岸的敌军。蒋介石苦心经营的金沙江防线,被一条无声的浮桥穿透。",
      "5 月 9 日,红一军团攻占会理。5 月 12 日,中央在会理召开会议,批评林彪等的`拖垮红军`论调,重申毛泽东的机动方针。会理会议后,红军经西昌、礼州,5 月 20 日前后进入冕宁境内。",
      "5 月 24 日,红一军团第一团抵达安顺场(大渡河北岸渡口)。这里原本是太平天国石达开北渡未成、最终全军覆没之地。蒋介石当时断言:`红军必步石达开覆辙`。5 月 25 日,红一团 17 勇士强渡大渡河成功,夺取了北岸渡口,但只找到 3 条小船,无法让全军渡河。",
      "5 月 26 日,军委决定:主力沿大渡河两岸北上,夺取泸定桥。红一军团第二师四团(团长王开湘、政委杨成武)受命从安顺场急行军 320 里奔袭泸定桥,一昼夜走完。5 月 29 日清晨,四团在泸定桥西桥头与守军川军刘文辉部接战,22 位突击队员攀着悬空铁链冲过对岸,夺取泸定桥。",
      "5 月 30 日起,中央红军主力陆续通过泸定桥,经化林坪、飞越岭,翻越海拔 4114 米的夹金山。这是中央红军长征中翻越的第一座大雪山。6 月初,红军主力到达懋功(今小金)地区,与红四方面军会师——四渡赤水、巧渡金沙江、抢渡大渡河、飞夺泸定桥,至此全部完成。",
    ],
    insight:
      "四渡赤水的`出奇`并不是终点。真正的考验是:跳出包围圈后,如何穿过云南、抢渡金沙江、抢渡大渡河、抢下泸定桥,一路不被重新合围。`奇`只能赢得时间,只有`快`才能把时间变成空间。毛泽东的机动和红军的执行力,让五万余里的长征在最危险的两个月里,保持了连续向南再向北的大纵深穿插。",
    facts: [
      { k: "时间", v: "1935-03-30 至 05-29" },
      { k: "关键节点", v: "贵阳城下 4-8、皎平渡 5-3、安顺场 5-25、泸定桥 5-29" },
      { k: "战术重点", v: "巧渡金沙江、强渡大渡河、飞夺泸定桥" },
      { k: "会师", v: "1935 年 6 月,与红四方面军于懋功会师" },
    ],
    forces: [
      { forceId: "r-zyz", placeId: "jiaopingdu", note: "中央纵队在皎平渡附近" },
      { forceId: "r-1st", placeId: "anshunchang", note: "红一军团主力转战大渡河、泸定桥" },
      { forceId: "r-3rd", placeId: "longjie", note: "红三军团在龙街渡佯渡后南转" },
      { forceId: "r-5th", placeId: "huili", note: "红五军团在会理附近" },
      { forceId: "r-9th", placeId: "huili", x: 410, y: 405, note: "红九军团随主力,5-10 抵会理南" },

      { forceId: "k-xueyue-main", placeId: "kunming", x: 432, y: 530, note: "薛岳部追兵,被甩在身后" },
      { forceId: "k-sundu", placeId: "kunming", x: 450, y: 520, note: "滇军孙渡被调往贵阳,云南空虚" },
      { forceId: "k-yangsen", placeId: "yaan", x: 320, y: 130, note: "川军杨森扼守大渡河北岸" },
      { forceId: "k-liuwenhui", placeId: "luding", x: 215, y: 140, note: "川军刘文辉据泸定桥" },
    ],
    routes: [
      { from: { placeId: "xifeng" }, to: { placeId: "zazuo" }, side: "red", kind: "move", label: "佯攻贵阳" },
      { from: { placeId: "zazuo" }, to: { placeId: "qingzhen" }, side: "red", kind: "move", label: "主力向西南急进" },
      { from: { placeId: "qingzhen" }, to: { placeId: "zhenfeng" }, side: "red", kind: "move" },
      { from: { placeId: "zhenfeng" }, to: { placeId: "xingyi" }, side: "red", kind: "move" },
      { from: { placeId: "xingyi" }, to: { placeId: "qujing" }, side: "red", kind: "move" },
      { from: { placeId: "qujing" }, to: { placeId: "kunming" }, side: "red", kind: "move", label: "佯攻昆明,实则向西北" },
      { from: { placeId: "kunming" }, to: { placeId: "luquan" }, side: "red", kind: "move" },
      { from: { placeId: "luquan" }, to: { placeId: "jiaopingdu" }, side: "red", kind: "move", label: "巧渡金沙江" },
      { from: { placeId: "jiaopingdu" }, to: { placeId: "huili" }, side: "red", kind: "move" },
      { from: { placeId: "huili" }, to: { placeId: "lizhou" }, side: "red", kind: "move" },
      { from: { placeId: "lizhou" }, to: { placeId: "mianning" }, side: "red", kind: "move" },
      { from: { placeId: "mianning" }, to: { placeId: "anshunchang" }, side: "red", kind: "move", label: "强渡大渡河" },
      { from: { placeId: "anshunchang" }, to: { placeId: "luding" }, side: "red", kind: "move", label: "飞夺泸定桥" },
      { from: { placeId: "luding" }, to: { placeId: "baoxing" }, side: "red", kind: "move" },
      { from: { placeId: "baoxing" }, to: { placeId: "jiajin" }, side: "red", kind: "move", label: "翻夹金山" },
      { from: { placeId: "guiyang" }, to: { placeId: "kunming" }, side: "kmt", kind: "move", label: "滇军东调,云南空虚" },
    ],
    battles: [
      { placeId: "jiaopingdu", name: "巧渡金沙江", result: "win", note: "5-3/9,干部团偷渡、主力架浮桥" },
      { placeId: "anshunchang", name: "强渡大渡河", result: "win", note: "5-25,红一团 17 勇士" },
      { placeId: "luding", name: "飞夺泸定桥", result: "win", note: "5-29,红四团 22 勇士攀铁链夺桥" },
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
  // 早于首次出现 → 部队此时尚未登场,不显示
  if (dt < dateNum(occurrences[0].phase.date)) {
    return null;
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