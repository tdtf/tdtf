/**
 * Created with JetBrains WebStorm.
 * User: Gogo King
 * Date: 13-1-24
 * Time: 下午12:53
 * To change this template use File | Settings | File Templates.
 */
  //经过测试之后的报废js，可以无视之，也可以删除，完全是学习和测试所用，已经把函数都融入到secondview了！！！！！！！！！！！！！！！！！！！！！！
var testvar = "helloworld!!";


var CustomTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);
    }
});
var ProtectorTVL = cc.Layer.extend({
    init:function () {
        if (!this._super()) {
            return false;
        }
        cc.log("ProtectorTVL:"+helloworld);
        var winSize = cc.Director.getInstance().getWinSize();

        var tableView = cc.TableView.create(this, cc.SizeMake(500, 100));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        tableView.setPosition(cc.p(400, -1));
        tableView.setDelegate(this);
        this.addChild(tableView);
        tableView.reloadData();

        return true;
    },

    toExtensionsMainLayer:function (sender) {
        var scene = new ExtensionsTestScene();
        scene.runThisTest();
    },

    scrollViewDidScroll:function (view) {
    },
    scrollViewDidZoom:function (view) {
    },

    tableCellTouched:function (table, cell) {
        cc.log("cell touched at index: " + cell.getIdx());
    },

    cellSizeForTable:function (table) {
        return cc.SizeMake(100, 100);
    },

    tableCellAtIndex:function (table, idx) {
        var strValue = idx.toFixed(0);
        cc.log("strValue:"+strValue);
        var cell = table.dequeueCell();
        var label;
        if (!cell) {
            cell = new CustomTableViewCell();
            var sprite = cc.Sprite.create(s_B01);
            sprite.setAnchorPoint(cc.p(0, 0));
            sprite.setPosition(cc.p(0, 0));
            cell.addChild(sprite);

            label = cc.LabelTTF.create(strValue, "Helvetica", 20.0);
            label.setPosition(cc.p(0, 0));
            label.setAnchorPoint(cc.p(0, 0));
            label.setTag(123);
            cell.addChild(label);
        } else {
            label = cell.getChildByTag(123);
            label.setString(strValue);
        }

        return cell;
    },

    numberOfCellsInTableView:function (table) {
        return TD.CONTAINER.PROTECTORS.length;
    }
//
//    onMouseDown:function (event) {
//        var pos = event.getLocation();
//        cc.log("onMouseDown at: " + pos.x + " " + pos.y);
//        this.sprite2.setPosition(pos);
//    },
//    onMouseDragged:function (event) {
//        var pos = event.getLocation();
//        cc.log("onMouseDragged at: " + pos.x + " " + pos.y);
//        this.sprite2.setPosition(pos);
//    },
//    onMouseUp:function (event) {
//        var pos = event.getLocation();
//        this.sprite2.setPosition(pos);
//        cc.log("onMouseUp at: " + pos.x + " " + pos.y);
//    }
});

ProtectorTVL.create = function () {
    var retObj = new ProtectorTVL();
    if (retObj && retObj.init()) {
        return retObj;
    }
    return null;
};

