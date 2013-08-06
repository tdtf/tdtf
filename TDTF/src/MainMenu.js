/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-5
 * Time: 下午4:48
 * To change this template use File | Settings | File Templates.
 */

var MainMenu = cc.Layer.extend({
    init: function(){
        this._super();

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_uiSheet_common_plist, s_uiSheet_common_png);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_uiSheet_chs_plist, s_uiSheet_chs_png);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_GUI_plist, s_GUI);

        var size = cc.Director.getInstance().getWinSize();

        var bgPic = cc.Sprite.create(s_StartScene_bg);
        bgPic.setPosition(cc.p(size.width / 2, size.height / 2));
        this.addChild(bgPic, -1);

        var startFont = cc.Sprite.createWithSpriteFrameName("StartScene_Start Game_chs.png");
        var continueFont = cc.Sprite.createWithSpriteFrameName("StartScene_Continue_chs.png");
        var helpFont = cc.Sprite.createWithSpriteFrameName("StartScene_Help_chs.png");
        var startBg1_1 = cc.Sprite.createWithSpriteFrameName("ban01_1.png");
        var startBg2_1 = cc.Sprite.createWithSpriteFrameName("ban01_1.png");
        var startBg3_1 = cc.Sprite.createWithSpriteFrameName("ban01_1.png");
        var startBg1_2 = cc.Sprite.createWithSpriteFrameName("ban01_2.png");
        var startBg2_2 = cc.Sprite.createWithSpriteFrameName("ban01_2.png");
        var startBg3_2 = cc.Sprite.createWithSpriteFrameName("ban01_2.png");

        var menu = cc.Menu.create();
        menu.setPosition(cc.p(750, 500));
        var startGameItem = cc.MenuItemSprite.create(startBg1_1, startBg1_2, this.loadinGame, this);
        startFont.setPosition( cc.p(menu.getPosition().x, menu.getPosition().y + startBg1_1.getContentSize().height + 10));
        this.addChild(startFont, 2);
        menu.addChild(startGameItem, 1);

        var continueGameItem = cc.MenuItemSprite.create(startBg2_1, startBg2_2, this.continueGame, this);
        continueFont.setPosition(cc.p(menu.getPosition().x, menu.getPosition().y));
        this.addChild(continueFont, 2);
        menu.addChild(continueGameItem, 1);

        var helpGameItem = cc.MenuItemSprite.create(startBg3_1, startBg3_2, this.helpGame, this);
        helpFont.setPosition(cc.p(menu.getPosition().x, menu.getPosition().y - startBg1_1.getContentSize().height - 10));
        this.addChild(helpFont, 2);
        menu.addChild(helpGameItem, 1);

        menu.alignItemsVerticallyWithPadding(10);
        this.addChild(menu, 1);

        return true;
    },

    continueGame:function(){
//        cc.log("continueGame is called");
        this.loadinGame();
    },

    helpGame: function(){
//        cc.log("helpGame is called");
        var scene = cc.Scene.create();
        var layer = new HelpView();
        layer.init();
        scene.addChild(layer);
        cc.Director.getInstance().pushScene(cc.TransitionFade.create(1.2, scene));
    },

    /**
     * 载入游戏主界面
     */
    loadinGame: function(){
//        cc.log("loadinGame");
        var scene = cc.Scene.create();
        var layer = new FirstView();
        layer.init();
        scene.addChild(layer);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

var MainMenuScene = cc.Scene.extend({
    //进入场景时
    onEnter:function () {
        this._super();
        var layer = new MainMenu();
        layer.init();
        this.addChild(layer);
    }
});