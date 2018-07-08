(function(window) {
    "use strict";

    function Blood(line) {
        line.total = 100;
        this.line = line;
    }

    Blood.prototype.isEmpty = function() {
        if (this.line.total <= 0) {
            return true;
        }
        return false;
    };

    Blood.prototype.cut = function(number) {
        this.line.total = this.line.total - 5;
        this.line.style.width = this.line.total + '%';
    };

    window.Blood = Blood;
}(window));