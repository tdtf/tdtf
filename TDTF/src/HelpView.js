/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-5
 * Time: 下午10:44
 * To change this template use File | Settings | File Templates.
 */
var HelpView = cc.Layer.extend({
    _PAGENUM:3,
    _curPageNum:0,
    winSize:null,
    prePage:null,
    nextPage:null,
    help:[],
    init:function(){


        this.winSize = cc.Director.getInstance().getWinSize();
        this.help = [cc.Sprite.create(s_Help_01), cc.Sprite.create(s_Help_02),cc.Sprite.create(s_Help_03)];
        for(var i = 0; i < this.help.length; i++){
            this.help[i].setPosition( cc.p(this.winSize.width / 2, this.winSize.height / 2) );
        }
        this.addChild(this.help[0]);

        var label1 = cc.LabelTTF.create("上一页", "Arial", 20);
        this.prePage = cc.MenuItemLabel.create(label1, this.prePageFunc,this);
        this.prePage.setEnabled(false);

        var label2 = cc.LabelTTF.create("下一页", "Arial", 20);
        this.nextPage = cc.MenuItemLabel.create(label2, this.nextPageFunc, this);

        var label3 = cc.LabelTTF.create("返回主界面", "Arial", 20);
        var returnItem = cc.MenuItemLabel.create(label3, this.returnMainMenu, this);

        var menu = cc.Menu.create(this.prePage, this.nextPage, returnItem);
        menu.alignItemsHorizontally();
        menu.setPosition(cc.p( this.winSize.width/2, this.prePage.getContentSize().height / 2 + 10));
        this.addChild(menu);
    },

    prePageFunc:function(){
        this.removeChild(this.help[this._curPageNum]);

        this.addChild(this.help[--this._curPageNum]);
        this.nextPage.setEnabled(true);

        if(this._curPageNum == 0){
            this.prePage.setEnabled(false);
        }
    },

    nextPageFunc:function(){
        this.removeChild(this.help[this._curPageNum]);

        this.addChild(this.help[++this._curPageNum]);
        this.prePage.setEnabled(true);

        if(this._curPageNum == 2){
            this.nextPage.setEnabled(false);
        }
    },

    returnMainMenu: function(){
        this.removeAllChildren(true);
        cc.Director.getInstance().popScene();
    }
});

var HelpViewScene = cc.Scene.extend({
   onEnter:function(){
       this._super();
       var layer = new HelpView();
       layer.init();
       this.addChild(layer);
   }
});