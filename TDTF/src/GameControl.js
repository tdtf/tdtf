/**
 * Created with JetBrains WebStorm.
 * User: Gogo King
 * Date: 13-1-24
 * Time: 下午12:53
 * To change this template use File | Settings | File Templates.
 */

//游戏控制器
GameController = cc.Class.extend({
    _curScene:null,
    _gameState:0,
    _isNewGame:true,
    _curLevel:0,
    _selectLevel:0,
    init:function () {
        return true;
    },
    setCurScene:function (s) {
        if (this._curScene != s) {
            if (this._curScene !== null) {
                this._curScene.onExit();
            }
            this._curScene = s;
            if (this._curScene) {
                this._curScene.onEnter();
                cc.Director.getInstance().replaceScene(s);
            }
        }
    },
    getCurScene:function () {
        return this._curScene;
    },
    runGame:function () {

    },
    newGame:function () {

    },
    option:function () {

    },
    about:function () {

    }
});

GameController.getInstance = function () {
    cc.Assert(this._sharedGame, "Havn't call setSharedGame");
    if (!this._sharedGame) {
        this._sharedGame = new GameController();
        if (this._sharedGame.init()) {
            return this._sharedGame;
        }
    } else {
        return this._sharedGame;
    }
    return null;
};

GameController._sharedGame = null;
