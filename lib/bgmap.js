(function(window) {
    "use strict";

    function Bgmap(cg) {
        Obclient.call(this, cg);
        this.width = window.screen.availWidth;
        this.height = window.screen.availHeight;
        this.map1 = resource.get('map1');
        this.map2 = resource.get('map2');
        this.resource = this.map1;
        this.resource.width = this.width;
        this.x = 0;
        this.y = this.resource.height - this.height;
        this.state = { isLastMap: false };
    }

    Obclient.extend(Bgmap);

    Bgmap.prototype.update = function(timestamp) {
        this.cg.clearRect(this.x, this.y, this.size+3);
        this.cg.drawImage(
            this.resource, this.x, this.y, this.width, this.height
        );
        if (this.y <= 0) {
            this.resource = this.state.isLastMap ? this.map1 : this.map2;
            this.y = this.resource.height - this.height;
            this.state.isLastMap = !this.state.isLastMap;
        }
        this.y = this.y - 0.4;
    };

    Bgmap.prototype.destruct = function() {
        Obclient.prototype.destruct.apply(this);
    };

    window.Bgmap = Bgmap;
})(window);
