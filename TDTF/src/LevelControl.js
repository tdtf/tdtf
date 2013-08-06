/**
 * Created with JetBrains WebStorm.
 * User: Gogo King
 * Date: 13-1-24
 * Time: 下午12:53
 * To change this template use File | Settings | File Templates.
 */

//等级控制器,成功之后需要切换等级在这里!!!
var LevelManager = cc.Class.extend({
    _currentLevel:null,
    _gameLayer:null,
    _mylevel:null,
    _currentWave:0,
    _waves:0,
    _MonsterNum:null,
    _Spawn:0,
    _isOver:false, //用于判断最后一波敌人是否为空

    ctor:function (level, gameLayer) {
        if (!gameLayer) {
            throw "gameLayer must be non-nil";
        }
        this._mylevel = level;
        this._gameLayer = gameLayer;
        this._MonsterNum = [];

        this.setLevel(this._mylevel);
//        cc.log("level:" + this._mylevel);
//        cc.log("TD:" + TD.Levels.Level1.enemies[0].ShowTime);
//        cc.log("GameLayerID:" + gameLayer._id);
    },

    //设置level，还需要加很多关
    setLevel:function (level) {
//       cc.log("level:::::"+level);
        switch (level) {
            case 1:
                this._currentLevel = TD.Levels.Level1;
                this._MonsterNum = [3,5,7];
                break;
            case 2:
                this._currentLevel = TD.Levels.Level2;
                this._MonsterNum=[3,4,6,8,10];
                break;
            case 3:
                this._currentLevel = TD.Levels.Level3;
                this._MonsterNum=[3,5,7,8,9,10];
                break;
            case 4:
                this._currentLevel = TD.Levels.Level4;
                this._MonsterNum=[3,5,7,8,10,11,12];
                break;
            case 5:
                this._currentLevel = TD.Levels.Level5;
                this._MonsterNum=[3,4,7,8,10,12,14,15];
                break;
            case 6:
                this._currentLevel = TD.Levels.Level6;
                this._MonsterNum=[3,5,6,8,11,13,15,16,17];
                break;
        }

        this._waves = this._currentLevel.waves;
        for (var i = 0; i < this._currentLevel.enemies.length; i++) {
            this._currentLevel.enemies[i].ShowTime = this._minuteToSecond(this._currentLevel.enemies[i].ShowTime);
        }
    },
    //转换时间单位
    _minuteToSecond:function (minuteStr) {
        if (!minuteStr)
            return 0;
        if (typeof(minuteStr) != "number") {
            var mins = minuteStr.split(':');
            if (mins.length == 1) {
                return parseInt(mins[0], 10);
            } else {
                return parseInt(mins[0], 10) * 60 + parseInt(mins[1], 10);
            }
        }
        return minuteStr;
    },

    //加载资源
    loadLevelResource:function (deltaTime) {
//        cc.log("thime:" + deltaTime);
        //加载敌人
      if(deltaTime < 1){
          return;
       }

      var isAdded = true; // 判断是否加入enemy
        for (var i = 0; i < this._currentLevel.enemies.length; i++) {
            var selEnemy = this._currentLevel.enemies[i];
            if (selEnemy) {
                  if (selEnemy.ShowType == "Once") {
                    if (selEnemy.ShowTime == deltaTime) {
                        for (var tIndex = 0; tIndex < selEnemy.Types.length; tIndex++) {
                            isAdded = this.addEnemyToGameLayer(selEnemy.Types[tIndex]);
                        }
                    }
                } else if (selEnemy.ShowType == "Repeate") {
                    if (deltaTime % selEnemy.ShowTime === 0) {
                        for (var rIndex = 0; rIndex < selEnemy.Types.length; rIndex++) {
                            isAdded = this.addEnemyToGameLayer(selEnemy.Types[rIndex]);
                        }
                    }
                }
            }

            if(!isAdded){
              return;
            }
        }
    },

    //加载敌人到背景层
    addEnemyToGameLayer:function (enemyType) {
//        cc.log("本次已有怪物数目:"+this._Spawn);
//        cc.log("本次应有怪物数目:"+this._MonsterNum[this._currentWave]);
//        cc.log("this._currentWave:" + this._currentWave);
//        cc.log("this._waves:" + this._waves);

        if(this._Spawn == this._MonsterNum[this._currentWave]){
//            this._gameLayer._time = -3;
            if(this.isLastMonsterDisappear()){
                if(this._currentWave != this._waves - 1){
                    this._Spawn = 0;
                    this._gameLayer._time = -15;
                    this._currentWave++;
//                    this.loadLevelResource(this._gameLayer._time);
                } else {
//                    cc.log("this._currentWave == this._waves - 1");
                    this.isLastAndShowWin();
                }
            }
            return false;
        }
//        cc.log("enemyType:" + enemyType);
        var addEnemy = new Monster(TD.MonsterType[enemyType]);
        var enemypos = cc.p(TD.WayPoints[0].x, TD.WayPoints[0].y);
//        cc.log("firstpoit.x:" + enemypos.x);
//        cc.log("firstpoit.y:" + enemypos.y);
        var enemycs = addEnemy.getContentSize();
        addEnemy.setPosition(enemypos);
        var ac = new cc.MoveBy.create(1, cc.p(0, 0));
        addEnemy._action.push(ac);
        this._gameLayer.addChild(addEnemy, 1);
        TD.CONTAINER.ENEMIES.push(addEnemy);
        this._Spawn ++;
        addEnemy.runAction(ac);
//        cc.log("add:" + this._Spawn);

        return true;
    },

    //
    isLastAndShowWin:function(){
        //Win的场景切换
//        cc.Director.getInstance().pauseAllRunningActions();

        // 显示胜利场景，并切换到FirstMenuScene
        // 大虾，乃赢了
        this._isOver = this.isLastMonsterDisappear();
        if( this._isOver ){
            if(TD.MAXLEVEL == this._mylevel){
                TD.MAXLEVEL++;
            }
            this.showWinScene();
            this.loadFirstScene();
        }

        return;
    },

    isLastMonsterDisappear:function(){
      var num = TD.CONTAINER.ENEMIES.length;
      if(num > 0){
          return false;
      } else {
          return true;
      }
    },



    //加载保护着到层, 返回addProtector
    addProtectorToGameLayer:function (pos, ptype) {
        //add protector to layer
        cc.log("cost:" + ptype.textureName);
        var addProtector = new Protector(ptype);
        TD.MONEY = TD.MONEY - addProtector._cost;
        addProtector.setPosition(pos);
//        var spriteRect = addProtector.getTextureRect();
//        cc.log("addProtector Width:"+parseInt(spriteRect.width/32)+"Height:"+parseInt(spriteRect.height/32));
//        cc.log("Pos/32 Width:"+parseInt(pos.x/32)+"Height:"+parseInt(pos.y/32));
        var pos = this._gameLayer.tileCoordForPosition(pos);
//        for(var i = 0;i<parseInt(spriteRect.width/32);i++){
//            for(var j = 0;j<parseInt(spriteRect.height/32);j++){
//                TD.MAPARR[i+pos.x][j+pos.y]=1;
//            }
//        }
        TD.MAPARR[pos.x][pos.y] = 1;

        // 添加protector时，比同高度 monster ZOrder大一些，显示武器攻击
        this._gameLayer.addChild(addProtector, 100 + pos.y);
        TD.CONTAINER.PROTECTORS.push(addProtector);
        cc.log("Protector Length" + TD.CONTAINER.PROTECTORS.length);
        return addProtector;
    },
    //加载地图到层
    addMapToGameLayer:function (tmxmap) {
        //将地图放在最底层
        this._gameLayer.addChild(tmxmap, -1);
    },

    showWinScene:function(){

    },

    /**
     * 成功后载入FirstScene
     */
    loadFirstScene:function(){
//            cc.log("loadFirstScene");
            var scene = cc.Scene.create();
            var layer = new FirstView();
            layer.init();
            scene.addChild(layer);
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});
