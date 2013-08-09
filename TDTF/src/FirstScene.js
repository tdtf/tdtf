/**
 * Created with JetBrains WebStorm.
 * User: Gogo King
 * Date: 13-1-24
 * Time: 下午12:53
 * To change this template use File | Settings | File Templates.
 */

//定义（新建）一个图层：Helloworld
var FirstView = cc.Layer.extend({
    sprite:null,
    helloLabel:null,
    eventsPic: null,
    levelpicmenu:null,
    init:function () {
        //////////////////////////////
        // 1. 调用父类的同名方法，初始化父类
        this._super();


        // 获得画布的大小，其实可以理解为获得游戏的边界大小
        var size = cc.Director.getInstance().getWinSize();
        //加载资源
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_uiSheet_common_plist, s_uiSheet_common_png);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_uiSheet_chs_plist, s_uiSheet_chs_png);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_GUI_plist, s_GUI);


        var label1 = cc.LabelTTF.create("关卡1：东门", "Arial", 20 * sizeRatio);
        var menuItemLabel1 = cc.MenuItemLabel.create(label1, function () {
            this.onNewGame(1);
            this.onButtonEffect();
        }.bind(this));
        menuItemLabel1.setScale(1.8);


        var label2 = cc.LabelTTF.create("关卡2：25教学楼", "Arial", 20 * sizeRatio);
        var menuItemLabel2 = cc.MenuItemLabel.create(label2, function () {
            this.onNewGame(2);
            this.onButtonEffect();
        }.bind(this));
        menuItemLabel2.setScale(1.6);


        var label3 = cc.LabelTTF.create("关卡3：26楼", "Arial", 20 * sizeRatio);
        var menuItemLabel3 = cc.MenuItemLabel.create(label3, function () {
            this.onNewGame(3);
            this.onButtonEffect();
        }.bind(this));
        menuItemLabel3.setScale(1.4);

        var label4 = cc.LabelTTF.create("关卡4：鹏翔公寓", "Arial", 20 * sizeRatio);
        var menuItemLabel4 = cc.MenuItemLabel.create(label4, function () {
            this.onNewGame(4);
            this.onButtonEffect();
        }.bind(this));
        menuItemLabel4.setScale(1.2);

        var label5 = cc.LabelTTF.create("关卡5：大活", "Arial", 20 * sizeRatio);
        var menuItemLabel5 = cc.MenuItemLabel.create(label5, function () {
            this.onNewGame(5);
            this.onButtonEffect();
        }.bind(this));
        menuItemLabel5.setScale(1.0);

        var label6 = cc.LabelTTF.create("关卡6：9楼", "Arial", 20 * sizeRatio);
        var menuItemLabel6 = cc.MenuItemLabel.create(label6, function () {
            this.onNewGame(6);
            this.onButtonEffect();
    }.bind(this));
        menuItemLabel6.setScale(0.8);

        var menu1 = cc.Menu.create(menuItemLabel1, menuItemLabel2, menuItemLabel3, menuItemLabel4, menuItemLabel5, menuItemLabel6);
        menu1.setPosition(cc.p(size.width / 2, size.height / 2));
        menu1.alignItemsVerticallyWithPadding(10 * sizeRatio);

        // 添加动态可点入关卡图
        var gamelevelmenu = [];
        gamelevelmenu[0] = cc.MenuItemImage.create(s_Level1Menu, null, function(){
            this.onNewGame(1);
            this.onButtonEffect();
        }, this);
        gamelevelmenu[0].setPosition(cc.p(154 * sizeRatio, 380 * sizeRatio));

        gamelevelmenu[1] = cc.MenuItemImage.create(s_Level2Menu, null, function(){
            this.onNewGame(2);
            this.onButtonEffect();
        }, this);
        gamelevelmenu[1].setPosition(cc.p(241 * sizeRatio, 642 * sizeRatio));

        gamelevelmenu[2] = cc.MenuItemImage.create(s_Level3Menu, null, function(){
            this.onNewGame(3);
            this.onButtonEffect();
        }, this);
        gamelevelmenu[2].setPosition(cc.p(507 * sizeRatio, 581 * sizeRatio));

        gamelevelmenu[3] = cc.MenuItemImage.create(s_Level4Menu, null, function(){
            this.onNewGame(4);
            this.onButtonEffect();
        }, this);
        gamelevelmenu[3].setPosition(cc.p(778 * sizeRatio, 600 * sizeRatio));

        gamelevelmenu[4] = cc.MenuItemImage.create(s_Level5Menu, null, function(){
            this.onNewGame(5);
            this.onButtonEffect();
        }, this);
        gamelevelmenu[4].setPosition(cc.p(731 * sizeRatio, 176 * sizeRatio));

        gamelevelmenu[5] = cc.MenuItemImage.create(s_Level6Menu, null, function(){
            this.onNewGame(6);
            this.onButtonEffect();
        }, this);
        gamelevelmenu[5].setPosition(cc.p(360 * sizeRatio, 195 * sizeRatio));

//        cc.log("TD.MAXLEVEL" + TD.MAXLEVEL);
        for(var i = 1; i <= TD.MAXLEVEL; i++){
            var fade_4ever = cc.RepeatForever.create(cc.Sequence.create(cc.FadeOut.create(1), cc.FadeIn.create(1)));
            gamelevelmenu[i - 1].runAction(fade_4ever);
        }
        this.levelpicmenu = cc.Menu.create(gamelevelmenu[0],gamelevelmenu[1],gamelevelmenu[2],
            gamelevelmenu[3],gamelevelmenu[4],gamelevelmenu[5]);
        this.levelpicmenu.setPosition(cc.p(0, 0));
        this.addChild(this.levelpicmenu);

        var arrowlevel = cc.Sprite.createWithSpriteFrameName("levelArrow.png");
        var arrpos = gamelevelmenu[TD.MAXLEVEL - 1].getPosition();
        arrowlevel.setPosition(cc.p(arrpos.x, arrpos.y + gamelevelmenu[TD.MAXLEVEL - 1].getContentSize().height / 2));
        var jump = cc.JumpBy.create(0.5, cc.p(0, 0), 60, 1);
        var jump_4ever = cc.RepeatForever.create(jump);
        arrowlevel.runAction(jump_4ever);

        for (var i = TD.MAXLEVEL; i < 6; i++) {
            var lockSprite = cc.Sprite.createWithSpriteFrameName("lock.png");
            lockSprite.setPosition(cc.p(gamelevelmenu[i].getPosition().x, gamelevelmenu[i].getPosition().y ))
            this.addChild(lockSprite);
            gamelevelmenu[i].setEnabled(false);
            lockSprite.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.Blink.create(1, 1), cc.Blink.create(1, 1).reverse())));
        }

        // 添加一张图片
        this.sprite = cc.Sprite.create(s_BigMap);
        this.sprite.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(this.sprite, -1);
        this.addChild(menu1);
        this.addChild(arrowlevel);

        var returnLable = cc.LabelTTF.create("返回主界面", "Arial", 20 * sizeRatio);
        var menuItem = cc.MenuItemLabel.create(returnLable, this.returnMainMenu, this);
        var menu1 = cc.Menu.create(menuItem);
        menu1.setPosition( cc.p(size.width - returnLable.getContentSize().width, returnLable.getContentSize().height));
        this.addChild(menu1);

        return true;
    },


    /**
     *  显示每章开始事件图片 or动画, 一张横向大图，用moveBy实现变换
     * @param level
     */
    showEvents:function( level ){
        this.levelpicmenu.setEnabled(false);
        var size = cc.Director.getInstance().getWinSize();

        switch (0) {
            case 0:
                this.eventsPic = cc.Sprite.create(s_Event1add_png);
                break;
//             之后有了大部分事件图片再行添加
           case 1:
               this.eventsPic= cc.Sprite.create(s_Event1add_png);
                break;
            case 2:
                this.eventsPic = cc.Sprite.create(s_Event1add_png);
                break;
            case 3:
                this.eventsPic = cc.Sprite.create(s_Event1add_png);
                break;
            case 4:
                this.eventsPic = cc.Sprite.create(s_Event1add_png);
                break;
            case 5:
                this.eventsPic = cc.Sprite.create(s_Event1add_png);
                break;
        }
        this.eventsPic.setAnchorPoint(cc.p(0, 0));
        this.eventsPic.setPosition(cc.p(0, 0));

        // 根据每个章节的事件图片多少，来添加moveBy动作
        var loadIn = cc.FadeIn.create(1);
        var moveToNext = cc.MoveBy.create(0.5, cc.p(-960 * sizeRatio, 0));
        var showTime = cc.DelayTime.create(3);
        var fullAct = [loadIn];
        for(var i = 0; i < TD.Levels.Level1.eventsNum - 1; i++){
            fullAct.push(showTime);
            fullAct.push(moveToNext);
        }
        var finalAct = cc.Sequence.create(fullAct);
        finalAct.setTag(1);
        this.eventsPic.runAction(finalAct);
        this.addChild(this.eventsPic);

        var scene = cc.Scene.create();
        // 需要调用level控制器，来控制具体的level对应的地图和精灵
        var layer = new SecondView(TD.MapType[level]);

        var startG = cc.Sprite.createWithSpriteFrameName("StartScene_Start Game_chs.png");
        var startBg1 = cc.Sprite.createWithSpriteFrameName("ban01_1.png");
        var startBg2 = cc.Sprite.createWithSpriteFrameName("ban01_2.png");

        var startMenuItem = cc.MenuItemSprite.create(startBg1, startBg2, function(){
            this.loadNewGame(scene, layer, level);
        },this);

        var menu = cc.Menu.create(startMenuItem);
        menu.setPosition(cc.p(size.width / 2, startBg1.getContentSize().height / 2));
        this.addChild(menu);
        startG.setPosition(cc.p(size.width / 2, startBg1.getContentSize().height / 2));
        this.addChild(startG);
    },

    /**
     *  根据scene，layer，level 跳过动画，载入游戏
     * @param scene
     * @param layer
     * @param level
     */
    loadNewGame: function(scene, layer, level){
        var actMan = cc.Director.getInstance().getActionManager();
        actMan.pauseTarget(this.eventsPic[0]);

        layer.init();
        scene.addChild(layer);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
//        cc.log("level:" + level);
    },

    onNewGame:function (arg) {
        this.showEvents(arg - 1);
    },
    onButtonEffect:function () {
        //cc.AudioEngine.getInstance().playEffect(s_buttonEffect, true);
    },

    returnMainMenu: function(){
//        cc.log("loadinGame");
        var scene = cc.Scene.create();
        var layer = new MainMenu();
        layer.init();
        scene.addChild(layer);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

//定义(新建)一个场景，里面有一个图层
var FirstViewScene = cc.Scene.extend({
    //进入场景时
    onEnter:function () {
        this._super();
        var layer = new FirstView();
        layer.init();
        this.addChild(layer);
    }
});

