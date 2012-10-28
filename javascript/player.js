var gamejs = require('gamejs');

var Player = function(maxY) {
    this.y = 0;
    this.x = 20;
    this.prevY = 0;
    this.prevYs = [0,0,0,0,0,0,0];
    this.width = 4;
    this.maxY = maxY - 48;

    this.up = false;
    this.down = false;

    this.handleEvent = function(e) {
        if(e.type === gamejs.event.KEY_DOWN) {
            if(e.key === gamejs.event.K_UP) {
                this.up = true;
            }
            if(e.key === gamejs.event.K_DOWN) {
                this.down = true;
            }
        }

        if(e.type === gamejs.event.KEY_UP) {
            if(e.key === gamejs.event.K_UP) {
                this.up = false;
            }
            if(e.key === gamejs.event.K_DOWN) {
                this.down = false;
            }
        }

    };

    this.update = function() {
        if(this.up) {
            if(this.y > 0) {
                this.y-=3;
            }
        }

        if(this.down) {
            if(this.y < this.maxY) {
                this.y+=3;
            }
        }

        this.prevYs.push(this.prevY);
        if(this.prevYs.length > 7) {
            this.prevYs.shift();
        }
        this.prevY = this.y;
    };

    this.draw = function(surface) {

        gamejs.draw.circle(surface, '#000', [this.x, 48 + this.y], this.width);

        for(var i = 0; i < this.x; i += 3) {
            gamejs.draw.line(surface, '#000', [i-3, 48 + this.prevYs[(i-3)/3]], [i, 48 + this.prevYs[i/3]], 3);
        }

        gamejs.draw.circle(surface, '#fff', [this.x, 48 + this.y], this.width + 1, 2);
//        gamejs.draw.line(surface, '#000', [0, 48 + this.y], [this.x - this.width - 2, 48 +this.y], 2);
    };
};

exports.Player = Player;
