var gamejs = require('gamejs');

var Shot = function(loc, dir) {
    this.loc = loc;
    this.dir = dir;
    this.speed = 3;

    this.update = function() {
        this.loc[0] += this.speed * this.dir;
    };

    this.draw = function(surface) {
        gamejs.draw.line(surface, '#000', [loc[0],48 + loc[1]], [loc[0] + 5, 48 + loc[1]], 3);
    };

    this.isOffScreen = function(size) {
        return (loc[0] < 0 || loc[0] > size[1]) || (loc[1] < 0 || loc[1] > size[1]);
    };
}

var Map = function(size) {
    this.shots = []
    this.size = size;

    this.fireShot = function(origin, dir) {
        this.shots.push(new Shot(origin, dir));
    };

    this.update = function() {
        for(var i = 0; i < this.shots.length; i++) {
            this.shots[i].update();
            
            if(this.shots[i].isOffScreen(this.size)) {
                this.shots.slice(i,1);
            }
        }
    };

    this.draw = function(surface) {
        this.shots.forEach(function(shot) {
            shot.draw(surface);
        });
    }
};

exports.Map = Map;
