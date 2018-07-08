(function(window) {
    "use strict";

    function Controller(ctrl, launcher) {
        this.center = {x: 80, y: document.body.clientHeight - 80};

        ctrl.ontouchstart = ctrl.ontouchmove = (function(event) {
            event.preventDefault();
            var x = event.changedTouches[0].clientX;
            var y = event.changedTouches[0].clientY;
            var moveX = (x - this.center.x) / 15;
            var moveY = (y - this.center.y) / 15;
            moveX = Math.abs(moveX) <= 2 ? moveX : false;
            moveY = Math.abs(moveY) <= 2 ? moveY : false;
            window.store.plane.setState(moveX, moveY);
        }).bind(this);

        ctrl.ontouchcancel = ctrl.ontouchend = function(event) {
            event.preventDefault();
            window.store.plane.initState();
        };

        launcher.ontouchstart = launcher.ontouchmove = (function(event) {
            // console.log(plane);
            this.start || (this.start = timestamp);
            if (this.start && timestamp - this.start > 1000) {
                window.store.observer.attach(new Bullet(this.cg, 60, 500));
                this.start = undefined;
            }
        }).bind(this);
    }

    window.Controller = Controller;
})(window);
