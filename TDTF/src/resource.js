//加载资源，都放在这里

var dirImg = "res/assets/";
var dirMusic = "res/assets/Music/";

//maps
var s_BigMap = dirImg + "MainMap.png";
var s_SmallMapPng = dirImg + "Map/Stage02_map_editor-hd.png";
var s_SmallMap2png = dirImg + "Map/Stage07_map_editor-hd.png";
var s_SmallMap3png = dirImg + "Map/Stage04_map_editor-hd.png";
var s_SmallMap4png = dirImg + "Map/Stage08_map_editor-hd.png";
var s_SmallMap5png = dirImg + "Map/Stage10_map_editor-hd.png";
var s_SmallMap6png = dirImg + "Map/Stage15_map_editor-hd.png";
var s_tiles = dirImg + "Map/mate_tiles.png";
var s_GameOver = dirImg + "UI/loading0-hd.png";
var s_GameOverChs = dirImg + "UI/game over_chs-hd.png";

var s_SmallMap = dirImg + "Map/Map1x.tmx";
var s_SmallMap2_tmx = dirImg + "Map/Map2x.tmx";
var s_SmallMap3_tmx = dirImg + "Map/Map3.tmx";
var s_SmallMap4_tmx = dirImg + "Map/Map4.tmx";
var s_SmallMap5_tmx = dirImg + "Map/Map5.tmx";
var s_SmallMap6_tmx = dirImg + "Map/Map6.tmx";

var s_Level1Menu = dirImg + "Level1.png";
var s_Level2Menu = dirImg + "Level2.png";
var s_Level3Menu = dirImg + "Level3.png";
var s_Level4Menu = dirImg + "Level4.png";
var s_Level5Menu = dirImg + "Level5.png";
var s_Level6Menu = dirImg + "Level6.png";

//monsters
var s_CaoCao = dirImg + "Actor/CaoCao-hd.png"
var s_CaoCao_plist = dirImg + "Actor/CaoCao-hd.plist"
var s_XiaHouDun = dirImg + "Actor/XiaHouDun-hd.png"
var s_XiaHouDun_plist = dirImg + "Actor/XiaHouDun-hd.plist"
var s_ZhangLiao = dirImg + "Actor/ZhangLiao-hd.png"
var s_ZhangLiao_plist = dirImg + "Actor/ZhangLiao-hd.plist"
//protectors
var s_GuanYu = dirImg + "Actor/GuanYu-hd.png"
var s_GuanYu_plist = dirImg + "Actor/GuanYu-hd.plist"
var s_ZhuGeLiang = dirImg + "Actor/ZhuGeLiang-hd.png"
var s_ZhuGeLiang_plist = dirImg + "Actor/ZhuGeLiang-hd.plist"
var s_HuangZhongAttack = dirImg + "Actor/HuangZhongAttack-hd.png"
var s_HuangZhongAttack_plist = dirImg + "Actor/HuangZhongAttack-hd.plist"
var s_ChangQiangbinAttack = dirImg + "Actor/ChangQiangBing-hd.png"
var s_ChangQiangbinAttack_plist = dirImg + "Actor/ChangQiangBing-hd.plist"
var s_GuanpingAttack = dirImg + "Actor/GuanPing-hd.png";
var s_GuanpingAttack_plist = dirImg + "Actor/GuanPing-hd.plist";

//music
var s_bgMusic = dirMusic + "battle_bgm_01.mp3"

//others
var s_uiSheet_common_png = dirImg + "UI2/uiSheet_common-hd.png";
var s_uiSheet_common_plist = dirImg + "UI2/uiSheet_common-hd.plist";
var s_uiSheet_chs_png = dirImg + "UI2/uiSheet_chs-hd.png";
var s_uiSheet_chs_plist = dirImg + "UI2/uiSheet_chs-hd.plist";

//font
var s_arial14 = dirImg + "Fonts/arial-14.png";
var s_arial14_fnt = dirImg + "Fonts/arial-14.fnt";

var s_menu = dirImg + "menu.png";
var s_Range1 = dirImg + "AttackRanges/range1.png";
var s_Range2 = dirImg + "AttackRanges/range2.png";
var s_SmallZhugeliang = dirImg + "Actor/Icon/small_icon_ZhuGeLiang-hd.png";
var s_SmallGuanYu = dirImg + "Actor/Icon/small_icon_GuanYu-hd.png";
var s_SmallHuangzhong = dirImg + "Actor/Icon/small_icon_HuangZhong-hd.png";
var s_SmallGuangping = dirImg + "Actor/Icon/small_icon_GuanPing-hd.png";
var s_SmallQiang = dirImg + "Actor/Icon/small_icon_Qiang-hd.png";

var s_GUI = dirImg + "UI2/GUI_common-hd.png";
var s_GUI_plist = dirImg + "UI2/GUI_common-hd.plist";


//bombs
var s_HuangzhongJian = dirImg + "Skill/jianyu.png";

var s_buttonEffect = "res/Music/buttonEffet.mp3";

// Events
var s_Event1_png = dirImg + "EventsPic/1.png";
var s_Event2_png = dirImg + "EventsPic/2.png";
var s_Event3_png = dirImg + "EventsPic/3.png";
var s_Event1add_png = dirImg + "EventsPic/1add.png";
var s_StartScene_bg = dirImg + "UI/StartScene_bg-hd.png";
var s_Help_01 = dirImg + "Help/Help_01_chs-hd.png";
var s_Help_02 = dirImg + "Help/Help_02_chs-hd.png";
var s_Help_03 = dirImg + "Help/Help_03_chs-hd.png";


var g_resources = [
    //image
    {type:"image", src:s_BigMap},
    {type:"image", src:s_menu},
    {type:"image", src:s_Range1 },
    {type:"image", src:s_Range2 },
    {type:"image", src:s_arial14},
    {type:"image", src:s_Level1Menu},
    {type:"image", src:s_Level2Menu},
    {type:"image", src:s_Level3Menu},
    {type:"image", src:s_Level4Menu},
    {type:"image", src:s_Level5Menu},
    {type:"image", src:s_Level6Menu},
    {type:"image", src:s_uiSheet_common_png},
    {type:"image", src:s_uiSheet_chs_png},
    {type:"image", src:s_tiles},
    {type:"image", src:s_SmallMapPng},
    {type:"image", src:s_SmallMap2png},
    {type:"image", src:s_SmallMap3png},
    {type:"image", src:s_SmallMap4png},
    {type:"image", src:s_SmallMap5png},
    {type:"image", src:s_SmallMap6png},

    //protector
    {type:"image", src:s_HuangZhongAttack},
    {type:"image", src:s_ChangQiangbinAttack},
    {type:"image", src:s_GuanYu},
    {type:"image", src:s_ZhuGeLiang},
    {type:"image", src:s_GuanpingAttack},

    //icon
    {type:"image", src:s_SmallZhugeliang},
    {type:"image", src:s_SmallHuangzhong},
    {type:"image", src:s_SmallGuanYu},
    {type:"image", src:s_SmallQiang},
    {type:"image", src:s_SmallGuangping},

    //monster
    {type:"image", src:s_CaoCao},
    {type:"image", src:s_XiaHouDun},
    {type:"image", src:s_ZhangLiao},

    //兵器
    {type:"image", src:s_HuangzhongJian},

    {type:"image", src:s_GUI},
    {type:"image", src:s_GameOver},
    {type:"image", src:s_GameOverChs},

    //plist
    //protector
    {type:"plist", src:s_HuangZhongAttack_plist},
    {type:"plist", src:s_GuanYu_plist},
    {type:"plist", src:s_ZhuGeLiang_plist},
    {type:"plist", src:s_ChangQiangbinAttack_plist},
    {type:"plist", src:s_GuanpingAttack_plist},
    //monster
    {type:"plist", src:s_CaoCao_plist},
    {type:"plist", src:s_XiaHouDun_plist},
    {type:"plist", src:s_ZhangLiao_plist},


    {type:"plist", src:s_uiSheet_common_plist},
    {type:"plist", src:s_uiSheet_chs_plist},
    {type:"plist", src:s_GUI_plist},

    //fnt
    {type:"fnt", src:s_arial14_fnt},
    //tmx
    {type:"tmx", src:s_SmallMap},
    {type:"tmx", src:s_SmallMap2_tmx},
    {type:"tmx", src:s_SmallMap3_tmx},
    {type:"tmx", src:s_SmallMap4_tmx},
    {type:"tmx", src:s_SmallMap5_tmx},
    {type:"tmx", src:s_SmallMap6_tmx},
    //bgm
    {type:"bgm", src:s_bgMusic},
    //effect
    {type:"effect", src:s_buttonEffect},

    // Events
    {type: "image", src: s_Event1_png},
    {type: "image", src: s_Event2_png},
    {type: "image", src: s_Event3_png},
    {type: "image", src: s_Event1add_png},

    // image
    {type: "image", src: s_StartScene_bg},
    {type: "image", src: s_Help_01},
    {type: "image", src: s_Help_02},
    {type: "image", src: s_Help_03}
];

