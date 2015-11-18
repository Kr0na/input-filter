"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bool = (function () {
    function Bool() {
        _classCallCheck(this, Bool);
    }

    _createClass(Bool, [{
        key: "filter",
        value: function filter(value) {
            if (value === true || value === false) {
                return value;
            } else if (value === 1 || value === 0) {
                return !!value;
            } else {
                throw new Error(value + " is not Boolean");
            }
        }
    }]);

    return Bool;
})();

exports["default"] = Bool;
module.exports = exports["default"];