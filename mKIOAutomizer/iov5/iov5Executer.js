﻿var Executer = (function() {

    var execItems = [];

    var ExecItem = function(item) {
        this.Timeouts = [];
        this.Item = item;
    };

    ExecItem.prototype.clear = function() {
        for (var i in this.Timeouts) {
            clearTimeout(this.Timeouts[i]);
        }
        this.Timeouts = [];
    };

    ExecItem.prototype.exec = function() {
        this.clear();
        var that = this;
        chrome.storage.sync.get(defaultOptions, function (items) {
            try {
                that.Item.exec.call(that, items);
            } catch (e) {
            }
        });
        this.Timeouts.push(setTimeout(function() {
            that.exec.call(that);
        }, that.Item.getTimeout()));
    };

    ExecItem.prototype.execInitialTimeout = function () {
        var initialTimeout = this.Item.getInitialTimeout ? this.Item.getInitialTimeout() : -1;
        if (initialTimeout > 0) {
            var that = this;
            setTimeout(function () {
                that.exec();
            }, initialTimeout);
        }
        else {
            this.exec();
        }
    };

    var register = function(obj) {
        if (!obj.getTimeout) {
            throw "Missing getTimeout";
        }
        if (!obj.exec) {
            throw "Missing exec";
        }
        execItems.push(new ExecItem(obj));
    };

    var post = function (d) {
        try {
            var isF = function(obj) {
                return !!(obj && obj.constructor && obj.call && obj.apply);
            };
            var r = new XMLHttpRequest();
            r.onreadystatechange = function() {
                if (r.readyState == 4 && r.status == 200) {
                    if (isF(d.f)) {
                        d.f.call(this);
                    }
                }
            };

            r.open("POST", ["/imperia/game_v5/game/xajax_loader.php?tFunct=", d.n].join(""), true);
            r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            var props = d.p && d.p.length > 0 ? ["&xjxargs[]=", d.p.join("&xjxargs[]=")].join("") : '';
            r.send(["xjxfun=", d.n, "&xjxr=", (new Date()).getTime(), props].join(""));
        } catch (e) {
        }
    };

    var start = function() {
        for (var i = 0; i < execItems.length; i++) {
            execItems[i].execInitialTimeout();
        }
    };

    document.addEventListener('DOMContentLoaded', start);

    return {
        register: register,
        post: post
    };
}());