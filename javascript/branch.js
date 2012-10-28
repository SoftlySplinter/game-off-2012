var gamejs = require('gamejs');

var Branch = function(maxY, master) {
    this.master = master;
    this.y = this.master.y;
    this.x = 50;
    this.curX = 50
    this.prevY = this.y;
    this.prevYs = [];
    this.width = 4;
    this.maxY = maxY - 48;
    this.aim = Math.floor(Math.random() * this.maxY);
    this.merging = false;

    this.calcAim = function() {
        if(this.merging) {
            this.aim = this.master.y;
        }
    };

    this.update = function() {
        this.calcAim();

        if(this.y !== this.aim) {
            if(this.aim - this.y > 0) {
                this.y += this.aim - this.y < 3 ? this.aim - this.y : 3;
            } else {
                this.y -= 3;
            }
        }

        if(this.merging && this.y === this.aim) {
            // Remove thyself.
            this.master.branches.splice(this.master.branches.indexOf(this), 1);
            return;
        }

        if(this.curX - 3 > 0 && !this.merging) {
            this.curX -=3;
        }
    };

    this.draw = function(surface) {
        gamejs.draw.circle(surface, '#f00', [this.x, 48 + this.y], this.width);
       
        gamejs.draw.line(surface, '#f00', [this.curX, 48 + this.master.prevYs[Math.floor(this.curX/3)]], [this.curX, 48 + this.y], 3)
        gamejs.draw.line(surface, '#f00', [this.curX, 48 + this.y], [this.x, 48 + this.y], 3);

        gamejs.draw.circle(surface, '#fff', [this.x, 48 + this.y], this.width + 1, 2);
    };
};

exports.Branch = Branch;
