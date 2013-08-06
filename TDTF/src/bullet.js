/**
 * Created with JetBrains WebStorm.
 * User: Gogo King
 * Date: 13-1-24
 * Time: 下午12:53
 * To change this template use File | Settings | File Templates.
 */
//如果有子弹，那么是子弹射出的效果
//bullet
var Bullet = cc.Sprite.extend({
    active:true,
    xVelocity:0,
    yVelocity:0,
    _HPminus:0,
    zOrder:3000,
    bulletSpeed:null,
    onwer:null,
    ctor:function (onwer) {
        // needed for JS-Bindings compatibility
        this.onwer = onwer;
        this.bulletSpeed = onwer._weaponSpeed;
        this._HPminus = onwer._HPminus;
        cc.associateWithNative(this, cc.Sprite);
        var bulletTexture = cc.TextureCache.getInstance().addImage(onwer._weaponType);
        this.initWithTexture(bulletTexture);
        this.setPosition(onwer.getPosition());
    },
    throwBombing:function (dt) {
        TD.CONTAINER.ENEMY_BULLETS.push(this);
        var p = dt.getPosition();
        var pos = this.getPosition();
        var calX = Math.abs(parseInt(p.x) - parseInt(pos.x));
        var calY = Math.abs(parseInt(p.y) - parseInt(pos.y));
        var distance_float = Math.pow((calX * calX + calY * calY), 0.5);
        var distance_int = parseInt(distance_float);
        var ac = new cc.MoveBy.create(parseInt(distance_int/this.bulletSpeed), cc.p(p.x-pos.x, p.y-pos.y));
        this.runAction(ac);
    },
    destroy:function () {
        this.removeAllActions();
        cc.ArrayRemoveObject(TD.CONTAINER.ENEMY_BULLETS, this);
        this.removeFromParent();
    },
    collideRect:function () {
        var p = this.getPosition();
        var a = this.getContentSize();
        var r = new cc.rect(p.x - a.width / 2, p.y - a.height / 2, a.width, a.height / 2);
        return r;
    },
    setDir:function(angle){
        cc.log("jiaodu:"+angle);
         this.setRotation(-245);
    }
});
