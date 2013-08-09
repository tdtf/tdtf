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

        var bgPic = cc.Sprite.create(s_StartScene_bg);
        bgPic.setAnchorPoint(cc.PointZero());
        bgPic.setPosition(cc.PointZero());
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
        menu.setAnchorPoint(cc.p(0.5, 0.5));
        menu.setPosition(cc.p(750 * sizeRatio, 500 * sizeRatio));
        var startGameItem = cc.MenuItemSprite.create(startBg1_1, startBg1_2, this.loadinGame, this);
        startFont.setPosition( cc.p(menu.getPosition().x, menu.getPosition().y + startBg1_1.getContentSize().height + 10 * sizeRatio));
        this.addChild(startFont, 2);
        menu.addChild(startGameItem, 1);

        var continueGameItem = cc.MenuItemSprite.create(startBg2_1, startBg2_2, this.continueGame, this);
        continueFont.setPosition(cc.p(menu.getPosition().x, menu.getPosition().y));
        this.addChild(continueFont, 2);
        menu.addChild(continueGameItem, 1);

        var helpGameItem = cc.MenuItemSprite.create(startBg3_1, startBg3_2, this.helpGame, this);
        helpFont.setPosition(cc.p(menu.getPosition().x, menu.getPosition().y - startBg1_1.getContentSize().height - 10 * sizeRatio));
        this.addChild(helpFont, 2);
        menu.addChild(helpGameItem, 1);

        menu.alignItemsVerticallyWithPadding(10 * sizeRatio);
        this.addChild(menu, 1);

        this.enableEvents(true);
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
    },

  enableEvents:function (enabled) {
  //        cc.log("platform 1st scene:" + cc.config.platform);
      var t = sys.platform;
      if ( t == "browse") {
          this.setMouseEnabled(enabled);
          this.setTouchEnabled(enabled);
      }else if(t == "mobile") {
          this.setTouchEnabled(enabled);
          this.setMouseEnabled(!enabled);
      } else if (t == "desktop") {
          this.setMouseEnabled(enabled);
      }
  }
});

var MainMenuScene = cc.Scene.extend({

    ctor: function(){
      this._super();
      director = cc.Director.getInstance();
      winSize = director.getWinSize();
      sizeRatio = winSize.width / 960;
      EGLView = cc.EGLView.getInstance();
      var layer = new MainMenu();
      layer.init();
      this.addChild(layer);
    }
});