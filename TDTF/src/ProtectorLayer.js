/**
 * Created with JetBrains WebStorm.
 * User: Gogo King
 * Date: 13-1-24
 * Time: 下午12:53
 * To change this template use File | Settings | File Templates.
 */

var ProtectLayer = cc.Layer.extend({
  protectTypesArray: [], // 类型数组，元素是数字
  spriteArray: [], // menuItemImage
  size: 0,
  _label:[],
  firstPos: null, // 该层放置位置，锚点都为（0.5,0.5）
  targetPos: null, // 添加对象的位置
  _levelManager: null,
  menu:null,
  _lableMenu:null,
  _placablePointSprite:null,

  ctor:function(protectTypesArray, levelManager){
    // needed for JS-Bindings compatibility
    cc.associateWithNative(this, cc.Layer);

    this._super();
    this.protectorTypesArray = protectTypesArray;
    this._levelManager = levelManager;
    this.size = this.protectorTypesArray.length;
    this.menu = cc.Menu.create();
    this._lableMenu = cc.Menu.create();

    this.setTouchPriority(-1);
    return true;
  },

  init:function(){
    this.initMenu();
    this.addToMenu();
    this.schedule(this.updateMenu, 1);
  },

  /**
   * 显示可放置框的位置。
   */
  showPlacablePoint:function(){
    this.placablePointSprite =  cc.Sprite.createWithSpriteFrameName("placablePoint.png");

    // 相对firstPos位置
    var p = cc.p(this.targetPos.x - this.firstPos.x, this.targetPos.y - this.firstPos.y);

    this.placablePointSprite.setPosition(p);
    this.addChild(this.placablePointSprite);
  },

  /**
   *  根据保护着种类数组初始化menu
   */
  initMenu:function(){

    for(var i = 0; i < this.size; i++){
      var ptype = this.protectorTypesArray[i];
      var cost = TD.ProtectorType[ptype].cost;
      var protectorType = TD.ProtectorType[ptype];
      this.spriteArray[i] = cc.MenuItemImage.create(protectorType.displayPic, protectorType.displayPic,
                  this.menuSelectedFunc, this);

//      this.spriteArray[i].setPosition(cc.pAdd(this.firstPos, cc.p(80 * sizeRatio * i, 0)));
      this.spriteArray[i].setTag(100 + i);

      var label = cc.LabelTTF.create("花费：" + cost, "Helvetica", 15.0 * sizeRatio);
      this._label[i] = cc.MenuItemLabel.create(label);
//      this._label[i].setPosition(cc.pAdd(this.firstPos, cc.p(85 * sizeRatio * i, 0)));
      this._label[i].setTag(123);

      if(cost > TD.MONEY){
        this.spriteArray[i].setOpacity(127);
        this.spriteArray[i].setEnabled(false);
      } else {
        this.spriteArray[i].setOpacity(255);
        this.spriteArray[i].setEnabled(true);
      }
    }
  },

  /**
   * 添加item to menu, items' tag is 1000 + i ，
   * tag为了在menuSelectedFunc判定sender的类型
   */
  addToMenu:function(){
    for(var i = 0; i < this.size; i++){
      this.menu.addChild(this.spriteArray[i], 2000, 1000 + i);
//      this.menu.addChild(this._label[i], 2001);
    }
    this.menu.alignItemsHorizontallyWithPadding(10 * sizeRatio);
    this.menu.setPosition(cc.p(0, 0));
    this.addChild(this.menu);
  },

  /**
   *  得到该layer适当位置
   * @param pos
   * @returns {*}
   */
  getFirstPos:function(pos){
    var p = cc.p(0, 0);
    var x = pos.x;
    var y = pos.y;
    var width = this.getMenuSize().width;
    var height = this.getMenuSize().height;
    if(x < width / 2){
      p.x = width / 2;
    } else if( x > winSize.width - width / 2){
      p.x = (winSize.width - width / 2);
    } else {
      p.x = x;
    }

    if(y < height / 2 * 3){
      p.y = height;
    } else if(y > winSize.height - height / 2 * 3){
      p.y = (winSize.height - height / 2 * 3 );
    } else {
      p.y = y - height;
    }

    p.x = parseInt(p.x / (64 * sizeRatio)) * (64 * sizeRatio);
    p.y = parseInt(p.y / (64 * sizeRatio)) * (64 * sizeRatio);

    return p;
  },

  /**
   * 获得可放置位置的标准位置
   * @param pos
   * @returns {*}
   */
  getTargetPos:function(pos){
    var x = parseInt(pos.x / ( 64 * sizeRatio )) * ( 64 * sizeRatio ) + 32 * sizeRatio;
    var y = parseInt(pos.y / ( 64 * sizeRatio )) * ( 64 * sizeRatio ) + 32 * sizeRatio;
    var p = cc.p(x, y);

    return p;
  },

  /**
   * 添加该层layer到主scene
   * 其他：
   * 设置firstPos为layer位置
   * targetPos为protector可放置位置的中点
   *
   * 并放置placable,同时显示入场动画
   * @param pos
   */
  setPos:function(pos){
    this.firstPos = this.getFirstPos(pos);
    this.targetPos = this.getTargetPos(pos);
    cc.log("this.firstPos: " + this.firstPos.x + " "  + this.firstPos.y);
    this.setPosition(this.firstPos);
    this.showPlacablePoint();
    this.onEnterAction();
  },

  /**
   * 获得menu的大小，自带函数略坑，自己写个
   * @returns {*}
   */
  getMenuSize:function(){
    return cc.SizeMake(this.size * (this.spriteArray[0].getContentSize().width + 10 * sizeRatio ) - 10 * sizeRatio,
      this.spriteArray[0].getContentSize().height);
  },

  /**
   * menu selected 回调函数
   * 添加protector，并移除该layer
   * @param sender
   */
  menuSelectedFunc:function(sender){
    var id = sender.getTag() - 1000;
    this._levelManager.addProtectorToGameLayer(this.targetPos, TD.ProtectorType[ this.protectorTypesArray[id] ]);
    this.removeFromParent(true);
  },

  /**
   * 每秒更新layer，是否mone足够
   * 用opacity显示是否可建
   * setEnabled控制Item是否可触发
   */
  updateMenu:function(){

    for(var i = 0; i < this.size; i++){
      var ptype = this.protectorTypesArray[i];
      var cost = TD.ProtectorType[ptype].cost;
      if(cost > TD.MONEY){
        this.spriteArray[i].setOpacity(128);
        this.spriteArray[i].setEnabled(false);
      } else {
        this.spriteArray[i].setOpacity(255);
        this.spriteArray[i].setEnabled(true);
      }
    }
    this.menu.removeAllChildren(true);
    this.menu.removeFromParent(true);
    this.addToMenu();
  },

  onTouchesBegan:function(touches, e){
  },

  onTouchesMoved:function(touch, e){
  },

  onTouchesEnded:function(touch, e){
  },

  /**
   * 进入时效果，由小变大，并旋转720 in 0.3s
   */
  onEnterAction:function(){
    for(var i = 0; i < this.size; i++){
      var scaleAction = cc.ScaleTo.create(0.3, 1);
      var rotateAction = cc.RotateBy.create(0.3, 720);
      var action = cc.Spawn.create(scaleAction, rotateAction);
      this.spriteArray[i].setScale(0.1);
      this.spriteArray[i].runAction(action);
    }
  }
});