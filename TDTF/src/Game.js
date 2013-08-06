/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-6
 * Time: 上午12:14
 * To change this template use File | Settings | File Templates.
 */

//GameFunc.js 游戏的全局函数
var Game = Game||{};
Game.Func = (function(){
    var instance;
    function constructor() {
        return {
            adjustSizeForWindow:function () {
                //目标高宽比
                var targetRatio = cc.originalCanvasSize.height / cc.originalCanvasSize.width;
                //窗口高宽比
                var winRatio = window.innerHeight / window.innerWidth;

                //重新设置画布的大小，使画布高宽比与目标高宽比相同。
                //根据比例，设置高度或宽度与窗口大小一样
                if (winRatio <= targetRatio) {
                    cc.canvas.height = window.innerHeight;
                    cc.canvas.width=window.innerHeight / targetRatio;
                }else{
                    cc.canvas.height = window.innerWidth * targetRatio;
                    cc.canvas.width = window.innerWidth;
                }

                //缩放比例
                var xScale = cc.canvas.width / cc.originalCanvasSize.width;

                //设置垂直和水平居中
                var parentDiv = document.getElementById("Cocos2dGameContainer");
                if ( parentDiv ) {
                    parentDiv.style.width = cc.canvas.width + "px";
                    parentDiv.style.height = cc.canvas.height + "px";
                    parentDiv.style.position = "absolute";
                    parentDiv.style.top = "50%";
                    parentDiv.style.left = "50%";
                    parentDiv.style.marginLeft = (-cc.canvas.width / 2) + "px";
                    parentDiv.style.marginTop = (-cc.canvas.height / 2) + "px";
                }
                //重置坐标
                cc.renderContext.translate(0, cc.canvas.height);

                //内容缩放
                cc.renderContext.scale(xScale, xScale);
                cc.Director.getInstance().setContentScaleFactor(xScale);
            }
        }
    }

    return{
        getInstance:function () {
            if (!instance) {
                instance = constructor();
            };
            return instance;
        }
    }
})();