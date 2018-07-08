(function(window) {
    "use strict";

    function Obclient(cg) {
        this.cg = cg;
        this.id = null;
    }

    Obclient.prototype.update = function(timestamp) {

    };

    Obclient.prototype.setId = function(id) {
        this.id = id;
    };

    Obclient.prototype.destruct = function() {
        Observer.remove(this.id);
    };

    Obclient.extend = function(cls) {
        var Super = function() {};
        Super.prototype = Obclient.prototype;
        cls.prototype = new Super();
    };

    window.Obclient = Obclient;

})(window);
