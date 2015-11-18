'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Between = (function () {
    function Between() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Between);

        if (options.hasOwnProperty('min')) {
            this.min = options.min;
        } else {
            this.min = false;
        }
        if (options.hasOwnProperty('max')) {
            this.max = options.max;
        } else {
            this.max = false;
        }
        this.message = options.message || options.hasOwnProperty('min') && options.hasOwnProperty('max') ? 'must be between ' + this.min + ' and ' + this.max : options.hasOwnProperty('min') ? 'must be bigger than ' + this.min : 'must be less than ' + this.max + ' ';
    }

    _createClass(Between, [{
        key: 'isValid',
        value: function isValid(value) {
            if (typeof value !== 'number' && parseFloat(value).toString() !== value) {
                throw new Error(value + ' is not an Number');
            }
            if (this.min !== false && this.max !== false) {
                if (value >= this.min && value <= this.max) {
                    return true;
                }
            } else if (this.min !== false) {
                if (value >= this.min) {
                    return true;
                }
            } else {
                if (value <= this.max) {
                    return true;
                }
            }

            return Promise.reject(this.message);
        }
    }]);

    return Between;
})();

exports['default'] = Between;
module.exports = exports['default'];