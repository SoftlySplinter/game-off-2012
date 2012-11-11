var gamejs = require('gamejs');
var branchjs = require('./branch');

var Player = function(maxY, map) {
    // Current X and Y locations
    this.y = 0;
    this.x = 50;

    // Store the previous Y values for drawing.
    this.prevY = 0;
    this.prevYs = [0,0,0,0,0,0,0];

    // Width of the path
    this.width = 4;

    // Process the MaxY value with magic number
    // FIXME this will lead to problems.
    this.maxY = maxY - 48;

    // The current Map.
    this.map = map;

    // The branches this player has made
    this.branches = [];

    // Store values of key presses so that a held key won't be lost when another is pressed.
    this.up = false;
    this.down = false;
    this.w = false;
    this.s = false;

    // Set the key-press flags or fire off other events.
    this.handleEvent = function(e) {
        // On key down.
        if(e.type === gamejs.event.KEY_DOWN) {
            if(e.key === gamejs.event.K_UP) {
                this.up = true;
            }
            if(e.key === gamejs.event.K_w) {
                this.w = true;
            }
            if(e.key === gamejs.event.K_DOWN) {
                this.down = true;
            }
            if(e.key === gamejs.event.K_s) {
                this.s = true;
            }
            if(e.key === gamejs.event.K_b) {
                // Branching
                var branch = new branchjs.Branch(this.maxY, this);
                this.branches.push(branch);
            }
            if(e.key === gamejs.event.K_m) {
                // Merging
                this.branches[this.branches.length - 1].merging = true;
            }
            if(e.key === gamejs.event.K_SPACE) {
                // Shoot
                this.fireShot();
            }
        }

        // Key up, used to unset the key-press flags
        if(e.type === gamejs.event.KEY_UP) {
            if(e.key === gamejs.event.K_UP) {
                this.up = false;
            }
            if(e.key === gamejs.event.K_w) {
                this.w = false;
            }
            if(e.key === gamejs.event.K_DOWN) {
                this.down = false;
            }
            if(e.key === gamejs.event.K_s) {
                this.s = false;
            }
        }

    };

    // Fire a shot
    this.fireShot = function() {
        this.map.fireShot([this.x,this.y], 1);
    }

    // Update the map
    this.update = function() {
        // Register up and w together.
        if(this.up || this.w) {
            if(this.y > 0) {
                this.y-=3;
            }
        }

        // Register down and s together.
        if(this.down || this.s) {
            if(this.y < this.maxY) {
                this.y+=3;
            }
        }

        // Push to the previous Y values and remove one if it's reached the maximum.
        this.prevYs.push(this.prevY);
        if(this.prevYs.length > this.x / 3 + 1 ) {
            this.prevYs.shift();
        }
        this.prevY = this.y;

        // Update all branches.
        this.branches.forEach(function(branch) {
            branch.update();
        });
    };

    // Draw onto a surface
    this.draw = function(surface) {
        // Render branches first
        this.branches.forEach(function(branch) {
            branch.draw(surface);
        });

        // Render the player.
        gamejs.draw.circle(surface, '#000', [this.x, 48 + this.y], this.width);

        // Render the previous path
        for(var i = 0; i < this.x; i += 3) {
            gamejs.draw.line(surface, '#000', [i-3, 48 + this.prevYs[(i-3)/3]], [i, 48 + this.prevYs[i/3]], 3);
        }

        // Draw a white circle around the player. This makes it look a bit more like the git network graph.
        gamejs.draw.circle(surface, '#fff', [this.x, 48 + this.y], this.width + 1, 2);

    };
};

exports.Player = Player;
