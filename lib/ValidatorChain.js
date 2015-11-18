'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ChainJs = require('./Chain.js');

var _ChainJs2 = _interopRequireDefault(_ChainJs);

var _PromiseHelperJs = require('./PromiseHelper.js');

var _PromiseHelperJs2 = _interopRequireDefault(_PromiseHelperJs);

var ValidatorChain = (function (_Chain) {
    _inherits(ValidatorChain, _Chain);

    function ValidatorChain() {
        _classCallCheck(this, ValidatorChain);

        _get(Object.getPrototypeOf(ValidatorChain.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ValidatorChain, [{
        key: 'isValid',
        value: function isValid(value, context) {
            if (this.promise) {
                return this.promise;
            }
            try {
                var promises = this.chain.map(function (item) {
                    return item.isValid(value, context);
                });
                this.promise = _PromiseHelperJs2['default'].catchAll(promises);
            } catch (e) {
                return Promise.reject(e);
            }

            return this.promise;
        }
    }]);

    return ValidatorChain;
})(_ChainJs2['default']);

exports['default'] = ValidatorChain;
module.exports = exports['default'];