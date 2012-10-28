var gamejs = require('gamejs');

var Player = function(maxY) {
    this.y = 0;
    this.x = 20;
    this.width = 4;
    this.maxY = maxY - 48;


    this.handleEvent = function(e) {
        if(e.type === gamejs.event.KEY_DOWN) {
            if(e.key === gamejs.event.K_UP) {
                if(this.y > 0) {
                    this.y-=3;
                }
            }
            if(e.key === gamejs.event.K_DOWN) {
                if(this.y < this.maxY) {
                    this.y+=3;
                }
            }
        }
    };

    this.draw = function(surface) {
         gamejs.draw.circle(surface, '#000', [this.x, 48 + this.y], this.width);
         gamejs.draw.line(surface, '#000', [0, 48 + this.y], [this.x - this.width - 2, 48 +this.y], 2);
    };
};

exports.Player = Player;
