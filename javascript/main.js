var gamejs = require('gamejs');
var hudjs = require('./hud');
var scorejs = require('./score');

var fpsFont = new gamejs.font.Font('10px Sans-serif');
var gameMode = 0;

gamejs.preload([
]);

gamejs.ready(function () {
    var display = gamejs.display.setMode([600, 400]);
    var hud = new hudjs.HUD([600, 20]);
    var score = new scorejs.Score(600, 20);
    var progress = 0

    function tick(msDuration) {
        display.clear();
        hud.draw(display, msDuration);
        score.draw(display, progress);
        gamejs.draw.circle(display, '#000000',[10,10], 3);
        return;
    }

    function prog(msDuration) {
        progress++;
        return;
    }

    gamejs.time.fpsCallback(tick, this, 60);
    gamejs.time.fpsCallback(prog, this, 20);
});
