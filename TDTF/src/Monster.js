/**
 * Created with JetBrains WebStorm.
 * User: Gogo King
 * Date: 13-1-24
 * Time: 下午12:53
 * To change this template use File | Settings | File Templates.
 */
//创建怪物
var Monster = cc.Sprite.extend({
    objtype:"Monster", //monster 类型
    plist:null,
    sImage:null,
    mID:0, //moster id
    active:true, //是否被激活
    speed:10, //移动速度
    currentWP:0,
    nextWP:1,
    HP:100, //血量
    MMable:false, //表示是否可以被移动
    moveType:null, //移动的type
    money:10, //打倒可以得到的钱
    attackTD:5, //损失td的值
    delayTime:1 + 1.2 * Math.random(),
    moveDir:TD.ENEMY_MOVE_TYPE.MOVE.RIGHT, //移动的mode
    appearPosition:cc.p(60, 60), //初始的位置
    _timeTick:0, //时间tick
    _hurtColorLife:0, //血条
    _textureName:null,
    _action:null, //移动动作数组
    _animFrams:null, //精灵的动作帧
    _runAction:null, //动作，表示正在运行的动作
    _reachDest:false, //是否到达终点
    _Xuecao:null,
    _rectXuetiao:null,
    _MaxHP:0,
    ctor:function (arg) {
        // needed for JS-Bindings compatibility
        cc.associateWithNative(this, cc.Sprite);
        this.HP = arg.HP;
        this._MaxHP = arg.HP;
        this.moveType = arg.moveType;
        this.money = arg.money;
        this.attackTD = arg.attackTD;
        this.plist = arg.plist;
        this.sImage = arg.sImage;
        this.speed = arg.speed;
        this._textureName = arg.textureName;
        this._action = [];
        this._animFrams = [];
        this._animFrams.Right = [];
        this._animFrams.Left = [];
        this._animFrams.Up = [];
        this._animFrams.Down = [];
        this._runAction = cc.Action.create();
//        this._Xuecao = cc.Sprite.createWithSpriteFrameName("xuecao.png");
//        this._Xuecao.setColor(cc.c3b(255,0,0));
//        this._Xuecao.setPosition(cc.p(200,257));
//        this.addChild(this._Xuecao);
        this._rectXuetiao =cc.TextureCache.getInstance().addImage(s_GUI);
        this._Xuecao = cc.Sprite.createWithTexture(this._rectXuetiao, cc.rect(895,587,54,10));
        this._Xuecao.setPosition(cc.p(200,257));
        this.addChild(this._Xuecao);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(this.plist, this.sImage);
        this.initFrame();
        this.initWithSpriteFrameName(arg.textureName);

        this.enableEvents(true);
    },
    initFrame:function () {
        //右走的动画祯加载
        var sr = this._textureName;
        sr = sr.replace("right", TD.ENEMY_MOVE_TYPE.MOVE.RIGHT);
        // cc.log("sr:" + sr);
        var frame0 = cc.SpriteFrameCache.getInstance().getSpriteFrame(sr);
        sr = sr.replace("1", "2");
        //  cc.log("sr:" + sr);
        var frame1 = cc.SpriteFrameCache.getInstance().getSpriteFrame(sr);
        this._animFrams.Right.push(frame0);
        this._animFrams.Right.push(frame1);
        //  cc.log("frame:" + frame1);
        //左走的动画祯加载
        var sl = this._textureName;
        sl = sl.replace("right", TD.ENEMY_MOVE_TYPE.MOVE.LEFT);
        //  cc.log("sl:" + sl);
        var frame2 = cc.SpriteFrameCache.getInstance().getSpriteFrame(sl);
        sl = sl.replace("1", "2");
        // cc.log("sl:" + sl);
        var frame3 = cc.SpriteFrameCache.getInstance().getSpriteFrame(sl);
        this._animFrams.Left.push(frame2);
        this._animFrams.Left.push(frame3);
        //上走的动画祯加载
        var su = this._textureName;
        su = su.replace("right", TD.ENEMY_MOVE_TYPE.MOVE.UP);
        // cc.log("su:" + su);
        var frame4 = cc.SpriteFrameCache.getInstance().getSpriteFrame(su);
        su = su.replace("1", "2");
        // cc.log("su:" + su);
        var frame5 = cc.SpriteFrameCache.getInstance().getSpriteFrame(su);
        this._animFrams.Up.push(frame4);
        this._animFrams.Up.push(frame5);
        //下走的动画祯加载
        var sd = this._textureName;
        sd = sd.replace("right", TD.ENEMY_MOVE_TYPE.MOVE.DOWN);
        //  cc.log("sd:" + sd);
        var frame6 = cc.SpriteFrameCache.getInstance().getSpriteFrame(sd);
        sd = sd.replace("1", "2");
        //  cc.log("sd:" + sd);
        var frame7 = cc.SpriteFrameCache.getInstance().getSpriteFrame(sd);
        this._animFrams.Down.push(frame6);
        this._animFrams.Down.push(frame7);
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
    changedir:function (nextPos) {
        var animate, animation;
        this.stopAction(this._runAction);
//        cc.log("TD.WayPoints[this.currentWP].x:" + TD.WayPoints[this.currentWP].x + "  TD.WayPoints[this.currentWP].y:" + TD.WayPoints[this.currentWP].y);
//        cc.log("nextPos.x:" + nextPos.x + " nextPos.y:" + nextPos.y);
        var x, y;
        if (nextPos.x > TD.WayPoints[this.currentWP].x && nextPos.y == TD.WayPoints[this.currentWP].y) {
            this.moveDir = TD.ENEMY_MOVE_TYPE.MOVE.RIGHT;
            //创建动画
            y = 0;
            x = nextPos.x - TD.WayPoints[this.currentWP].x;
            animation = cc.Animation.create(this._animFrams.Right, 0.2);
        }
        if (nextPos.x < TD.WayPoints[this.currentWP].x && nextPos.y == TD.WayPoints[this.currentWP].y) {
            this.moveDir = TD.ENEMY_MOVE_TYPE.MOVE.LEFT;
            animation = cc.Animation.create(this._animFrams.Left, 0.2);
            y = 0;
            x = nextPos.x - TD.WayPoints[this.currentWP].x;
        }
        if (nextPos.y > TD.WayPoints[this.currentWP].y && nextPos.x == TD.WayPoints[this.currentWP].x) {
            this.moveDir = TD.ENEMY_MOVE_TYPE.MOVE.UP;
            animation = cc.Animation.create(this._animFrams.Up, 0.2);
            x = 0;
            y = nextPos.y - TD.WayPoints[this.currentWP].y;
        }
        if (nextPos.y < TD.WayPoints[this.currentWP].y && nextPos.x == TD.WayPoints[this.currentWP].x) {
            this.moveDir = TD.ENEMY_MOVE_TYPE.MOVE.DOWN;
            animation = cc.Animation.create(this._animFrams.Down, 0.2);
            x = 0;
            y = nextPos.y - TD.WayPoints[this.currentWP].y;
        }
        //创建动作
        animate = cc.Animate.create(animation);
        //让动作跑起来
        this._runAction = this.runAction(cc.RepeatForever.create(animate));
        // cc.log("runAction:"+this._runAction);
        // cc.log("nextPos.x:" + nextPos.x);
        // cc.log("nextPos.y:" + nextPos.y);
        this.nextWP++;
        this.currentWP++;
        // cc.log("nums of actions:"+this.numberOfRunningActions());
        //移动精灵,需要改动这个时间，让精灵匀速的走动
        var dis = Math.pow((x * x + y * y), 0.5);
        var ac = new cc.MoveBy.create(parseInt(dis / this.speed), cc.p(x, y));
        this._action.push(ac);
        // cc.log("acDone?" + ac.isDone());
        this.runAction(ac);

    },
    Mdestroy:function () {
//        cc.log("moster'hp:" + this.HP);
        var parentlayer = this.getParent();
        if (this.HP <= 0) {
            TD.MONEY += this.money;
           // parentlayer.updateUI();
            cc.ArrayRemoveObject(TD.CONTAINER.ENEMIES, this);
            this.removeFromParent();
        }
        if (this._reachDest) {
            TD.LIFE = TD.LIFE - this.attackTD;
//            cc.log("LIFE:" + TD.LIFE);
            parentlayer.updateUI();
            cc.ArrayRemoveObject(TD.CONTAINER.ENEMIES, this);
            this.removeFromParent();
        }

        //此处需要调用场景中的函数来更新ui，即updateUI();
        //加点音效,动画啊什么的乱七八糟

    },
    hurt:function (Hpminus) {
        //需要在protector中加入攻击损伤值，然后再将血量减少，并重新update
        this._hurtColorLife = 2;
        this.HP = this.HP - Hpminus;
        this._Xuecao.initWithTexture(this._rectXuetiao, cc.rect(895,587,54*(this.HP/this._MaxHP),10));
        this.setColor(cc.c3b(255, 0, 0));
        var action = cc.Sequence.create(
            cc.DelayTime.create(0.05),
            cc.CallFunc.create(this.setMColor, this));
        this.runAction(action);
        this.Mdestroy();
    },
    setMColor:function(){
      this.setColor(cc.c3b(255,255,255));
    },
    collideRect:function () {
        //碰撞检测
        var a = this.getContentSize();
        var p = this.getPosition();
        return cc.rect(p.x - a.width / 2, p.y - a.height / 4, a.width, a.height / 2);
    },

    enableEvents:function (enabled) {
    //        cc.log("platform 1st scene:" + cc.config.platform);
        var t = cc.config.platform;
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

