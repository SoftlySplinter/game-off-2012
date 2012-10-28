var gamejs = require('gamejs');

var Branch = function(maxY, master) {
    this.master = master;
    this.y = this.master.y;
    this.x = 25;
    this.prevY = this.master.prevY;
    this.prevYs = this.master.prevYs.slice(0, this.x/3 - 1);
    this.width = 4;
    this.maxY = maxY - 48;
    this.aim = Math.floor(Math.random() * this.maxY);

    this.calcAim = function() {
       
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


        this.prevYs.push(this.prevY);
        if(this.prevYs.length > this.x / 3 + 1) {
            this.prevYs.shift();
        }
        this.prevY = this.y;
    };

    this.draw = function(surface) {
        gamejs.draw.circle(surface, '#f00', [this.x, 48 + this.y], this.width);

        for(var i = 0; i < this.x; i += 3) {
            gamejs.draw.line(surface, '#f00', [i-3, 48 + this.prevYs[(i-3)/3]], [i, 48 + this.prevYs[i/3]], 3);
        }

        gamejs.draw.circle(surface, '#fff', [this.x, 48 + this.y], this.width + 1, 2);
    };
};

exports.Branch = Branch;
