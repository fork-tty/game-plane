(function(window) {
    "use strict";

    function Observer() {
        this.idCount = 0;
    }

    Observer.storage = new Object();

    Observer.prototype.attach = function(serve) {
        serve.setId(this.idCount);
        if (serve.onMount) {
            serve.onMount();
        }
        Observer.storage[this.idCount] = serve;
        this.idCount++;
    };

    Observer.prototype.update = function(timestamp) {
        for (var index in Observer.storage) {
            var element = Observer.storage[index];
            element.update(timestamp);
        }
    };

    Observer.remove = function(id) {
        var serve = Observer.storage[id];
        if (serve) {
            delete Observer.storage[id];
        }
    };

    Observer.clear = function() {
        for (var index in Observer.storage) {
            var element = Observer.storage[index];
            element.destruct();
        }
    };

    window.Observer = Observer;
})(window);
