var gamejs = require('gamejs');
var branchjs = require('./branch');

var SPEED = 3;

var Player = function(maxY) {
    this.y = 0;
    this.x = 50;
    this.prevY = 0;
    this.prevYs = [0,0,0,0,0,0,0];
    this.width = 4;
    this.maxY = maxY - 48;

    this.branches = [];

    this.up = false;
    this.down = false;

    this.handleEvent = function(e) {
        switch(e.type) {
        case gamejs.event.KEY_DOWN:
            switch(e.key) {
            case gamejs.event.K_UP:
            case gamejs.event.K_w:
                this.up = true;
                break;
            case gamejs.event.K_DOWN:
            case gamejs.event.K_s:
                this.down = true;
                break;
            }
            break;
        case gamejs.event.KEY_UP:
            switch(e.key) {
            case gamejs.event.K_UP:
            case gamejs.event.K_w:
                this.up = false;
                break;
            case gamejs.event.K_DOWN:
            case gamejs.event.K_s:
                this.down = false;
                break;
            case gamejs.event.K_b:
                var branch = new branchjs.Branch(this.maxY, this.prevYs, this);
                this.branches.push(branch);
                break;
            case gamejs.event.K_m:
                this.branches[this.branches.length - 1].merging = true;
                break;
            }
            break;
        }
    };

    this.update = function() {
        if(this.up) {
            if(this.y > 0) {
                this.y -= SPEED;
            }
        }

        if(this.down) {
            if(this.y < this.maxY) {
                this.y += SPEED;
            }
        }

        this.prevYs.push(this.prevY);
        if(this.prevYs.length > this.x / SPEED + 1 ) {
            this.prevYs.shift();
        }
        this.prevY = this.y;

        this.branches.forEach(function(branch) {
            branch.update();
        });
    };

    this.draw = function(surface) {
        this.branches.forEach(function(branch) {
            branch.draw(surface);
        });

        gamejs.draw.circle(surface, '#000', [this.x, 48 + this.y], this.width);

        for(var i = 0; i < this.x; i += SPEED) {
            gamejs.draw.line(surface, '#000', 
                             [i-SPEED, 48 + this.prevYs[(i-SPEED)/SPEED]], 
                             [i, 48 + this.prevYs[i/SPEED]], 
                             3);
        }

        gamejs.draw.circle(surface, '#fff', [this.x, 48 + this.y], this.width + 1, 2);

    };
};

exports.Player = Player;
