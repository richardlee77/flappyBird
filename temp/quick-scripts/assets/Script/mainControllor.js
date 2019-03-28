(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/mainControllor.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cf145CYDRJGKbDgBny+IofJ', 'mainControllor', __filename);
// Script/mainControllor.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = 'hello';
        _this.bird0 = null;
        _this.bird1 = null;
        _this.bird2 = null;
        _this.bird3 = null;
        _this.birdParent = null;
        _this.bg0 = null;
        _this.bg1 = null;
        _this.pipeParent0 = null;
        _this.pipeParent1 = null;
        _this.pipeParent2 = null;
        _this.pipeParent3 = null;
        _this.lbscore = null;
        _this.nodeGameOver = null;
        _this.btnStart = null;
        // LIFE-CYCLE CALLBACKS:
        // onLoad () {}
        _this.time = 0;
        _this.speed = 0;
        _this.score = 0;
        _this.isGameStart = false;
        return _this;
    }
    NewClass.prototype.start = function () {
        var pipeStartOffsetX = 200;
        var num = (800 + 52) / 4;
        this.pipeParent0.x = pipeStartOffsetX + num * 0;
        this.pipeParent1.x = pipeStartOffsetX + num * 1;
        this.pipeParent2.x = pipeStartOffsetX + num * 2;
        this.pipeParent3.x = pipeStartOffsetX + num * 3;
    };
    NewClass.prototype.update = function (dt) {
        var timeTemp = this.time + dt;
        this.time = timeTemp;
        if (this.time > 0.5) { //小鸟扇翅膀，即同一时刻只显示一个bird，然后切换
            if (this.bird0.node.active) {
                this.bird0.node.active = false;
                this.bird1.node.active = true;
            }
            else if (this.bird1.node.active) {
                this.bird1.node.active = false;
                this.bird2.node.active = true;
            }
            else if (this.bird2.node.active) {
                this.bird2.node.active = false;
                this.bird3.node.active = true;
            }
            else if (this.bird3.node.active) {
                this.bird3.node.active = false;
                this.bird0.node.active = true;
            }
            this.time = 0; //不要忘了要清零
        }
        // let birdY = this.birdParent.y;  //匀速下落
        // this.birdParent.y = birdY - 2;
        if (this.isGameStart == false) { //游戏没有开始时，以下皆不运行
            return;
        }
        this.speed = this.speed - 0.05; //给定小鸟速度
        this.birdParent.y = this.birdParent.y + this.speed;
        this.birdParent.rotation = -this.speed * 10; //上飞，下落的时候旋转一定角度
        this.moveBg(this.bg0); //调用背景移动函数
        this.moveBg(this.bg1);
        this.movePipe(this.pipeParent0); //调用管子移动函数
        this.movePipe(this.pipeParent1);
        this.movePipe(this.pipeParent2);
        this.movePipe(this.pipeParent3);
        this.checkCollision(this.birdParent, this.pipeParent0); //检测碰撞
        this.checkCollision(this.birdParent, this.pipeParent1);
        this.checkCollision(this.birdParent, this.pipeParent2);
        this.checkCollision(this.birdParent, this.pipeParent3);
    };
    NewClass.prototype.moveBg = function (bg) {
        bg.x = bg.x - 1;
        if (bg.x < -800) { //当背景移动到-800（即一个屏幕宽度）时，把背景移动到两个屏幕前
            bg.x = bg.x + 800 * 2;
        }
    };
    NewClass.prototype.movePipe = function (pipe) {
        pipe.x = pipe.x - 2;
        if (pipe.x < (-400 - 26)) {
            pipe.x = pipe.x + 800 + 52;
            pipe.y = 100 - (Math.random() * 100); //给管子y轴一个随机位置，Math.random()会生成一个0-1之间的数
            this.score = this.score + 1; //得分+1
            this.lbscore.string = this.score.toString(); //把label转成字符串，但是很遗憾我这里使用font失败
        }
    };
    NewClass.prototype.checkCollision = function (bird, pipe) {
        if (bird.x + 17 < pipe.x - 26) { //小鸟的最右边x小于管子最左边
            return;
        }
        if (bird.x - 17 > pipe.x + 26) { //小鸟最左边x大于管子最右边
            return;
        }
        if ((bird.y + 12 < pipe.y + 100) && (bird.y - 12 > pipe.y - 100)) { //两个管子y轴中间
            return;
        }
        else {
            this.gameOver();
            console.log("发生碰撞"); //在开发者工具中可以看到“发生碰撞”
        }
    };
    NewClass.prototype.onButtonClick = function () {
        this.speed = 2.5;
    };
    NewClass.prototype.onButtonStartClick = function () {
        this.isGameStart = true;
        this.nodeGameOver.active = false;
        this.btnStart.node.active = false;
        this.resetGame();
    };
    NewClass.prototype.gameOver = function () {
        this.isGameStart = false;
        this.nodeGameOver.active = true;
        this.btnStart.node.active = true;
    };
    NewClass.prototype.resetGame = function () {
        this.nodeGameOver.active = false;
        this.btnStart.node.active = false;
        this.birdParent.x = -100;
        this.birdParent.y = -33;
        this.speed = 0;
        var pipeStartOffsetX = 200;
        var num = (800 + 52) / 4;
        this.pipeParent0.x = pipeStartOffsetX + num * 0;
        this.pipeParent1.x = pipeStartOffsetX + num * 1;
        this.pipeParent2.x = pipeStartOffsetX + num * 2;
        this.pipeParent3.x = pipeStartOffsetX + num * 3;
    };
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "label", void 0);
    __decorate([
        property
    ], NewClass.prototype, "text", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewClass.prototype, "bird0", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewClass.prototype, "bird1", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewClass.prototype, "bird2", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewClass.prototype, "bird3", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "birdParent", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "bg0", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "bg1", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "pipeParent0", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "pipeParent1", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "pipeParent2", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "pipeParent3", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "lbscore", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "nodeGameOver", void 0);
    __decorate([
        property(cc.Button)
    ], NewClass.prototype, "btnStart", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=mainControllor.js.map
        