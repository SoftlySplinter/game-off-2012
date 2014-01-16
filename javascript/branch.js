var gamejs = require('gamejs');

var SPEED = 2;

var Branch = function(maxY, prevYs, master) {
    this.master = master;
    this.y = this.master.y;
    this.x = 50;
    this.curX = 50
    this.prevY = this.y;
    this.prevYs = prevYs.slice(0);
    this.width = 4;
    this.maxY = maxY - 48;
    this.aim = Math.floor(Math.random() * this.maxY);
    this.merging = false;

    this.calcAim = function() {
        if(this.merging) {
            this.aim = this.master.y;
        } else {
            if(Math.floor(Math.random() * 50) == 25) {
                this.aim = Math.floor(Math.random() * this.maxY);
            }
        }
    };

    this.update = function() {
        this.calcAim();

        if(this.y !== this.aim) {
            if(this.aim - this.y > 0) {
                this.y += this.aim - this.y < SPEED ? this.aim - this.y : SPEED;
            } else {
                this.y -= SPEED;
            }
        }

        if(this.merging && this.y === this.aim) {
            // Remove thyself.
            this.master.branches.splice(this.master.branches.indexOf(this), 1);
            return;
        }

        if(this.curX - SPEED > 0 && !this.merging) {
            this.curX -= SPEED;
        }

        this.prevYs.push(this.prevY);
        if(this.prevYs.length > this.x / SPEED + 1 ) {
            this.prevYs.shift();
        }
        this.prevY = this.y;
    };

    this.draw = function(surface) {
        gamejs.draw.circle(surface, '#f00', [this.x, 48 + this.y], this.width);
       
        for(var i = 0; i < this.x; i += SPEED) {
            gamejs.draw.line(surface, '#f00', 
                             [i-SPEED, 48 + this.prevYs[(i-SPEED)/SPEED]], 
                             [i, 48 + this.prevYs[i/SPEED]], 
                             3);
        }

        gamejs.draw.circle(surface, '#fff', [this.x, 48 + this.y], this.width + 1, 2);
    };
};

exports.Branch = Branch;
