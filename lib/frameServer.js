(function(window) {
    "use strict";

    window.requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame;

    /** @param {Observer} observer */
    function FrameServer(observer) {
        this.raf = false;
        this.isStart = false;
        this.audio = resource.get('audioBio');
        this.nextAction = (function(timestamp) {
            observer.update(timestamp);
            this.raf = requestAnimationFrame(this.nextAction);
        }).bind(this)
    }

    FrameServer.prototype.start = function() {
        this.audio.play();
        if (!this.isStart) {
            this.isStart = true;
            this.raf = requestAnimationFrame(this.nextAction);
        }
    };

    FrameServer.prototype.stop = function() {
        this.audio.play();
        if (this.raf && this.isStart) {
            console.log(this.raf);
            cancelAnimationFrame(this.raf);
            this.isStart = false;
        }
    };

    window.FrameServer = FrameServer;
})(window);
