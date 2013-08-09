//创建protector精灵
var Protector = cc.Sprite.extend({
    _cost:5, //建造一个需要的花费
    objtype:"Protector", //p 类型
    MMable:false, //表示是否可以被移动
    pID:0,
    plist:null,
    sImage:null,
//    is_selected:false,
    throwBombing:false, //攻击方式是否是扔炸弹
    canAttack:false, //能否攻击，是否在攻击范围内
    attackRange:0, //攻击范围
    _action:null, //表示攻击动作
    active:false,
    _weaponType:null,
    _weaponSpeed:null,
    attackDir:TD.PROTECTOR_ATTACK_TYPE.UP,
    _animFrams:null, //攻击帧
//    appearPosition:cc.p(80, 60), //初始的位置,
    _attackMode:"null",
    pType:0, //保卫者的类型
    target:null, //攻击目标的id
    _HPminus:0,
    _displayPic:null,
    _BombAngle:0,
    _curRange:0,
    _maxRange:1,

    ctor:function (arg) {
        // needed for JS-Bindings compatibility
        cc.associateWithNative(this, cc.Sprite);

        this._super();
        this._cost = arg.cost;
        this.attackRange = arg.attackRange * sizeRatio;
        this.pType = arg.pType;
        this._textureName = arg.textureName;
        this.plist = arg.plist;
        this.sImage = arg.sImage;
        this._displayPic = arg.displayPic;
        this._HPminus = arg.HPminus;
        this._weaponType = arg.weaponType;
        this._weaponSpeed = arg.weaponSpeed * sizeRatio;
        this._attackMode = arg.attackMode;
        this.throwBombing = arg.throwBombing;

        cc.SpriteFrameCache.getInstance().addSpriteFrames(this.plist, this.sImage);
        this.initWithSpriteFrameName(this._textureName);
        this.schedule(this.findTaget, 1.1);
        //this.initFrames();
        // set frame
    },

    initFrameAndAttackAni:function (dir) {
        this._animFrams = [];
        var sr = this._textureName;
        sr = sr.replace("down", dir);
        var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(sr);
        var lastFrame = frame;
        for (var i = 1; frame; i++) {
            this._animFrams.push(frame);
            sr = sr.replace(i, i + 1);
            frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(sr);
        }
        this._animFrams.push(lastFrame);

        var animation = cc.Animation.create(this._animFrams,0.1);
        var animate = cc.Animate.create(animation);

        if (this._animFrams[0] == null) {
            if(this._action != null){
//                cc.log("我再运行之前动作。。");
                this.runAction(this._action);
            }
            return;
        }

        this._action = cc.Sequence.create(
            cc.Repeat.create(animate, 0.5),
            cc.CallFunc.create(this.hurtMons, this)
        );
        this.runAction(this._action);
    },

    update:function (dt) {
        if (this.HP <= 0) {
            this.active = false;
        }
        this._timeTick += dt;
        if (this._timeTick > 0.1) {
            this._timeTick = 0;
            if (this._hurtColorLife > 0) {
                this._hurtColorLife--;
            }
            if (this._hurtColorLife == 1) {
                this.setColor(cc.c3b(255, 255, 255));
            }
        }
    },

    attackMonster:function (target, angle) {
        this.target = target;
        this.initFrameAndAttackAni(angle);
    },
    destroyP:function (tileCoord) {

      TD.MAPARR[tileCoord.x][tileCoord.y] = 0;
      TD.MONEY += this._cost;

      this.stopAllActions();
      this.removeFromParent(true);
      cc.ArrayRemoveObject(TD.CONTAINER.PROTECTORS, this);
      //        if (TD.SOUND) {
      //            cc.AudioEngine.getInstance().playEffect(s_shipDestroyEffect);
      //        }
    },
    hurtMons:function () {
        if (this.throwBombing) {
            cc.log("HAS BOMBS:" + this.throwBombing);
            var myBullet = new Bullet(this);
            this.getParent().addChild(myBullet);
            myBullet.setDir(this._BombAngle);
            myBullet.throwBombing(this.target); // 内部含有this.target.hurt，在moveBy动作结束后
        } else {
            cc.log("HAS BOMBS:" + this.throwBombing);
            this.target.hurt(this._HPminus);
        }
    },
    /**
     * 寻找一个目标（怪物）
     */
    findTaget:function () {
      // 持续攻击已有target，条件：targetHP大于零、在攻击范围、没到终点
        if(this.target != null){
          if(this.target.HP > 0 && this.isInAttackRange(this.target) && !this.target._reachDest){
            var angle = this.getTargetPositionAngle(this.target);
            this.attackMonster(this.target, angle);
            return;
          } else {
            this.target = null;
          }
        }

        for (var i = 0; i < TD.CONTAINER.ENEMIES.length; i++) {

          if( this.isInAttackRange(TD.CONTAINER.ENEMIES[i]) ){
            var angle = this.getTargetPositionAngle(TD.CONTAINER.ENEMIES[i]);
            this.attackMonster(TD.CONTAINER.ENEMIES[i], angle);
            return;
          }
        }
        this.initWithSpriteFrameName(this._textureName);
    },


    isInAttackRange:function(enemy){
      var pos = enemy.getPosition();
      var thispos = this.getPosition();
      var calX = Math.abs(parseInt(thispos.x) - parseInt(pos.x));
      var calY = Math.abs(parseInt(thispos.y) - parseInt(pos.y));
      var distance_float = Math.pow((calX * calX + calY * calY), 0.5);
      var distance_int = parseInt(distance_float);
//            cc.log("distance:" + distance_int + "  attackRange:" + this.attackRange);
      if (distance_int <= this.attackRange) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 取得目标的坐标（相对于地图左上角），正常xy坐标系
     */
    getTargetPositionAngle:function (target) {
        var angle = "";
        var targetPos = target.getPosition();
        var thisPos = this.getPosition();
        var x = Math.abs(targetPos.x - thisPos.x);
        var y = Math.abs(targetPos.y - thisPos.y);
        var z = Math.sqrt(x * x + y * y);
        var angle = Math.round((Math.asin(y / z) / Math.PI * 180));
        var x1 = parseInt(targetPos.x);
        var y1 = parseInt(targetPos.y);
        x = parseInt(thisPos.x);
        y = parseInt(thisPos.y);
        this.attackDir = "";
        if (x1 > x) {
            if (y1 < y) {
                angle = 270 + (90 - angle);
            }
        }
        if (x1 < x) {
            if (y1 < y) {
                angle = angle + 180;
            } else {
                angle = (90 - angle) + 90;
            }
        }
        if (x1 == x) {
            if (y1 < y) {
                angle = angle + 270;
            }
        }
//        cc.log("攻击角度:" + angle);
        if (angle >= 22 && angle < 67) {
            this.attackDir = TD.PROTECTOR_ATTACK_TYPE.ATTACKALLDIR.UPRIGHT;
        } else if (angle >= 67 && angle < 112) {
            this.attackDir = TD.PROTECTOR_ATTACK_TYPE.ATTACKALLDIR.UP;
        } else if (angle >= 112 && angle < 157) {
            this.attackDir = TD.PROTECTOR_ATTACK_TYPE.ATTACKALLDIR.UPLEFT;
        } else if (angle >= 157 && angle < 202) {
            this.attackDir = TD.PROTECTOR_ATTACK_TYPE.ATTACKALLDIR.LEFT;
        } else if (angle >= 202 && angle < 247) {
            this.attackDir = TD.PROTECTOR_ATTACK_TYPE.ATTACKALLDIR.DOWNLEFT;
        } else if (angle >= 247 && angle < 292) {
            this.attackDir = TD.PROTECTOR_ATTACK_TYPE.ATTACKALLDIR.DOWN
        } else if (angle >= 292 && angle < 337) {
            this.attackDir = TD.PROTECTOR_ATTACK_TYPE.ATTACKALLDIR.DOWNRIGHT;
        } else {
            this.attackDir = TD.PROTECTOR_ATTACK_TYPE.ATTACKALLDIR.RIGHT;
        }
        this._BombAngle = angle;
//        cc.log("攻击方向：" + this.attackDir);
        return this.attackDir;
    },

    /**
     * 向自己的目标开火
     */
    fire:function () {

    },
    collideRect:function () {
        var p = this.getPosition();
        var r = new cc.rect(p.x - 32 * sizeRatio, p.y - 32 * sizeRatio, 64 * sizeRatio, 64 * sizeRatio);
        return r;
    },

    upgradeToNext:function(levelManage){
      // 添加升级protector, 攻击对象传递
      var addPro = levelManage.addProtectorToGameLayer(this.getPosition(), TD.ProtectorType[this.pType + 1]);
      addPro.findTaget();

      // 从容器以及scene上移除低级protector
      this.stopAllActions();
      this.removeFromParent(true);
      cc.ArrayRemoveObject(TD.CONTAINER.PROTECTORS, this);
    }
});
