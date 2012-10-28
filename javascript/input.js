var gamejs = require('gamejs');

var Input = function(callback, obj) {
    this.callback = callback;
    this.obj = obj;

    this.handleEvents = function() {
        gamejs.event.get().forEach(callback, obj);
    }
};

exports.Input = Input;
