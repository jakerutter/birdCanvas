


function fly() {
    var stage = document.getElementById('secondCanvas');
    var ctx = stage.getContext('2d');

// document.body.appendChild(stage);

window.onresize = function(){
    stage.width = window.innerWidth;
    stage.height = window.innerHeight;
    stage.ratio = stage.width < stage.height ? stage.width : stage.height;
};
window.onresize();

var mouse = {
    x: 0,
    y: 0,
    isDown: false
};

document.onmousedown = document.onmousemove = function(e){
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    mouse.down = !!e.which;
};


var amplitude1 = 0.9;
var amplitude2 = 1.15;

var amplitude1Offset = 0.2;
var amplitude2Offset = 0.2;



var angle1 = 0;
var angle2 = angle1 + 0.1 * Math.PI;
var angle3 = 0;

var time = 0;
var speed = 0.1;

function drawPoint(x, y) {
    ctx.moveTo(x + 5, y);
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
}

function update() {
    ctx.clearRect(0, 0, stage.width, stage.height);

    var radius1 = stage.ratio / 4; // 125;
    var radius2 = stage.ratio / 2; // 200;
    var radius3 = stage.ratio / 10; // 20;

    var x1 = radius1 * Math.cos(angle1);
    var y1 = radius1 * Math.sin(angle1);
    var x2 = radius2 * Math.cos(angle2);
    var y2 = radius2 * Math.sin(angle2);
    
    var offset = radius3 * Math.sin(angle3);

    ctx.save();
    ctx.translate(stage.width / 2, (stage.height / 2) + offset);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(x1, y1, x2, y2);
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-x1, y1, -x2, y2);

    if (mouse.down) {
        drawPoint(0, 0);
        drawPoint(x1, y1);
        drawPoint(x2, y2);
        drawPoint(-x1, y1);
        drawPoint(-x2, y2);

        ctx.moveTo(0, 0);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.moveTo(0, 0);
        ctx.lineTo(-x1, y1);
        ctx.lineTo(-x2, y2);
    }

    ctx.stroke();
    ctx.restore();

    var speed = (0.1 * mouse.x / stage.width) || 0.01;
    angle1 = Math.cos(time) + amplitude1Offset;
    angle2 = amplitude2 * Math.cos(time - 0.2 * Math.PI) + amplitude2Offset;
    angle3 = Math.cos(time + 0.6 * Math.PI);
    time += speed;
}

(function loopy(){
    update();
    setTimeout(loopy, 10);
}());
};

