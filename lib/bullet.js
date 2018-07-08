(function(window) {
    "use strict";

    function Bullet(cg, x, y) {
        Obclient.call(this, cg);
        this.x = x;
        this.y = y;
        this.size = 10;
        this.type = false;
        this.resource = resource.get('bullet');
        this.boomImage = resource.get('boom');
    }

    Obclient.extend(Bullet);

    Bullet.store = {
        heros: {},
        aliens: {}
    };

    Bullet.pushHero = function(bullet) {
        bullet.type = 'heros';
        Bullet.store.heros[bullet.id] = bullet;
    };

    Bullet.pushAlien = function(bullet) {
        bullet.type = 'aliens';
        Bullet.store.aliens[bullet.id] = bullet;
    };

    Bullet.prototype.update = function(timestamp) {
        this.cg.clearRect(this.x, this.y, this.size);
        if (this.type == 'heros') {
            this.y = this.y - 3;
            this.aliensMatch();
        } else if (this.type == 'aliens') {
            this.y = this.y + 4;
            this.herosMatch();
        }
        this.cg.renderImage(this.resource, this.size, this.x, this.y);
        if (this.y < 5) {
            this.destruct();
        }
    };

    Bullet.prototype.herosMatch = function() {
        var plane = window.store.plane;
        var swapA = this.y+this.size/2;
        var swapB = this.x+this.size/2;
        var a = Math.abs(swapA - (plane.y + plane.size/2));
        var b = Math.abs(swapB - (plane.x + plane.size/2));
        var c = Math.sqrt(a * a + b * b);
        if (c <= 32) {
            // console.log(plane);
            plane.onBeenShot();
            this.destruct();
            window.store.observer.attach(new Boom(this.cg, this.x - this.size, this.y - this.size));
        }
    };

    Bullet.prototype.aliensMatch = function() {
        var swapA = this.y+this.size/2;
        var swapB = this.x+this.size/2;
        for (var i in Alien.store) {
            var alien = Alien.store[i];
            var a = Math.abs(swapA - (alien.y + alien.size/2));
            var b = Math.abs(swapB - (alien.x + alien.size/2));
            var c = Math.sqrt(a * a + b * b);
            if (c <= 32) {
                window.store.score = window.store.score + 1;
                alien.destruct();
                this.destruct();
                window.store.observer.attach(new Boom(this.cg, this.x - this.size, this.y - this.size));
            }
        }
    };

    Bullet.prototype.boom = function() {
        this.cg.renderImage(this.boomImage, this.size, this.x, this.y);
        setTimeout(() => {
            this.cg.clearRect(this.x, this.y, this.size);
        }, 1000);
    };

    Bullet.prototype.destruct = function() {
        Obclient.prototype.destruct.apply(this);
        if (this.type) {
            delete Bullet.store[this.type][this.id];
        }
        this.cg.clearRect(this.x, this.y, this.size);
    };

    window.Bullet = Bullet;
})(window);


(function() {
    "use strict";

    function Boom(cg, x, y) {
        Obclient.call(this, cg);
        this.x = x;
        this.y = y;
        this.size = 36;
        this.resource = resource.get('boom');
    }

    Obclient.extend(Boom);

    Boom.prototype.update = function(timestamp) {
        this.cg.renderImage(this.resource, this.size, this.x, this.y);
        this.start || (this.start = timestamp);
        if (this.start && timestamp - this.start > 300) {
            this.destruct();
        }
    };

    Boom.prototype.destruct = function() {
        Obclient.prototype.destruct.apply(this);
        this.cg.clearRect(this.x, this.y, this.size);
    };

    window.Boom = Boom;
}());