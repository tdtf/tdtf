/**
 * Created with JetBrains WebStorm.
 * User: Gogo King
 * Date: 13-1-24
 * Time: 下午12:53
 * To change this template use File | Settings | File Templates.
 */
//地图压缩编码需要编程gzip
//主场景层，也就是游戏层
STATE_PLAYING = 0;
STATE_GAMEOVER = 1;
STATE_SUCCESS = 2;

PROTECTLAYERID = 50000;
UPGRADE_SPRITE = 50001;

var SecondView = cc.Layer.extend({
    _drawRange:null,
    _level:null,
    _time:0,
    _life:null,
    _backTileMap:null,
    _monsterpos:null,
    _monster:null,
    _state:null,
    _objgroup:null,
    sprite:null,
    _lbLife:null,
    _meta:null,
    sprite2:null,
    _MappearPosition:null,
    _bgpic:null,
    _proIndex:null,
    _checklastcell:false,
    _id:123456789,
    mapsize:null,
//    tableView:null,
    screenRect:null,

    preMoney:null, // 为了gameover时，回滚数据
    preLife:null,
//    _isTableTouchBegin:false,
    _selectProtector:null,
    _upgrade:null,
    _noUpgrade:null,
    _sellSprite:null,
    _maxUpgrade:null,


    _upgradeMoneyL:null,
    _sellMoneyL:null,
    _sellRatio:0.6, // 卖出protector营收比率

    //构造函数，初始化一些东西
    ctor:function (mapType) {
        //显示maptype的信息
        cc.log("level:" + mapType.level);
        cc.log("mapType:" + mapType.myMap);
        this._level = mapType.level;
        this._MappearPosition = mapType.MappearPosition;
        this._life = mapType.life;
        this._backTileMap = cc.TMXTiledMap.create(mapType.myMap);
        this._backTileMap.setPosition(cc.p(0, 0));
        this._objgroup = this._backTileMap.getObjectGroup("waypoint");
//        this._objgroup.setVisible(false);
        this._bgpic = this._backTileMap.getLayer("bg");
        this._meta = this._backTileMap.getLayer("Meta");
        this._meta.setVisible(false);
        this._monsterpos = this._objgroup.objectNamed("waypoint1");

        this.preMoney = TD.MONEY;
        this.preLife = TD.LIFE;
        cc.associateWithNative(this, cc.Layer);
    },
    //初始化
    init:function () {

        if (this._super()) {
            // 重置全局变量
            TD.WayPoints = this._objgroup.getObjects();
            TD.CONTAINER.ENEMIES = [];
            TD.CONTAINER.ENEMY_BULLETS = [];
            TD.CONTAINER.PLAYER_BULLETS = [];
            TD.CONTAINER.PROTECTORS = [];
            TD.MAPARR = [];
            TD.MONEY = 150;
            this._state = STATE_PLAYING;
            this.screenRect = cc.rect(0, 0, winSize.width, winSize.height + 10 * sizeRatio);
            this._levelManager = new LevelManager(this._level, this);
            this._levelManager.addMapToGameLayer(this._backTileMap);
            this.mapsize = this._backTileMap.getMapSize();

            // 初始化金钱
            var moneySprite = cc.Sprite.createWithSpriteFrameName("gold.png");
            moneySprite.setPosition(winSize.width / 4, winSize.height-32 * sizeRatio);
            this._lbMoney = cc.LabelBMFont.create(TD.MONEY, s_arial14_fnt);
            this._lbMoney.setAnchorPoint(cc.p(1, 0));
            this._lbMoney.setAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            this._lbMoney.setScale(1.8,1.8);
            this._lbMoney.setPosition(cc.p(winSize.width / 4 + this._lbMoney.getString().length * 10,
                winSize.height - 32 * sizeRatio - 10 * sizeRatio));
            this.addChild(moneySprite);
            this.addChild(this._lbMoney);

           // life
            var lifeSprite = cc.Sprite.createWithSpriteFrameName("life.png");
            lifeSprite.setPosition(winSize.width / 4 * 3, winSize.height-32);
            this._lbLife = cc.LabelBMFont.create(TD.LIFE, s_arial14_fnt);
            this._lbLife.setScale(1.8,1.8);
            this._lbLife.setAnchorPoint(cc.p(1, 0));
            this._lbLife.setAlignment(cc.TEXT_ALIGNMENT_RIGHT);
            this._lbLife.setPosition(cc.p(lifeSprite.getPosition().x + 70 * sizeRatio, lifeSprite.getPosition().y - 10 * sizeRatio));
            this.addChild(lifeSprite);
            this.addChild(this._lbLife);

            //初始化平台，还可以换成其它，但是主要是浏览器
            var t = sys.platform;
            cc.log("Platform 2nd: " + t);
            if (t == 'browser') {
                this.setTouchEnabled(true);
//                this.setMouseEnabled(true);
                this.setKeyboardEnabled(true);
            } else if (t == 'desktop') {
                this.setMouseEnabled(true);
            } else if (t == 'mobile') {
                this.setTouchEnabled(true);
            }
            // 时间调用
            this.scheduleUpdate();
            this.schedule(this.timeCounter, 1);
            this.schedule(this.MMove, 0.5);
            // this.schedule(this.PFindTarget, 0.4);
            this.schedule(this.checkIsCollide, 0.3);
            this.schedule(this.updateUI, 0.1);
            //测试用例（可以删除）
//           this.scoreCounter();
            //背景音乐，可以替换
            if (TD.SOUND) {
                cc.AudioEngine.getInstance().playMusic(s_bgMusic, false);
            }

            //初始化地图数组为了记录是否有塔存在
//            cc.log("Mapsize Width:" + this.mapsize.width + "  MapSize height:" + this.mapsize.height);
            for (var i = 0; i < this.mapsize.width; i++) {
                TD.MAPARR[i] = [];
                for (var j = 0; j < this.mapsize.height; j++) {

                    var tileGid = this._meta.getTileGIDAt(cc.p(i, j));
                    if (tileGid != 0) {
                        TD.MAPARR[i][j] = 1;
                    } else {
                        TD.MAPARR[i][j] = 0;
                    }
//                    cc.log("i:" + i + "  j:" + j + "  TD.MAPARR[i][j]:" + TD.MAPARR[i][j]);
                }
            }
            this.setTouchPriority(0);

            // 初始化一些资源
            this._upgrade = cc.Sprite.createWithSpriteFrameName("upgrade.png");
            this._sellSprite = cc.Sprite.createWithSpriteFrameName("sold.png");
            this._noUpgrade = cc.Sprite.createWithSpriteFrameName("noUpgrade.png");
            this._maxUpgrade = cc.Sprite.createWithSpriteFrameName("upgradeMAX.png");

            this._upgradeMoneyL = cc.LabelTTF.create("0", "Arial", 25 * sizeRatio);
            this._upgradeMoneyL.setColor("#FFFFFF");
            this._sellMoneyL = cc.LabelTTF.create("0", "Arial", 25 * sizeRatio);
            this._sellMoneyL.setColor("#FFFFFF");
        }
    },

//时间计数器，每个一段时间加载一个怪物
    timeCounter:function () {
        if (this._state == STATE_PLAYING) {
            this._time++;
//            var minute = 0 | (this._time / 60);
//            var second = this._time % 60;
//            minute = minute > 9 ? minute : "0" + minute;
//            second = second > 9 ? second : "0" + second;
//            var curTime = minute + ":" + second;
//            cc.log("时间："+curTime);
            cc.log(this._time);
            this._levelManager.loadLevelResource(this._time);
        }
    },

    // update ui
    updateUI:function () {
        this.EOG();
        this.updateMoney();
        this.updateMonsterCover();
    },
//怪物的移动检测，也是每隔一段时间
    MMove:function () {
        //遍历整个怪物数组
        for (var i = 0; i < TD.CONTAINER.ENEMIES.length; i++) {
            //获取当前怪物所在的wp
            var currentWP = TD.CONTAINER.ENEMIES[i].currentWP;
            //如果此时上一个动作完成
            if (TD.CONTAINER.ENEMIES[i]._action[currentWP].isDone()) {
                TD.CONTAINER.ENEMIES[i]._action[currentWP].stop();
                //如果nextwp还在wp数组中，那么就改变怪物方向
                if (currentWP + 1 < TD.WayPoints.length) {
                    TD.CONTAINER.ENEMIES[i].changedir(TD.WayPoints[currentWP + 1]);
                } else {
                    TD.CONTAINER.ENEMIES[i]._reachDest = true;
                    TD.CONTAINER.ENEMIES[i].Mdestroy();
                }
            }
        }
    },

    //调用保卫者函数来查找可攻击的怪物
    PFindTarget:function () {
        for (var i = 0; i < TD.CONTAINER.PROTECTORS.length; i++) {
            TD.CONTAINER.PROTECTORS[i].findTaget();
        }
    },

    // monster行走中更新显示优先级
    updateMonsterCover:function(){
        var num = TD.CONTAINER.ENEMIES.length;
        for( var i = 0; i < num; i++ ){
            var enemy = TD.CONTAINER.ENEMIES[i];
            this.reorderChild(enemy, winSize.height - enemy.getPosition().y);
        }
    },
    EOG:function () {
        if (TD.LIFE <= 0) {
            /* 缺少重置生命以及其他数据*/
//            cc.log("游戏结束！大侠重新来过!");
            var scene = cc.Scene.create();
            var layer = new GameOver();
            layer.init();

            // 清空当前数据
            this.ContainerSetBack();
            scene.addChild(layer);
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        } else {
            this._lbLife.setString(TD.LIFE);
        }
    },

    // 清空容器内所有内容
    ContainerSetBack:function (){
        TD.LIFE = this.preLife;
        TD.MONEY = this.preMoney;

        TD.CONTAINER.ENEMIES = [];
        TD.CONTAINER.ENEMY_BULLETS = [];
        TD.CONTAINER.PLAYER_BULLETS = [];
        TD.CONTAINER.PROTECTORS = [];
        TD.MAPARR = [];
    },

    updateMoney:function () {
        this._lbMoney.setString(TD.MONEY);
//        winSize.width / 4 * 3, winSize.height-32
        this._lbMoney.setAnchorPoint(cc.p(0, 0));
        this._lbMoney.setPosition(cc.p(winSize.width / 4 + this._lbMoney.getString().length * 10,
            winSize.height - 32 * sizeRatio - 10 * sizeRatio));
    },

    // 支持移动设备
    onTouchesMoved:function( touches, event ){
    },

    onTouchesEnded:function( touches, event ){
    },

    onTouchesBegan:function(touches, event){
//        cc.log("TouchesBegan is called");
        if(touches){
          var pos = touches[0].getLocation();
//          cc.log("posLocation:"+ pos.x + " " + pos.y);
          // 判断是否加入protectorLayer
          if( this.getChildByTag(PROTECTLAYERID) ){
//              cc.log("this.getChildByTag(PROTECTLAYERID):");
              this.removeChildByTag(PROTECTLAYERID, true);
              this.updateUI();
              return true;
          }

          // 判断是否已经加入upgrade
          if( !this.getChildByTag(UPGRADE_SPRITE) ){
//              cc.log("UPGRADE_SPRITE不在");

            // 未加入upgrade时，判断是否当前位置为空
            var tileCoord = this.tileCoordForPosition(pos);
            if (TD.MAPARR[tileCoord.x][tileCoord.y] == 0) {
//                cc.log("当前位置为空，显示layer");
              this.showProtectorLayer(pos);
              return true;
            }

            // 判断是否点击到protector
            this._selectProtector = this.getProtectorByPosition(pos);
            cc.log("selectProtector:" + this._selectProtector);
            if(this._selectProtector == null){
//                cc.log("点到空地");
              return true;
            } else {
              // 点到protector且，屏幕中没有updateSprite，则添加升级展示效果
//                cc.log("点到protector，显示upgrade");
              this.showProUpgrade();
            }
          } else {

            // 判断是否点到upgrade
            // 是否最高级， 后在Protector用加一nextLevel，-1表示最高，如今先下面这样处理
            var sellArea = this.getSpriteRect(this._sellSprite);

            if(this._selectProtector.pType != 4){
              var upgradeArea = this.getSpriteRect(this._upgrade);
              // 时候可升级
              if(TD.ProtectorType[this._selectProtector.pType + 1].cost <= TD.MONEY){

//                cc.log("upgradeArea:" + upgradeArea.x + " " + upgradeArea.y + " " +upgradeArea.width + " " + upgradeArea.height);
                if(cc.rectContainsPoint(upgradeArea, pos)){
                  // 点到upgrade，实现升级效果
//                  cc.log("哎呦喂，你居然点到升级了！");
                  this._selectProtector.upgradeToNext(this._levelManager);
                }
              }
            }

            if( cc.rectContainsPoint(sellArea, pos) ){
               // 点到sold，卖吊selectSprite
//               cc.log("哎呦喂，你居然买了它！你作死啊！");

              var selectPos = this._selectProtector.getPosition();
              var selectTileCoord = this.tileCoordForPosition(selectPos);
              this._selectProtector.destroyP(selectTileCoord);
            }

            // 取消显示upgrade一堆效果
            this._upgrade.removeFromParent(true);
            this._noUpgrade.removeFromParent(true);
            this._maxUpgrade.removeFromParent(true);
            this._drawRange.removeFromParent(true);
            this._sellSprite.removeFromParent(true);
            this._sellMoneyL.removeFromParent(true);
            this._upgradeMoneyL.removeFromParent(true);
            this._selectProtector = null;
          }
        }
    return true;
    },

    tileCoordForPosition:function (pos) {
        var convertx, converty;
        var tilesize = this._backTileMap.getTileSize();
        var mapsize = this._backTileMap.getMapSize();
        convertx = parseInt( pos.x / tilesize.width );
        converty = parseInt((mapsize.height * tilesize.height - pos.y) / tilesize.height);
        return cc.p(convertx, converty);
    },

    checkIsCollide:function () {
        var selChild, bulletChild;
        //check collide
        for (var i = 0; i < TD.CONTAINER.ENEMIES.length; i++) {
            selChild = TD.CONTAINER.ENEMIES[i];
            for (var j = 0; j < TD.CONTAINER.PLAYER_BULLETS.length; j++) {
                bulletChild = TD.CONTAINER.PLAYER_BULLETS[j];
                if (this.collide(selChild, bulletChild)) {
                    bulletChild.destroy();
                    selChild.hurt(bulletChild._HPminus);
                }
                if (!cc.rectIntersectsRect(this.screenRect, bulletChild.getBoundingBox())) {
                    bulletChild.destroy();
                }
            }
        }
    },

    collide:function (a, b) {
        var aRect = a.collideRect();
        var bRect = b.collideRect();
        if (cc.rectIntersectsRect(aRect, bRect)) {
            return true;
        }
    },

    getProtectorByPosition: function(pos){
//        pos = cc.p(pos.x, winSize.height - pos.y);
        for(var i = 0; i < TD.CONTAINER.PROTECTORS.length; i++){

          var r = TD.CONTAINER.PROTECTORS[i].collideRect();
          if(cc.rectContainsPoint(r, pos)){
//              cc.log("sprite is clicked!");
              return TD.CONTAINER.PROTECTORS[i];
          }
        }

        return null;
    },

    getSpriteRect:function(sprite){
      var pos = sprite.getPosition();

      return cc.rect(pos.x - 32 * sizeRatio, pos.y - 32 * sizeRatio, 64 * sizeRatio, 64 * sizeRatio);
    },

  showProtectorLayer:function(pos){
    this._protectLayer = new ProtectLayer(this._levelManager._currentLevel.protectorTypes, this._levelManager);
    this._protectLayer.init();
    this._protectLayer.setPos(pos);
    this.addChild(this._protectLayer, 2000, PROTECTLAYERID);
    this.updateUI();
    var p = this._protectLayer.menu.getAnchorPoint();
    cc.log("anchorpoint:" + p.x + " " + p.y);
  },

  showProUpgrade:function(){
    var upgrateSprite = this._upgrade;
    upgrateSprite.setOpacity(255);
    var selectPos = this._selectProtector.getPosition();
    this._sellMoneyL.setString( (this._selectProtector._cost * this._sellRatio) );
    this._sellMoneyL.setPosition(cc.p( selectPos.x - 72 * sizeRatio, selectPos.y - 35 * sizeRatio) );
    this.addChild(this._sellMoneyL, 1001);

    if(this._selectProtector.pType == 4){
      // 已是最高级
      upgrateSprite = this._maxUpgrade;
    } else {
      if(TD.ProtectorType[this._selectProtector.pType + 1].cost > TD.MONEY){
        upgrateSprite.setOpacity(128);
      }
      this._upgradeMoneyL.setString(TD.ProtectorType[this._selectProtector.pType + 1].cost);
      this._upgradeMoneyL.setPosition(cc.p( selectPos.x + 120 * sizeRatio, selectPos.y - 35 * sizeRatio) );
      this.addChild(this._upgradeMoneyL, 1001);
    }
    upgrateSprite.setAnchorPoint(cc.p(0.5, 0.5));
    this._sellSprite.setAnchorPoint(cc.p(0.5, 0.5));

    upgrateSprite.setPosition(cc.p(selectPos.x + 96 * sizeRatio, selectPos.y));
    this._sellSprite.setPosition(cc.p(selectPos.x - 96 * sizeRatio, selectPos.y));
    this._drawRange = cc.Sprite.create();
    this._drawRange.initWithFile(TD.ProtectorType[this._selectProtector.pType].attackRI);
    this._drawRange.setPosition(selectPos);
    this.addChild(this._drawRange, 999);
    this.addChild(this._sellSprite, 1000);
    this.addChild(upgrateSprite, 1000, UPGRADE_SPRITE);

    this.updateUI();
  }
});

//无视之，切换场景所用
var SecondViewScene = cc.Scene.extend({
    //进入场景时
    onEnter:function () {
        this._super();
        var layer = new SecondView();
        layer.init();
        this.addChild(layer);
    }
});
