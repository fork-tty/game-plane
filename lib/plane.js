(function(window) {
    "use strict";

    function Plane(cg, x, y) {
        Obclient.call(this, cg);
        this.x = x;
        this.y = y;
        this.size = 45;
        this.resource = resource.get('plane1');
        this.initState();
    }

    Obclient.extend(Plane);

    Plane.prototype.update = function(timestamp) {
        this.cg.clearRect(this.x - 2, this.y - 2, this.size+4);
        this.x = this.x + this.state.x;
        this.y = this.y + this.state.y;
        this.cg.renderImage(this.resource, this.size, this.x, this.y);
    };

    Plane.prototype.onBeenShot = function() {
        console.log('着弹');
        // Observer.clear();
    };

    Plane.prototype.setState = function(x, y) {
        if (x) {
            this.state.x = x;
        }
        if (y) {
            this.state.y = y;
        }
    };

    Plane.prototype.initState = function() {
        this.state = {x: 0, y: 0};
    };

    Plane.prototype.destruct = function() {
        Obclient.prototype.destruct.apply(this);
        this.cg.clearRect(this.x, this.y, this.size);
    };

    window.Plane = Plane;
})(window);
