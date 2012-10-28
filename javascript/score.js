var gamejs = require('gamejs');
var Score = function(xSize, yOff) {
    this.xSize = xSize;
    this.ySize = 20;
    this.scoreSurf = new gamejs.Surface(this.xSize, this.ySize);
    this.progress = 0;
    this.score = 0;
    this.yOff = yOff;
    this.font = new gamejs.font.Font('10px Sans-serif');

    this.renderScore = function() {
        this.scoreSurf.fill('#333');
        var drawX = 0;
        for(;drawX < this.xSize + 100; drawX++) {
            if((drawX + this.progress) % 100 === 0) {
                var curScore = this.font.render(Math.floor((drawX + this.progress)/10), '#fff');
                this.scoreSurf.blit(curScore, [drawX - curScore.getSize()[0], this.ySize / 2 - curScore.getSize()[1] / 2]);
            }
        }
    }

    this.draw = function(surface, progress) {
        if(this.progress != progress) {
            this.progress = progress
            this.score = this.progress/10;
            this.renderScore();
        }

        surface.blit(this.scoreSurf, [0, this.yOff]);
    }
}

exports.Score = Score;
