"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _PromiseHelperJs = require('./PromiseHelper.js');

var _PromiseHelperJs2 = _interopRequireDefault(_PromiseHelperJs);

var Eventable = (function () {
    function Eventable() {
        _classCallCheck(this, Eventable);

        this.feed = {};
        this.feedCounter = 0;
    }

    _createClass(Eventable, [{
        key: "bind",
        value: function bind(event, listener) {
            this.feed[event] = this.feed[name] || {};
            var token = ++this.feedCounter;
            this.feed[event][token] = listener;
            return token;
        }
    }, {
        key: "unbind",
        value: function unbind(event, token) {
            if (this.feed[event] && this.feed[event][token]) {
                delete this.feed[event][token];
            } else if (process.env.NODE_ENV !== "production") {
                console.warn("listener with token " + token + " is not found for " + event + " event");
            }
        }
    }, {
        key: "trigger",
        value: function trigger(event, data) {
            var _this = this;

            if (this.feed[event]) {
                var promises = Object.keys(this.feed[event]).map(function (token) {
                    return _this.feed[event][token](data, event);
                });
                return _PromiseHelperJs2["default"].catchAll(promises);
            }
            return Promise.resolve();
        }
    }]);

    return Eventable;
})();

exports["default"] = Eventable;
module.exports = exports["default"];