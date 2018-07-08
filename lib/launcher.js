(function(window) {
    "use strict";

    function Launcher(cg, launcher) {
        Obclient.call(this, cg);
        this.plane = window.store.plane;
        this.launcher = launcher;
        this.state = {
            start: false,
            touching: false
        };

        this.launcher.ontouchstart = this.launcher.ontouchmove = (function(event) {
            event.preventDefault();
            this.state.touching = true;
        }).bind(this);

        this.launcher.ontouchcancel = this.launcher.ontouchend = (function(event) {
            event.preventDefault();
            this.state.touching = false;
        }).bind(this);
    }
    Obclient.extend(Launcher);

    Launcher.prototype.update = function(timestamp) {
        this.state.start || (this.state.start = timestamp);
        if (this.state.touching && this.state.start && timestamp - this.state.start > 500) {
            var bullet = new Bullet(
                this.cg,
                this.plane.x + 22,
                this.plane.y
            );
            window.store.observer.attach(bullet);
            Bullet.pushHero(bullet);
            this.state.start = undefined;
        }
    };

    Launcher.prototype.destruct = function() {
        Obclient.prototype.destruct.apply(this);
    };

    window.Launcher = Launcher;
})(window);
