"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Integer = (function () {
    function Integer() {
        _classCallCheck(this, Integer);
    }

    _createClass(Integer, [{
        key: "filter",
        value: function filter(value) {
            var newValue = parseInt(value);
            if (isNaN(newValue)) {
                throw new Error(value + " is not a Number");
            }
            return newValue;
        }
    }]);

    return Integer;
})();

exports["default"] = Integer;
module.exports = exports["default"];