/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-26
 * Time: 上午10:45
 * To change this template use File | Settings | File Templates.
 */

//游戏设置，包括一切的资源，一切的关卡数据什么的
//游戏状态，需要加其它的状态，比如“暂停”
TD.GAME_STATE = {
    HOME:0,
    PLAY:1,
    OVER:2,
    SUCCESS:3
};


//游戏level

TD.LEVEL = {
    STAGE1:1,
    STAGE2:2,
    STAGE3:3,
    STAGE4:4,
    STAGE5:5,
    STAGE6:6
};

//要守护的塔的生命（数值可以设置）
TD.LIFE = 30;

//分数，好像我们没什么用
TD.SCORE = 0;

//金钱，全局变量
TD.MONEY = 0;

//声音是否开启？在gamestate里面也要加
TD.SOUND = true;

//怪物移动的方向
TD.ENEMY_MOVE_TYPE = {

    MOVE:{UP:"up", DOWN:"down", LEFT:"left", RIGHT:"right" }
    //有八个方向，这里我只写四个方向

};
//保卫者攻击的动作方向
TD.PROTECTOR_ATTACK_TYPE = {
    ATTACKABNOMAL:{UPLEFT:"upleft", UPRIGHT:"upright", DOWNLEFT:"downleft", DOWNRIGHT:"downright"},
    ATTACKNOMAL:{UP:"up", DOWN:"down", LEFT:"left", RIGHT:"right"},
    ATTACKALLDIR:{UP:"up", DOWN:"down", LEFT:"left", RIGHT:"right",UPLEFT:"upleft", UPRIGHT:"upright", DOWNLEFT:"downleft", DOWNRIGHT:"downright" }
};

TD.ATTACKMODE = {
    NOMAL:"nomal",
    ABNOMAL:"abnomal",
    ALLDIR:"alldir"
};
//子弹的类型
TD.BULLET_TYPE = {
    PROTECTOR:1
//    MONSTER:2
};

//路径点，全局变量，这个地方可以参看tiled地图里面的waypoit属性
TD.WayPoints = [];

//最大的关数
TD.MAXLEVEL = 2;

//升级所需要的分数或者金钱
TD.LIFEUP_SORCE = [50000, 100000, 150000, 200000, 250000, 300000];

//地图的数组，便于记录有无塔
TD.MAPARR = [];
//容器
TD.CONTAINER = {
    ENEMIES:[],
//    ENEMY_BULLETS:[],
    PLAYER_BULLETS:[],
    PROTECTORS:[]
};
//地图的类型
TD.MapType = [
    {
        level:1,
        myMap:s_SmallMap,
        MappearPosition:cc.p(60, 60), //怪物的初始的位置
        life:TD.LIFE
    },
    {
        level:2,
        myMap:s_SmallMap2_tmx,
        MappearPosition:cc.p(336, -32), //怪物的初始的位置
        life:TD.LIFE
    },
    {
        level:3,
        myMap:s_SmallMap3_tmx,
        MappearPosition:cc.p(96, 544), //怪物的初始的位置
        life:TD.LIFE
    },
    {
        level:4,
        myMap:s_SmallMap4_tmx,
        MappearPosition:cc.p(144, -32), //怪物的初始的位置
        life:TD.LIFE
    },
    {
        level:5,
        myMap:s_SmallMap5_tmx,
        MappearPosition:cc.p(208, 768), //怪物的初始的位置
        life:TD.LIFE
    },
    {
        level:6,
        myMap:s_SmallMap6_tmx,
        MappearPosition:cc.p(48, -32), //怪物的初始的位置
        life:TD.LIFE
    }
];
//怪物的类型
TD.MonsterType = [
    {
        type:0,
        textureName:"CaoCao_run_right_1.png",
        plist:s_CaoCao_plist,
        sImage:s_CaoCao,
        HP:30,
        moveType:TD.ENEMY_MOVE_TYPE.MOVE,
        attackTD:10,
        money:1,
        speed:40
    },
    {
        type:1,
        textureName:"XiaHouDun_run_right_1.png",
        plist:s_XiaHouDun_plist,
        sImage:s_XiaHouDun,
        HP:40,
        moveType:TD.ENEMY_MOVE_TYPE.MOVE,
        attackTD:20,
        money:2,
        speed:50
    },
    {
        type:2,
        textureName:"ZhangLiao_run_right_1.png",
        plist:s_ZhangLiao_plist,
        sImage:s_ZhangLiao,
        HP:50,
        moveType:TD.ENEMY_MOVE_TYPE.MOVE,
        attackTD:30,
        money:3,
        speed:30
    }
];

//ptype
TD.ProtectorType = [
    {
        pType:0,
        textureName:"HuangZhong_attack_down_1.png",
        plist:s_HuangZhongAttack_plist,
        sImage:s_HuangZhongAttack,
        throwBombing:true,
//        weaponType:s_HuangzhongJian,
        weaponType:"arrow.png",
        weaponSpeed:600,
        attackMode:TD.ATTACKMODE.ABNOMAL,
        cost:15,
        attackRange:200,
        attackRI:s_Range1,
        displayPic:s_SmallHuangzhong,
        HPminus:1
    },
    {
        pType:1,
        textureName:"GuanYu_attack_down_1.png",
        plist:s_GuanYu_plist,
        sImage:s_GuanYu,
        throwBombing:false,
        weaponType:null,
        weaponSpeed:null,
        attackMode:TD.ATTACKMODE.ABNOMAL,
        cost:30,
        attackRange:150,
        attackRI:s_Range2,
        displayPic:s_SmallGuanYu,
        HPminus:2
    },
    {
        pType:2,
        textureName:"ZhuGeLiang_attack_down_1.png",
        plist:s_ZhuGeLiang_plist,
        sImage:s_ZhuGeLiang,
        throwBombing:false,
        weaponType:null,
        weaponSpeed:null,
        attackMode:TD.ATTACKMODE.ABNOMAL,
        cost:15,
        attackRange:500,
        attackRI:s_Range1,
        displayPic:s_SmallZhugeliang,
        HPminus:3
    },
    {
        pType:3,
        textureName:"ChangQiangBing_attack_down_1.png",
        plist: s_ChangQiangbinAttack_plist,
        sImage:s_ChangQiangbinAttack,
        attackMode:TD.ATTACKMODE.ALLDIR,
        throwBombing:false,
        weaponType:null,
        weaponSpeed:null,
        cost:40,
        attackRange:200,
        attackRI:s_Range2,
        displayPic:s_SmallQiang,
        HPminus:4
    },
    {
        pType:4,
        textureName:"GuanPing_attack_down_1.png",
        plist:s_GuanpingAttack_plist,
        sImage:s_GuanpingAttack,
        attackMode:TD.ATTACKMODE.ABNOMAL,
        throwBombing:false,
        weaponType:null,
        weaponSpeed:null,
        cost:25,
        attackRange:500,
        attackRI:s_Range1,
        displayPic:s_SmallGuangping,
        HPminus:5
    }
];
//level
TD.Levels = {
    Level1:{
        enemies:[
            {
                ShowType:"Repeate",
                ShowTime:"00:02",
                Types:[0]
            },
            {
                ShowType:"Repeate",
                ShowTime:"00:02",
                Types:[1]
            },
            {
                ShowType:"Once",
                ShowTime:"00:20",
                Types:[2]
            }
        ],
        protectorTypes:[0, 1, 2, 3, 4],
        bg:s_SmallMap,
        waves:3,
        eventsNum:3

    },
    Level2:{
        enemies:[
            {
                ShowType:"Repeate",
                ShowTime:"00:10",
                Types:[0]
            },
            {
                ShowType:"Once",
                ShowTime:"00:05",
                Types:[1]
            },
            {
                ShowType:"Once",
                ShowTime:"00:03",
                Types:[2]
            }
        ],
        protectorTypes:[0, 1, 2, 3, 4],
        bg:s_SmallMap2_tmx,
        waves:5,
        eventsNum:3
    },
    Level3:{
        enemies:[
            {
                ShowType:"Repeate",
                ShowTime:"00:10",
                Types:[0]
            },
            {
                ShowType:"Once",
                ShowTime:"00:05",
                Types:[1]
            },
            {
                ShowType:"Once",
                ShowTime:"00:03",
                Types:[2]
            }
        ],
        protectorTypes:[0, 1, 2, 3, 4],
        bg:s_SmallMap3_tmx,
        waves:6,
        eventsNum:3
    },
    Level4:{
        enemies:[
            {
                ShowType:"Repeate",
                ShowTime:"00:02",
                Types:[0]
            },
            {
                ShowType:"Repeate",
                ShowTime:"00:01",
                Types:[1]
            },
            {
                ShowType:"Repeate",
                ShowTime:"00:03",
                Types:[2]
            }
        ],
        protectorTypes:[0, 1, 2, 3, 4],
        bg:s_SmallMap4_tmx,
        waves:7,
        eventsNum:3
    },
    Level5:{
        enemies:[
            {
                ShowType:"Repeate",
                ShowTime:"00:10",
                Types:[0]
            },
            {
                ShowType:"Once",
                ShowTime:"00:05",
                Types:[1]
            },
            {
                ShowType:"Once",
                ShowTime:"00:03",
                Types:[2]
            }
        ],
        protectorTypes:[0, 1, 2, 3, 4],
        bg:s_SmallMap5_tmx,
        waves:8,
        eventsNum:3
    },
    Level6:{
        enemies:[
            {
                ShowType:"Repeate",
                ShowTime:"00:10",
                Types:[0]
            },
            {
                ShowType:"Once",
                ShowTime:"00:05",
                Types:[1]
            },
            {
                ShowType:"Once",
                ShowTime:"00:03",
                Types:[2]
            }
        ],
        protectorTypes:[0, 1, 2, 3, 4],
        bg:s_SmallMap6_tmx,
        waves:9,
        eventsNum:3
    }
};
//这里还需要加很多