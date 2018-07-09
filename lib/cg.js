(function(window) {
    "use strict";

    function CG(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width = document.body.clientHeight;
        this.height = this.canvas.height = document.body.clientHeight;
        this.cxt = this.canvas.getContext('2d');
    }

    CG.prototype.renderImage = function(image, size, x, y) {
        image.width = size;
        image.height = size;
        this.cxt.beginPath();
        this.cxt.drawImage(image, x, y, size, size);
        this.cxt.closePath();
    };

    CG.prototype.drawImage = function(image, sx, sy) {
        this.cxt.beginPath();
        this.cxt.drawImage(image, sx, sy, this.width, this.height, 0, 0, this.width, this.height);
        this.cxt.closePath();
    };

    CG.prototype.renderRect = function(x, y, width, height) {
        this.cxt.beginPath();
        this.ctx.fillRect(x, y, width, height);
        this.cxt.closePath();
    };

    CG.prototype.clearRect = function(x, y, size) {
        this.cxt.clearRect(x, y, size, size);
    };

    window.CG = CG;
})(window);
