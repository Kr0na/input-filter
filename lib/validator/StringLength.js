"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StringLength = (function () {
    function StringLength() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, StringLength);

        this.min = options.min || false;
        this.max = options.max || false;
        this.message = options.message || options.min >= 0 && options.max >= 0 ? "must be between " + this.min + " and " + this.max + " characters long" : options.min >= 0 ? "must be at least " + this.min + " characters long" : "must be lesst than " + this.max + " characters long";
    }

    _createClass(StringLength, [{
        key: "isValid",
        value: function isValid(value) {
            if (!value) {
                throw new Error(this.message);
            }
            var length = value.length;
            if (this.min && this.max) {
                if (length >= this.min && length <= this.max) {
                    return true;
                }
            } else if (this.min) {
                if (length >= this.min) {
                    return true;
                }
            } else {
                if (length <= this.max) {
                    return true;
                }
            }

            return Promise.reject(this.message);
        }
    }]);

    return StringLength;
})();

exports["default"] = StringLength;
module.exports = exports["default"];