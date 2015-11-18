"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PromiseHelper = (function () {
    function PromiseHelper() {
        _classCallCheck(this, PromiseHelper);
    }

    _createClass(PromiseHelper, null, [{
        key: "toPromise",
        value: function toPromise(value) {
            return value && value.then ? value : Promise.resolve(value);
        }
    }, {
        key: "catchAll",
        value: function catchAll(promises) {
            return new Promise(function (resolve, reject) {
                var messages = [];
                promises = promises.map(PromiseHelper.toPromise).map(function (promise) {
                    return promise["catch"](function (message) {
                        return messages.push(message);
                    });
                });
                Promise.all(promises).then(function (data) {
                    if (messages.length) {
                        reject(messages);
                    } else {
                        resolve(data);
                    }
                });
            });
        }
    }, {
        key: "assignRejects",
        value: function assignRejects(promises) {
            return PromiseHelper.catchAll(promises)["catch"](function (errors) {
                var result = {};
                errors.forEach(function (error) {
                    Object.keys(error).forEach(function (input) {
                        return result[input] = error[input];
                    });
                });
                throw result;
            });
        }
    }, {
        key: "rejectedAll",
        value: function rejectedAll(promises) {
            return new Promise(function (resolve, reject) {
                PromiseHelper.catchAll(promises).then(reject, function (messages) {
                    if (messages.length == promises.length) {
                        resolve(messages);
                    } else {
                        reject(messages);
                    }
                });
            });
        }
    }]);

    return PromiseHelper;
})();

exports["default"] = PromiseHelper;
module.exports = exports["default"];