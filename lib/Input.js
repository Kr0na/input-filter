'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _FilterChainJs = require('./FilterChain.js');

var _FilterChainJs2 = _interopRequireDefault(_FilterChainJs);

var _ValidatorChainJs = require('./ValidatorChain.js');

var _ValidatorChainJs2 = _interopRequireDefault(_ValidatorChainJs);

var _EventableJs = require('./Eventable.js');

var _EventableJs2 = _interopRequireDefault(_EventableJs);

var Input = (function (_Eventable) {
    _inherits(Input, _Eventable);

    function Input(name) {
        _classCallCheck(this, Input);

        _get(Object.getPrototypeOf(Input.prototype), 'constructor', this).call(this);
        this.required = true;
        this.name = name;
        this.value = null;
        this.valid = null;
        this.filterChain = new _FilterChainJs2['default']();
        this.validatorChain = new _ValidatorChainJs2['default']();
    }

    _createClass(Input, [{
        key: 'getValidation',
        value: function getValidation() {
            return this.validatorChain;
        }
    }, {
        key: 'getFiltration',
        value: function getFiltration() {
            return this.filterChain;
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            try {
                //Reset Validator for validate data again
                this.validatorChain.promise = null;
                this.promise = null;
                this.value = this.filterChain.filter(value);
            } catch (e) {
                this.value = null;
                this.promise = Promise.reject(_defineProperty({}, this.name, [e]));
            }
            return this;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.value = null;
            this.promise = null;
            this.validatorChain.promise = null;
            this.valid = null;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.value;
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            var _this = this;

            var context = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            if (this.promise) {
                return this.promise;
            }
            if ((!this.getValue() || this.getValue() == "") && !this.required) {
                return true;
            }
            this.promise = this.validatorChain.isValid(this.getValue(), context, this.name).then(function () {
                _this.valid = true;
                _this.trigger('valid', _this);
                return _defineProperty({}, _this.name, _this.getValue());
            }, function (messages) {
                _this.valid = false;
                _this.messages = messages;
                _this.trigger('invalid', _this);
                throw _defineProperty({}, _this.name, messages);
            });
            return this.promise;
        }
    }]);

    return Input;
})(_EventableJs2['default']);

exports['default'] = Input;
module.exports = exports['default'];