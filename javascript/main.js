var gamejs = require('gamejs');

var fpsFont = new gamejs.font.Font('10px Sans-serif');
var gameMode = 0;

gamejs.preload([
]);

function renderFPS(msDuration, surface) {
    var fpsCalc = Math.ceil(1000 / msDuration);
    var fpsText = fpsFont.render(fpsCalc + ' FPS');

    var x1 = surface.getSize()[0] - fpsText.getSize()[0];
    var x2 = x1 + fpsText.getSize()[0];
    var y1 = 0;
    var y2 = y1 + fpsText.getSize()[1];

    gamejs.draw.line(surface, '#000000', [0,y2], [surface.getSize()[0], y2]);
    surface.blit(fpsText, [x1 ,y1]);
}

gamejs.ready(function () {
    var display = gamejs.display.setMode([600, 400]);


    function tick(msDuration) {
        display.clear();
        gamejs.draw.circle(display, '#000000',[10,10], 3);
        renderFPS(msDuration, display);
        return;
    }
    gamejs.time.fpsCallback(tick, this, 60);
});
