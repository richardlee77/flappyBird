// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property(cc.Sprite)
    bird0:cc.Sprite = null;

    @property(cc.Sprite)
    bird1:cc.Sprite = null;

    @property(cc.Sprite)
    bird2:cc.Sprite = null;

    @property(cc.Sprite)
    bird3:cc.Sprite = null;

    @property(cc.Node)
    birdParent:cc.Node = null;

    @property(cc.Node)
    bg0:cc.Node = null;

    @property(cc.Node)
    bg1:cc.Node = null;

    @property(cc.Node)
    pipeParent0:cc.Node = null;

    @property(cc.Node)
    pipeParent1:cc.Node = null;

    @property(cc.Node)
    pipeParent2:cc.Node = null;

    @property(cc.Node)
    pipeParent3:cc.Node = null;

    @property(cc.Label)
    lbscore:cc.Label = null;

    @property(cc.Node)
    nodeGameOver:cc.Node = null;

    @property(cc.Button)
    btnStart:cc.Button = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    time:number = 0;
    speed:number = 0;
    score:number = 0;

    isGameStart:boolean = false;

    start () {//初始时给管子位子赋值坐标

        let pipeStartOffsetX:number = 200;
        let num = (800 + 52)/4;

        this.pipeParent0.x = pipeStartOffsetX + num*0;
        this.pipeParent1.x = pipeStartOffsetX + num*1;
        this.pipeParent2.x = pipeStartOffsetX + num*2;
        this.pipeParent3.x = pipeStartOffsetX + num*3;

    }

    update (dt:number) {//
        let timeTemp = this.time + dt;
        this.time = timeTemp;
        if(this.time > 0.5){//小鸟扇翅膀，即同一时刻只显示一个bird，然后切换
            if(this.bird0.node.active){
                this.bird0.node.active = false;
                this.bird1.node.active = true;
            }else if(this.bird1.node.active){
                this.bird1.node.active = false;
                this.bird2.node.active = true;
            }else if(this.bird2.node.active){
                this.bird2.node.active = false;
                this.bird3.node.active = true;
            }else if(this.bird3.node.active){
                this.bird3.node.active = false;
                this.bird0.node.active = true;
            }

            this.time = 0;//不要忘了要清零
        }
        
        // let birdY = this.birdParent.y;  //匀速下落
        // this.birdParent.y = birdY - 2;

        if(this.isGameStart == false){//游戏没有开始时，以下皆不运行
            return;
        }

        this.speed = this.speed - 0.05;//给定小鸟速度
        this.birdParent.y = this.birdParent.y + this.speed;

        this.birdParent.rotation = - this.speed * 10;//上飞，下落的时候旋转一定角度

        this.moveBg(this.bg0);//调用背景移动函数
        this.moveBg(this.bg1);

        this.movePipe(this.pipeParent0);//调用管子移动函数
        this.movePipe(this.pipeParent1);
        this.movePipe(this.pipeParent2);
        this.movePipe(this.pipeParent3);

        this.checkCollision(this.birdParent,this.pipeParent0);//检测碰撞
        this.checkCollision(this.birdParent,this.pipeParent1);
        this.checkCollision(this.birdParent,this.pipeParent2);
        this.checkCollision(this.birdParent,this.pipeParent3);

    }

    moveBg(bg:cc.Node){
        bg.x = bg.x -1;
        if(bg.x < -800){//当背景移动到-800（即一个屏幕宽度）时，把背景移动到两个屏幕前
            bg.x = bg.x + 800*2;
        }
    }

    movePipe(pipe:cc.Node){//管子移动到屏幕外面时（屏幕一半宽度+管子一半宽度），把管子提前到一个屏幕前+管子宽度
        pipe.x = pipe.x - 2;
        if(pipe.x < (-400-26)){
            pipe.x = pipe.x + 800+52;

            pipe.y = 100 - (Math.random()*100);//给管子y轴一个随机位置，Math.random()会生成一个0-1之间的数

            this.score = this.score + 1;//得分+1
            this.lbscore.string = this.score.toString();//把label转成字符串，但是很遗憾我这里使用font失败
        }
    }

    checkCollision(bird:cc.Node,pipe:cc.Node){
        if(bird.x + 17 < pipe.x - 26){//小鸟的最右边x小于管子最左边
            return;
        }
        if(bird.x -17 > pipe.x + 26){//小鸟最左边x大于管子最右边
            return;
        }
        if((bird.y + 12 < pipe.y +100)&&(bird.y -12 > pipe.y - 100)){//两个管子y轴中间
            return;
        }
        else{
            this.gameOver();
            console.log("发生碰撞");//在开发者工具中可以看到“发生碰撞”
        }
        
    }

    onButtonClick(){//点击时给鸟一个向上的速度
        this.speed = 2.5;
    }   

    onButtonStartClick(){//点击开始按钮
        this.isGameStart = true;

        this.nodeGameOver.active = false;
        this.btnStart.node.active = false;

        this.resetGame();
    }

    gameOver(){
        this.isGameStart = false;
        this.nodeGameOver.active = true;
        this.btnStart.node.active = true;
    }

    resetGame(){//重置游戏
        this.nodeGameOver.active = false;
        this.btnStart.node.active = false;

        this.birdParent.x = -100;
        this.birdParent.y = -33;
        this.speed = 0;

        let pipeStartOffsetX:number = 200;
        let num = (800 + 52)/4;

        this.pipeParent0.x = pipeStartOffsetX + num*0;
        this.pipeParent1.x = pipeStartOffsetX + num*1;
        this.pipeParent2.x = pipeStartOffsetX + num*2;
        this.pipeParent3.x = pipeStartOffsetX + num*3;
    }


}
