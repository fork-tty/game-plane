(function(window) {
    "use strict";

    function Actions(cg) {
        Obclient.call(this, cg);
        this.start = false;
    }
    Obclient.extend(Actions);

    Actions.prototype.update = function(timestamp) {
        this.start || (this.start = timestamp);
        if (this.start && timestamp - this.start > 1500) {

            var sign = 1;
            var random = Math.random();
            var x = Math.floor((random * window.screen.availWidth));
            if (x > window.screen.availWidth / 2) {
                sign = -1;
            }
            var moveX = Math.floor(Math.random() * 2);
            var moveY = Math.floor(Math.random() * 4);
            moveX = moveX ? moveX : 1
            moveY = moveY ? moveY : 1;
            moveX = moveX * sign;

            var alien = new Alien(this.cg, [
                'alien1', 'alien2', 'alien3'
            ], x, 0, moveX, moveY);
            window.store.observer.attach(alien);
            this.start = false;
        }
    };

    Actions.prototype.destruct = function() {
        Obclient.prototype.destruct.apply(this);
        this.cg.clearRect(this.x, this.y, this.size);
        this.start = false;
    };

    window.Actions = Actions;
})(window);
