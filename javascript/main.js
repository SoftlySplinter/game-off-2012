var gamejs = require('gamejs');
var hudjs = require('./hud');
var scorejs = require('./score');
var playerjs = require('./player');
var inputjs = require('./input');
var mapjs = require('./map');

var fpsFont = new gamejs.font.Font('10px Sans-serif');
var gameMode = 0;

gamejs.preload([
]);

gamejs.ready(function () {
    var display = gamejs.display.setMode([600, 400]);
    var hud = new hudjs.HUD([600, 20]);
    var score = new scorejs.Score(600, 20);
    var map = new mapjs.Map([600,400]);
    var player = new playerjs.Player(400 - 40, map);
    var input = new inputjs.Input(player.handleEvent, player);
    var progress = 0

    function tick(msDuration) {
        display.clear();
        hud.draw(display, msDuration);
        score.draw(display, progress);
        map.draw(display);
        player.draw(display);        
        return;
    }

    function prog(msDuration) {
        map.update();
        player.update();
        progress++;
        return;
    }

    gamejs.time.fpsCallback(tick, this, 60);
    gamejs.time.fpsCallback(prog, this, 20);
    gamejs.time.fpsCallback(input.handleEvents, this, 25);
});
