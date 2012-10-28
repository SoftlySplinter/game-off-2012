var gamejs = require('gamejs');

var HUD = function(size) {
    this.size = size;
    this.height = 20;
    this.hudSurface = new gamejs.Surface(this.size[0], this.height);
    this.fpsSurface = null;
    this.fps = -1
    this.font = new gamejs.font.Font('10px Sans-serif');

    this.draw = function(surface, msDuration) {
        // FPS calculation
        this.fps = Math.ceil(1000 / msDuration);
        this.fpsSurface = this.font.render(this.fps + 'FPS', '#fff');

        // HUD Surface Rendering
        this.hudSurface.fill('#111');
        this.hudSurface.blit(this.fpsSurface, [ this.size[0] - this.fpsSurface.getSize()[0] - 2, this.height/2 - this.fpsSurface.getSize()[1]/2]);

        // Render HUD Surface -> Main Surface
        surface.blit(this.hudSurface);
    };
}

exports.HUD = HUD;
