(function(window) {
    "use strict";

    function Alien(cg, resources, x, y, moveX, moveY) {
        Obclient.call(this, cg);
        this.x = x;
        this.y = y;
        this.moveX = moveX;
        this.moveY = moveY;
        this.size = 36;
        var index = Math.floor((Math.random() * resources.length));
        this.resource = resource.get(resources[index]);
        this.state = {
            start: false,
        };
    }

    Obclient.extend(Alien);

    Alien.store = new Object();

    Alien.prototype.onMount = function() {
        Alien.store[this.id] = this;
    };

    Alien.prototype.update = function(timestamp) {
        this.cg.clearRect(this.x - 2, this.y - 2, this.size+4);
        this.x = this.x + this.moveX;
        this.y = this.y + this.moveY;
        this.cg.renderImage(this.resource, this.size, this.x, this.y);
        if (this.y >= (window.screen.availHeight)) {
            this.destruct();
        }
        this.state.start || (this.state.start = timestamp);
        if (this.state.start && timestamp - this.state.start > 1000) {
            var bullet = new Bullet(
                this.cg,
                this.x + 18,
                this.y + 36
            );
            window.store.observer.attach(bullet);
            Bullet.pushAlien(bullet);
            this.state.start = false;
        }
    };

    Alien.prototype.destruct = function() {
        Obclient.prototype.destruct.apply(this);
        this.cg.clearRect(this.x, this.y, this.size);
        delete Alien.store[this.id];
    };

    window.Alien = Alien;
})(window);
