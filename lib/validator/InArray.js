'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var InArray = (function () {
    function InArray(options) {
        _classCallCheck(this, InArray);

        if (Array.isArray(options)) {
            this.haystack = options;
        } else {
            this.haystack = options.haystack;
        }
        this.message = options.message || 'value is not in haystack';
    }

    _createClass(InArray, [{
        key: 'isValid',
        value: function isValid(value) {
            if (this.haystack.indexOf(value) !== -1) {
                return true;
            } else {
                return Promise.reject(this.message);
            }
        }
    }]);

    return InArray;
})();

exports['default'] = InArray;
module.exports = exports['default'];