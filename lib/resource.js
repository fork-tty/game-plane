(function(window) {
    "use strict";

    function Resource(resources) {
        var storage = new Object();
        this.loaded = false;
        this.promises = [];
        for (var resource in resources) {
            this.promises.push(new Promise(function(resolve, reject) {
                var image = new Image();
                image.src = resources[resource];
                image.setAttribute('imageId', resource);
                storage[resource] = image;
                image.onload = function(e) {
                    resolve(image);
                };
                image.onabort = function(e) {
                    console.log(e);
                    reject('加载资源出错');
                };
            }));
        }
        this.storage = storage;
    }

    Resource.prototype.load = function(callback) {
        Promise.all(this.promises)
        .then((function(values) {
            this.loaded = true;
            callback(this);
        }).bind(this))
        .catch(function(message) {
            throw new Error(message);
        });
    };

    Resource.prototype.get = function(key) {
        if (this.loaded) {
            var value = this.storage[key];
            if (value) {
                return value;
            }
            throw new Error('未找到资源文件');
        }
        throw new Error('资源尚未加载完成');
    };

    window.Resource = Resource;
})(window);
