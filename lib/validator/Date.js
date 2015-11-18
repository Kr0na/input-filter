'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var Date = (function () {
    function Date() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? Date.FORMAT_DEFAULT : arguments[0];

        _classCallCheck(this, Date);

        if (typeof options === 'string') {
            this.format = options;
        } else {
            this.format = options.format || Date.FORMAT_DEFAULT;
        }
        this.message = options.message || 'Wrong date format';
    }

    _createClass(Date, [{
        key: 'isValid',
        value: function isValid(value, context) {
            if (value instanceof Date || value.toDate) {
                return true;
            }
            var a = (0, _moment2['default'])(value, this.format, true);

            if (a.isValid()) {
                return true;
            } else {
                return Promise.reject(this.message);
            }
        }
    }]);

    return Date;
})();

Date.FORMAT_DEFAULT = 'DD-MM-YYYY';
Date.FORMAT_US = 'MM/DD/YYYY';

exports['default'] = Date;
module.exports = exports['default'];