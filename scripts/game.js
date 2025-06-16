var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.objectCreate=$jscomp.ASSUME_ES5||"function"==typeof Object.create?Object.create:function(a){var h=function(){};h.prototype=a;return new h};$jscomp.underscoreProtoCanBeSet=function(){var a={a:!0},h={};try{return h.__proto__=a,h.a}catch(g){}return!1};
$jscomp.setPrototypeOf="function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(a,h){a.__proto__=h;if(a.__proto__!==h)throw new TypeError(a+" is not extensible");return a}:null;
$jscomp.inherits=function(a,h){a.prototype=$jscomp.objectCreate(h.prototype);a.prototype.constructor=a;if($jscomp.setPrototypeOf){var g=$jscomp.setPrototypeOf;g(a,h)}else for(g in h)if("prototype"!=g)if(Object.defineProperties){var v=Object.getOwnPropertyDescriptor(h,g);v&&Object.defineProperty(a,g,v)}else a[g]=h[g];a.superClass_=h.prototype};
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,h,g){a!=Array.prototype&&a!=Object.prototype&&(a[h]=g.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,h,g,v){if(h){g=$jscomp.global;a=a.split(".");for(v=0;v<a.length-1;v++){var x=a[v];x in g||(g[x]={});g=g[x]}a=a[a.length-1];v=g[a];h=h(v);h!=v&&null!=h&&$jscomp.defineProperty(g,a,{configurable:!0,writable:!0,value:h})}};$jscomp.polyfill("Object.is",function(a){return a?a:function(a,g){return a===g?0!==a||1/a===1/g:a!==a&&g!==g}},"es6","es3");
$jscomp.polyfill("Array.prototype.includes",function(a){return a?a:function(a,g){var h=this;h instanceof String&&(h=String(h));var x=h.length;g=g||0;for(0>g&&(g=Math.max(g+x,0));g<x;g++){var G=h[g];if(G===a||Object.is(G,a))return!0}return!1}},"es7","es3");
$jscomp.checkStringArgs=function(a,h,g){if(null==a)throw new TypeError("The 'this' value for String.prototype."+g+" must not be null or undefined");if(h instanceof RegExp)throw new TypeError("First argument to String.prototype."+g+" must not be a regular expression");return a+""};$jscomp.polyfill("String.prototype.includes",function(a){return a?a:function(a,g){return-1!==$jscomp.checkStringArgs(this,a,"includes").indexOf(a,g||0)}},"es6","es3");
var _0x4e87="LnBva2kuY29t bG9jYWxob3N0 139KObtWR 6505XySddN 1187125jopCbV 913662FnvCIe 740825sNyBkZ 459327dmigPF 335606FqHNeg 770186hYUBAW some top aHR0cHM6Ly9wb2tpLmNvbS9zaXRlbG9jaw== location length href".split(" "),_0x3b7c=function(a,h){return _0x4e87[a-340]};
(function(a,h){for(var g=_0x3b7c;;)try{if(parseInt(g(349))+parseInt(g(348))+-parseInt(g(350))+parseInt(g(345))*parseInt(g(344))+-parseInt(g(346))+-parseInt(g(351))+parseInt(g(347))===h)break;else a.push(a.shift())}catch(v){a.push(a.shift())}})(_0x4e87,725092);
!function(){var a=_0x3b7c,h=window.location.hostname;[a(343),a(342),"LnBva2ktZ2RuLmNvbQ=="].map(function(a){return atob(a)})[a(352)](function(a){var g=_0x3b7c;return"."===a.charAt(0)?-1!==h.indexOf(a,h[g(340)]-a[g(340)]):a===h})||true ||(window[a(355)][a(341)]=atob(a(354)),window[a(353)][a(355)]!==window[a(355)]&&(window[a(353)][a(355)]=window[a(355)]))}();var ad_show=!1;
function show_ad(){ad_show=!0;PokiSDK.commercialBreak().then(function(){ad_show=!1;console.log("Commercial break finished, proceeding to game")})}window.addEventListener("keydown",function(a){["ArrowDown","ArrowUp"," "].includes(a.key)&&ad_show&&a.preventDefault()});window.addEventListener("wheel",function(a){ad_show&&a.preventDefault()},{passive:!1});var Game=function(){return Phaser.Scene.call(this,"game")||this};$jscomp.inherits(Game,Phaser.Scene);

// 全局变量：5分钟时间限制
var gameTimeLimit = 300;
var timeLimitSprite;
var timeText;
var gameTimeEvent;

Game.prototype.create=function(){function a(a,f,b){var B=p.add.sprite(a,f,"obj"+b);p.tweens.add({targets:B,scaleY:0,scaleX:0,duration:150,ease:"Linear",onComplete:function(){B.destroy(!0,!0)}})}function h(a){for(var B=a.length,b,d;B;)d=Math.floor(Math.random()*B--),b=a[B],a[B]=a[d],a[d]=b;return a}function g(){q&&(q.clearTint(),q=null);for(var a=[],f=u.getLength(),b=u.getChildren(),d=0;10>d;d++)for(var c=0;8>c;c++)l[d][c].filled&&a.push(l[d][c].color);h(a);for(d=0;d<f;d++)c=b[d],c.color=a[d],c.setTexture("obj"+
c.color);Q();x()?setTimeout(function(){play_sound("shuffle",p)},200):(console.log("not match"),g())}function v(){var a=u.getLength(),f=u.getChildren(),b=x();if(b){E=b;for(var d=0;d<a;d++){var c=f[d];(c.pos.x===b[0].x&&c.pos.y===b[0].y||c.pos.x===b[1].x&&c.pos.y===b[1].y)&&c.setTint(5233606)}}else alert("err");setTimeout(function(){play_sound("hint",p)},200)}function x(){for(var a=u.getLength(),f=u.getChildren(),b=0;b<a;b++){var d=f[b];a:{var c=d.pos;for(var e=l[c.y][c.x].color,g=0;10>g;g++)for(var k=
0;8>k;k++)if((g!==c.y||k!==c.x)&&l[g][k].filled&&l[g][k].color===e&&R(c,{x:k,y:g})){c={x:k,y:g};break a}c=!1}if(c)return[d.pos,c]}return!1}function G(a){y="drop";for(var B=u.getLength(),b=u.getChildren(),d=0;d<B;d++){var c=b[d],e=l[c.pos.y][c.pos.x];if(0!=e.to.x||0!=e.to.y)c.pos.x+=e.to.x,c.pos.y+=e.to.y,p.tweens.add({targets:c,x:H+z.width*c.pos.x,y:I+z.height*c.pos.y,duration:200,ease:"Linear",onComplete:function(){a--;0===a&&(y="play",Q(),x()||(0<player_data.shuffle_left?(C.setVisible(!0),play_sound("nomatch",
p)):(y="gameover1",setTimeout(S,1E3))))}})}}function Q(){for(var a=0;10>a;a++)for(var f=0;8>f;f++)l[a][f].filled=!1,l[a][f].color=0,l[a][f].to=null;a=u.getLength();f=u.getChildren();for(var b=0;b<a;b++){var d=f[b];l[d.pos.y][d.pos.x].filled=!0;l[d.pos.y][d.pos.x].color=d.color}}function w(a){return Math.PI/180*a}function T(){for(var a=J.getChildren(),f=J.getLength(),b=0;b<f;b++)a[b].setVisible(!1)}function X(a){play_sound("connected",p);T();for(var f=J.getChildren(),b,d,c=0;c<a.length;c++){var e=
f[c];e.setVisible(!0);e.setPosition(H+z.width*a[c].x,I+z.height*a[c].y);0===c?d=a[c].x===a[c+1].x?a[c].y>a[c+1].y?"up":"down":a[c].x>a[c+1].x?"left":"right":c<a.length-1&&(a[c].x===a[c+1].x?a[c].y>a[c+1].y?(d="up","up"===b?e.setFrame(1):"down"!==b&&("left"===b?(e.setFrame(2),e.setRotation(w(180))):"right"===b&&(e.setFrame(2),e.setRotation(w(90))))):(d="down","up"!==b&&("down"===b?e.setFrame(1):"left"===b?(e.setFrame(2),e.setRotation(w(270))):"right"===b&&(e.setFrame(2),e.setRotation(w(0))))):a[c].x>
a[c+1].x?(d="left","up"===b?(e.setFrame(2),e.setRotation(w(0))):"down"===b?(e.setFrame(2),e.setRotation(w(90))):"left"===b&&e.setFrame(1)):(d="right","up"===b?(e.setFrame(2),e.setRotation(w(270))):"down"===b?(e.setFrame(2),e.setRotation(w(180))):"left"!==b&&"right"===b&&e.setFrame(1)));c===a.length-1&&(d=a[c].x===a[c-1].x?a[c].y>a[c-1].y?"up":"down":a[c].x>a[c-1].x?"left":"right",e.setFrame(0));0===e.frame.name?"up"===d?e.setRotation(w(270)):"down"===d?e.setRotation(w(90)):"left"===d?e.setRotation(w(180)):
"right"===d&&e.setRotation(w(0)):1===e.frame.name&&("up"===d||"down"===d?e.setRotation(w(90)):e.setRotation(w(0)));b=d}}function U(a,f){return 0<=a.x&&0<=a.y&&a.x<f[0].length&&a.y<f.length?!0:!1}function F(a,f,b,d,c){for(var e=[],g=1;10>g;g++){var k={x:f.x+a.x*g,y:f.y+a.y*g};if(U(k,d))if(d[k.y][k.x].filled){if(k.x===b.x&&k.y===b.y)return e.push(k),e;break}else if(e.push(k),c)if(1===a.x||-1===a.x){var h=F({x:0,y:-1},k,b,d);if(h){for(b=0;b<h.length;b++)e.push(h[b]);return e}if(k=F({x:0,y:1},k,b,d)){for(b=
0;b<k.length;b++)e.push(k[b]);return e}}else{if(h=F({x:-1,y:0},k,b,d)){for(b=0;b<h.length;b++)e.push(h[b]);return e}if(k=F({x:1,y:0},k,b,d)){for(b=0;b<k.length;b++)e.push(k[b]);return e}}else if(1===a.x||-1===a.x){if(K({x:0,y:1},k,b,d)){for(a=k.y+1;a<b.y+1;a++)e.push({x:k.x,y:a});return e}if(K({x:0,y:-1},k,b,d)){for(a=k.y-1;a>b.y-1;a--)e.push({x:k.x,y:a});return e}}else{if(K({x:1,y:0},k,b,d)){for(a=k.x+1;a<b.x+1;a++)e.push({x:a,y:k.y});return e}if(K({x:-1,y:0},k,b,d)){for(a=k.x-1;a>b.x-1;a--)e.push({x:a,
y:k.y});return e}}}return!1}function K(a,f,b,d){for(var c=1;10>c;c++){var e={x:f.x+a.x*c,y:f.y+a.y*c};if(U(e,d)){if(d[e.y][e.x].filled)return e.x===b.x&&e.y===b.y?!0:!1}else return!1}}function R(a,f){for(var b=JSON.parse(JSON.stringify(l)),d=0;10>d;d++)b[d].unshift({filled:!1}),b[d].push({filled:!1});d=[];for(var c=0;10>c;c++)d.push({filled:!1});b.push(d);b.unshift(d);a.x++;a.y++;f.x++;f.y++;d=[];for(c=0;4>c;c++){var e={x:-1,y:0};1===c?e={x:1,y:0}:2===c?e={x:0,y:-1}:3===c&&(e={x:0,y:1});if(e=F(e,
a,f,b,!0)){var g=[];e.unshift(a);for(var k=0;k<e.length;k++)g.push({x:e[k].x-1,y:e[k].y-1});d.push(g)}}b=null;c=999;for(e=0;e<d.length;e++)d[e].length<c&&(c=d[e].length,b=d[e]);a.x--;a.y--;f.x--;f.y--;return b}function V(){Y.setText(player_data.shuffle_left);Z.setText(player_data.hint_left)}function S(){PokiSDK.gameplayStop();play_sound("gameover",p);player_data.score>best_score&&(best_score=player_data.score,localStorage.setItem("redfoc_onet_best",best_score));for(var a=u.getLength(),f=u.getChildren(),
b=0;10>b;b++)for(var d=0;8>d;d++)if(l[b][d].filled){var c=0;a:for(;c<a;c++){var e=f[c];if(e.pos.x===d&&e.pos.y===b){e.depth=0;break a}}}y="gameover";var overlay=p.add.rectangle(0,0,config.width,config.height,0).setOrigin(0);overlay.alpha=.8;overlay.depth=200;p.add.text(config.width/2,config.height*0.37,"GAMEOVER",{fontFamily:"PoetsenOne",fontSize:Math.floor(45*uiScale),align:"center",color:"#FFFFFF"}).setOrigin(.5).setDepth(201);p.add.text(config.width/2,config.height*0.44,"SCORE: "+player_data.score,{fontFamily:"PoetsenOne",fontSize:Math.floor(32*uiScale),align:"center",color:"#FFFFFF"}).setOrigin(.5).setDepth(201);var restartBtn=draw_button(config.width/2,config.height*0.55,"restart",p);restartBtn.setScale(0.9);restartBtn.depth=201;var menuBtn=draw_button(config.width/2,config.height*0.64,"menu",p);menuBtn.setScale(0.9);menuBtn.depth=201;localStorage.removeItem("redfoc_onet_array");player_data.drop_mode=0;player_data.score=0;last_array=null;localStorage.setItem("redfoc_onet_data",JSON.stringify(player_data))}function W(){var a={arr:l,data:player_data};last_array=JSON.parse(JSON.stringify(l));localStorage.setItem("redfoc_onet_array",JSON.stringify(a))}

// 时间到时的游戏结束函数
function timeUpGameOver(){
    // 停止时间计时器
    if(gameTimeEvent){
        gameTimeEvent.remove();
        gameTimeEvent = null;
    }
    
    y="gameover";
    PokiSDK.gameplayStop();
    play_sound("gameover",p);
    
    // 保存当前分数用于显示
    var finalScore = player_data.score;
    player_data.score>best_score&&(best_score=player_data.score,localStorage.setItem("redfoc_onet_best",best_score));
    
    // 添加半透明黑屏遮罩
    var overlay = p.add.rectangle(0,0,config.width,config.height,0).setOrigin(0);
    overlay.alpha = 0.8;
    overlay.depth = 200;
    
    // 显示时间到结算信息，使用响应式居中布局
    var timeUpText = p.add.text(config.width/2,config.height*0.25,"TIME'S UP!",{fontFamily:"PoetsenOne",fontSize:Math.floor(36*uiScale),align:"center",color:"#FF6B6B"}).setOrigin(.5);
    timeUpText.depth = 201;
    
    var finalScoreLabel = p.add.text(config.width/2,config.height*0.35,"FINAL SCORE",{fontFamily:"PoetsenOne",fontSize:Math.floor(28*uiScale),align:"center",color:"#FFFFFF"}).setOrigin(.5);
    finalScoreLabel.depth = 201;
    
    var scoreText = p.add.text(config.width/2,config.height*0.42,String(finalScore),{fontFamily:"PoetsenOne",fontSize:Math.floor(56*uiScale),align:"center",color:"#FFD93D"}).setOrigin(.5);
    scoreText.depth = 201;
    
    var againBtn = draw_button(config.width/2,config.height*0.52,"restart",p);
    againBtn.setScale(0.9);
    againBtn.depth = 201;
    
    var menuBtn = draw_button(config.width/2,config.height*0.62,"menu",p);
    menuBtn.setScale(0.9);
    menuBtn.depth = 201;
    
    localStorage.removeItem("redfoc_onet_array");
    player_data.drop_mode=0;
    last_array=null;
    // 注意：不在这里清零分数，保持显示的分数不变，等待按钮点击时再清零
}

// 更新时间显示
function updateTimeDisplay(){
    // 如果已经是游戏结束状态，不再更新时间
    if(y === "gameover") return;
    
    var remainingTime = gameTimeLimit - globalGameTimer;
    if(remainingTime <= 0){
        timeUpGameOver();
        return;
    }
    var minutes = Math.floor(remainingTime / 60);
    var seconds = remainingTime % 60;
    timeText.setText((minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds));
}

var N=this;PokiSDK.gameplayStart();

// 移除背景图片，使用纯色背景
this.add.rectangle(config.width/2, config.height/2, config.width, config.height, 0x73cdff);

// 添加响应式 header (顶部)
var headerSprite = this.add.sprite(config.width/2, 0, "header").setOrigin(0.5, 0);
headerSprite.setDisplaySize(config.width, headerSprite.height * (config.width / headerSprite.width));
headerSprite.setDepth(1);

// 添加响应式 footer (底部)  
var footerSprite = this.add.sprite(config.width/2, config.height, "footer").setOrigin(0.5, 1);
footerSprite.setDisplaySize(config.width, footerSprite.height * (config.width / footerSprite.width));
footerSprite.setDepth(1);var y="play",n=0,p=this,E,O=!1,u=this.add.group();this.add.group();var J=this.add.group(),
q=0;

// 计算header和footer的实际高度
var headerHeight = headerSprite.displayHeight;
var footerHeight = footerSprite.displayHeight;

// 计算可用的游戏区域高度 (减去header、footer和UI区域)
var availableHeight = config.height - headerHeight - footerHeight;
var topUIHeight = config.height * 0.15; // 为顶部UI预留15%的高度
var gameAreaHeight = availableHeight - topUIHeight;

// 计算最优的网格尺寸以适配游戏区域
var maxGridWidth = (config.width * 0.9) / 8; // 游戏区域宽度的90%分给8列
var maxGridHeight = gameAreaHeight / 10; // 游戏区域高度分给10行

// 选择较小的值确保网格不超出边界，并添加适当的缩放
var gridSize = Math.min(maxGridWidth, maxGridHeight) * 0.8; // 70%的空间留给obj，30%用作间距
// 添加额外的间距因子
var spacingMultiplier = 1.25; // 增加40%的间距
var z = {width: gridSize * spacingMultiplier, height: gridSize * spacingMultiplier};

// 重新计算游戏区域位置，确保在header和footer之间居中
H = (config.width - 8 * z.width) / 2 + z.width / 2;
// 向上移动obj网格 - 减少Y坐标偏移
var upwardOffset = config.height * 0.15; // 向上移动屏幕高度的15%（从5%增加到15%）
I = headerHeight + topUIHeight + (gameAreaHeight - 10 * z.height) / 2 + z.height / 2 - upwardOffset;

// 计算obj的最佳缩放比例 (假设原始obj图片大小约为64x64像素)
var objScale = gridSize / 64;

l=Array(10),r=[],m=1,t=18+player_data.drop_mode;22<t&&(t=22);console.log("Max: "+t);for(var A=0;40>A;A++)m>t&&(m=1),r.push(m),m++;r=r.concat(r);h(r);m=0;if(last_array)for(l=last_array,r=0;10>r;r++)for(m=0;8>m;m++)l[r][m].filled&&(t=l[r][m].color,A=this.add.sprite(H+z.width*m,I+z.height*r,"obj"+t).setInteractive(),A.color=t,A.piece=!0,A.pos={x:m,y:r},A.setScale(objScale),A.setDepth(10),u.add(A));else for(t=0;10>t;t++){A=[];for(var L=
0;8>L;L++){var P=r[m],aa={color:P,filled:!0},M=this.add.sprite(H+z.width*L,I+z.height*t,"obj"+P).setInteractive();M.color=P;M.piece=!0;M.pos={x:L,y:t};M.setScale(objScale);M.setDepth(10);u.add(M);m++;A.push(aa)}l[t]=A}
// 响应式布局顶部UI元素 - 按要求的顺序排列：time limit、score bar、shuffle button、hint button
var topUIY = config.height * 0.06; // UI元素整体上移，位于屏幕顶部6%的位置
var uiScale = Math.min(config.width / 375, config.height / 812); // 根据屏幕尺寸动态缩放

// 计算响应式X坐标 (基于屏幕宽度的百分比)
var timeLimitX = config.width * 0.165;  // 约14.7% (55/375) 
var scoreBarX = config.width * 0.453;   // 约45.3% (170/375)  
var shuffleBtnX = config.width * 0.727; // 约70.7% (265/375)
var hintBtnX = config.width * 0.860;    // 约85.3% (320/375)

// 1. 时间限制显示 (最左边)
timeLimitSprite = this.add.sprite(timeLimitX,topUIY,"time_limit");
timeLimitSprite.setScale(0.55 * uiScale);
timeLimitSprite.depth = 100;
var remainingTime = gameTimeLimit - globalGameTimer;
var minutes = Math.floor(remainingTime / 60);
var seconds = remainingTime % 60;
timeText = this.add.text(timeLimitX,topUIY,(minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds),{fontFamily:"robotomono",fontSize:Math.floor(24 * uiScale),align:"center",color:"#FFFFFF"}).setOrigin(.5);
timeText.depth = 100;

// 2. 分数条 (左边第二个)
var scoreBarSprite = this.add.sprite(scoreBarX,topUIY,"score_bar");
scoreBarSprite.setScale(0.55 * uiScale);
scoreBarSprite.depth = 100;
var ba=this.add.text(scoreBarX,topUIY,String(player_data.score),{fontFamily:"robotomono",fontSize:Math.floor(26 * uiScale),align:"center",color:"#FFFFFF"}).setOrigin(.5);
ba.depth = 100;

// 3. 洗牌按钮 (右边第二个)
var shuffleBtn=draw_button(shuffleBtnX,topUIY,"shuffle",this);shuffleBtn.setScale(0.55 * uiScale);shuffleBtn.depth = 100;0===player_data.shuffle_left&&(shuffleBtn.alpha=.5);
var shuffleCircle=this.add.sprite(shuffleBtn.x+17*uiScale,shuffleBtn.y+13*uiScale,"circle");shuffleCircle.setScale(0.55 * uiScale);shuffleCircle.depth = 100;
var Y=this.add.text(shuffleCircle.x,shuffleCircle.y,String(player_data.shuffle_left),{fontFamily:"robotomono",fontSize:Math.floor(18 * uiScale),align:"center",color:"#FFFFFF"}).setOrigin(.5);Y.depth = 100;

// 4. 提示按钮 (最右边)
var hintBtn=draw_button(hintBtnX,topUIY,"hint",this);hintBtn.setScale(0.55 * uiScale);hintBtn.depth = 100;0===player_data.hint_left&&(hintBtn.alpha=.5);
var hintCircle=this.add.sprite(hintBtn.x+17*uiScale,hintBtn.y+13*uiScale,"circle");hintCircle.setScale(0.55 * uiScale);hintCircle.depth = 100;
var Z=this.add.text(hintCircle.x,hintCircle.y,String(player_data.hint_left),{fontFamily:"robotomono",fontSize:Math.floor(18 * uiScale),align:"center",color:"#FFFFFF"}).setOrigin(.5);Z.depth = 100;

// 调整选中特效尺寸以适配自适应的emoji对象 (响应式)
var D=this.add.sprite(config.width/2,config.height/2,"sign");D.setScale(objScale);D.setDepth(100);D.setVisible(!1);var C=this.add.sprite(shuffleBtn.x,topUIY+30*uiScale,"arrow");C.setScale(0.55 * uiScale);C.setDepth(100);C.setVisible(!1);this.tweens.add({targets:D,scaleX:objScale * 1.1,scaleY:objScale * 1.1,ease:"Linear",duration:250,yoyo:!0,repeat:-1});this.tweens.add({targets:C,y:C.y+20*uiScale,ease:"Linear",duration:250,yoyo:!0,repeat:-1});for(r=0;25>r;r++)m=this.add.sprite(config.width*0.21,config.height*0.1,"lines"),m.setScale(0.5 * uiScale),m.setDepth(100),m.setVisible(!1),J.add(m);

// 添加时间事件
gameTimeEvent = this.time.addEvent({delay:1000,callback:function(){
    globalGameTimer++;
    updateTimeDisplay();
},loop:!0});

this.input.keyboard.on("keydown",function(a,f){O=a.key});this.input.keyboard.on("keyup",function(a,f){O=!1});this.input.on("gameobjectdown",function(h,f){if(ad_show)return!1;if("z"===O)l[f.pos.y][f.pos.x].filled=!1,f.destroy(!0,!0);else if(f.button)play_sound("click",N),N.tweens.add({targets:f,scaleX:.9,scaleY:.9,yoyo:!0,ease:"Linear",duration:100,onComplete:function(){"play"===y&&("hint"===f.name?0<player_data.hint_left&&(player_data.hint_left--,V(),v(),0===player_data.hint_left&&(f.alpha=.5)):"shuffle"===f.name&&0<player_data.shuffle_left&&(C.visible&&C.setVisible(!1),player_data.shuffle_left--,V(),g(),0===player_data.shuffle_left&&(f.alpha=.5)));"next"===f.name||"bonus"===y&&"next"===f.name?(show_ad(),p.scene.start("game")):"restart"===f.name?(show_ad(),globalGameTimer=0,player_data.drop_mode=0,player_data.score=0,localStorage.setItem("redfoc_onet_data",JSON.stringify(player_data)),p.scene.start("game")):"menu"===f.name&&(show_ad(),globalGameTimer=0,player_data.score=0,localStorage.setItem("redfoc_onet_data",JSON.stringify(player_data)),PokiSDK.gameplayStop(),p.scene.start("menu"))}},N);else if(f.piece){if(E){h=u.getLength();for(var b=u.getChildren(),d=0;d<h;d++){var c=b[d];(c.pos.x===E[0].x&&c.pos.y===E[0].y||c.pos.x===E[1].x&&c.pos.y===E[1].y)&&c.clearTint()}E=null}q?"play"===y&&(play_sound("itemclick",p),f.pos.x!=q.pos.x||f.pos.y!=q.pos.y)&&(f.setTint(5233606),l[f.pos.y][f.pos.x].color===l[q.pos.y][q.pos.x].color?(h=R(q.pos,f.pos))?(player_data.score+=2,ba.setText(player_data.score),y="wait1",D.setVisible(!1),X(h),l[f.pos.y][f.pos.x].filled=!1,l[q.pos.y][q.pos.x].filled=!1,setTimeout(function(){y="wait";a(f.x,f.y,f.color);a(q.x,q.y,q.color);f.destroy(!0,!0);q.destroy(!0,!0);q=null;setTimeout(function(){if(1===player_data.drop_mode)var a="down";else if(2===player_data.drop_mode)a="up";else if(3===player_data.drop_mode)a="left";else if(4===player_data.drop_mode)a="right";else if(5===player_data.drop_mode)0===n?a="down":1===n&&(a="up"),n++,1<n&&(n=0);else if(6===player_data.drop_mode)0===n?a="left":1===n&&(a="right"),n++,1<n&&(n=0);else if(7===player_data.drop_mode)0===n?a="up":1===n&&(a="right"),n++,1<n&&(n=0);else if(8===player_data.drop_mode)0===n?a="down":1===n&&(a="left"),n++,1<n&&(n=0);else if(9===player_data.drop_mode)0===n?a="up":1===n?a="right":2===n?a="down":3===n&&(a="left"),n++,3<n&&(n=0);else if(9<player_data.drop_mode){var b=Math.floor(4*Math.random());0===b?a="up":1===b?a="right":2===b?a="down":3===b&&(a="left")}b=a;a=0;if("down"===b)for(b=0;8>b;b++)for(var c=0,d=9;0<=d;d--)l[d][b].filled?(0!=c&&a++,l[d][b].to={x:0,y:c}):c++;else if("up"===b)for(b=0;8>b;b++)for(d=c=0;10>d;d++)l[d][b].filled?(0!=c&&a++,l[d][b].to={x:0,y:c}):c--;else if("left"===b)for(b=0;10>b;b++)for(d=c=0;8>d;d++)l[b][d].filled?(0!=c&&a++,l[b][d].to={x:c,y:0}):c--;else if("right"===b)for(b=0;10>b;b++)for(c=0,d=7;0<=d;d--)l[b][d].filled?(0!=c&&a++,l[b][d].to={x:c,y:0}):c++;if(a){b=u.getLength();c=u.getChildren();for(var f=d=0;10>f;f++)for(var g=0;8>g;g++)if(l[f][g].filled){d++;var h=0;a:for(;h<b;h++){var m=c[h];if(m.pos.x===g&&m.pos.y===f){m.depth=d;break a}}}G(a)}else if(y="play",!x()){a:{for(a=0;10>a;a++)for(b=0;8>b;b++)if(l[a][b].filled){a=!1;break a}a=!0}a?(PokiSDK.happyTime(.8),PokiSDK.gameplayStop(),play_sound("completed",p),y="bonus",a="hint",1===Math.floor(2*Math.random())&&(a="shuffle"),"hint"===a?player_data.hint_left++:"shuffle"===a&&player_data.shuffle_left++,p.add.rectangle(0,0,config.width,config.height,0).setOrigin(0).setAlpha(.8).setDepth(200),p.add.text(config.width/2,config.height*0.31,"COMPLETED",{fontFamily:"PoetsenOne",fontSize:Math.floor(45*uiScale),align:"center",color:"#FFFFFF"}).setOrigin(.5).setDepth(201),p.add.sprite(config.width/2,config.height*0.43,a+"_icon").setScale(uiScale).setDepth(201),p.add.text(config.width/2,config.height*0.55,"+1",{fontFamily:"PoetsenOne",fontSize:Math.floor(52*uiScale),align:"center",color:"#FFFFFF"}).setOrigin(.5).setDepth(201),(function(){var btn=draw_button(config.width/2,config.height*0.67,"next",p);btn.setScale(0.9);btn.depth=201;return btn})(),last_array=null,player_data.drop_mode++,l=null,W()):0<player_data.shuffle_left?(C.setVisible(!0),play_sound("nomatch",p)):(y="gameover1",setTimeout(S,1E3))}W()},100);T()},300)):(q.clearTint(),q=f,D.setPosition(f.x,f.y)):(q.clearTint(),q=f,D.setPosition(f.x,f.y))):"play"===y&&(play_sound("itemclick",p),q=f,f.setTint(5233606),D.setVisible(!0),D.setPosition(f.x,f.y))}},this);x()||last_array||this.scene.start("game")};

function play_sound(a,h){game_data.sound&&!ad_show&&h.sound.play(a)}function switch_audio(a){game_data[a.name]?(game_data[a.name]=!1,a.setTexture("btn_sound_off")):(game_data[a.name]=!0,a.setTexture("btn_sound_on"))}function check_audio(a){game_data[a.name]?a.setTexture("btn_sound_on"):a.setTexture("btn_sound_off")}function draw_button(a,h,g,v){a=v.add.sprite(a,h,"btn_"+g).setInteractive();a.button=!0;a.name=g;return a}
// 响应式游戏配置
function getGameConfig() {
	const screenWidth = window.innerWidth;
	const screenHeight = window.innerHeight;
	const aspectRatio = screenWidth / screenHeight;
	
	// 检测设备类型
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);
	
	// 基础尺寸设定
	let gameWidth, gameHeight;
	
	if (isMobile && !isTablet) {
		// 手机端适配
		gameWidth = screenWidth;
		gameHeight = screenHeight;
	} else if (isTablet) {
		// 平板适配
		gameWidth = Math.min(screenWidth * 0.8, 600);
		gameHeight = Math.min(screenHeight * 0.9, 900);
	} else {
		// 桌面端适配 - 使用更大的固定尺寸
		gameWidth = 800;
		gameHeight = 1200;
	}
	
	// 确保最小尺寸
	gameWidth = Math.max(gameWidth, 320);
	gameHeight = Math.max(gameHeight, 568);
	
	// 确保比例合理
	if (gameHeight / gameWidth < 1.4) {
		gameHeight = gameWidth * 1.6;
	}
	if (gameHeight / gameWidth > 2.5) {
		gameHeight = gameWidth * 2.2;
	}
	
	return {
		type: Phaser.AUTO,
		width: gameWidth,
		height: gameHeight,
		scale: {
			mode: Phaser.Scale.FIT,
			parent: "game_content",
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: gameWidth,
			height: gameHeight
		},
		input: {
			// 支持触摸和鼠标
			mouse: true,
			touch: true,
			smoothFactor: 0.2
		},
		scene: [Boot, Load, Menu, Game]
	};
}

var config = getGameConfig(), game;PokiSDK.init().then(function(){console.log("Poki SDK successfully initialized");game=new Phaser.Game(config);window.game=game;}).catch(function(){console.log("Initialized, but the user likely has adblock");game=new Phaser.Game(config);window.game=game;});PokiSDK.setDebug(!1); 