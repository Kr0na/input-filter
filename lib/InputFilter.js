'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _InputJs = require('./Input.js');

var _InputJs2 = _interopRequireDefault(_InputJs);

var _validatorValidatorsJs = require('./validator/validators.js');

var ValidatorRegistry = _interopRequireWildcard(_validatorValidatorsJs);

var _filterFiltersJs = require('./filter/filters.js');

var FilterRegistry = _interopRequireWildcard(_filterFiltersJs);

var _PromiseHelperJs = require('./PromiseHelper.js');

var _PromiseHelperJs2 = _interopRequireDefault(_PromiseHelperJs);

var _EventableJs = require('./Eventable.js');

var _EventableJs2 = _interopRequireDefault(_EventableJs);

var InputFilter = (function (_Eventable) {
    _inherits(InputFilter, _Eventable);

    function InputFilter() {
        var name = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        _classCallCheck(this, InputFilter);

        _get(Object.getPrototypeOf(InputFilter.prototype), 'constructor', this).call(this);
        this.name = name;
        this.messages = {};
        this.inputs = {};
        this.valid = null;
        this.rawData = {};
        this.data = {};
        this.init();
    }

    _createClass(InputFilter, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'add',
        value: function add(input) {
            this.inputs[input.name] = input;

            return this;
        }
    }, {
        key: 'get',
        value: function get(name) {
            return this.inputs[name];
        }
    }, {
        key: 'setValue',
        value: function setValue(data) {
            return this.setData(data);
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (key) {
                return this.get(key).getValue();
            } else {
                return this.data;
            }
        }
    }, {
        key: 'setData',
        value: function setData(data) {
            this.reset();
            this.rawData = data || {};
            this.populate();

            return this;
        }
    }, {
        key: 'populate',
        value: function populate() {
            var _this = this;

            Object.keys(this.inputs).forEach(function (name) {
                if (_this.rawData.hasOwnProperty(name)) {
                    _this.data[name] = _this.get(name).setValue(_this.rawData[name]).getValue();
                } else {
                    _this.data[name] = _this.get(name).setValue(null).getValue();
                }
            });
        }
    }, {
        key: 'getData',
        value: function getData() {
            return this.data;
        }
    }, {
        key: 'reset',
        value: function reset() {
            var _this2 = this;

            this.data = {};
            this.rawData = {};
            Object.keys(this.inputs).forEach(function (name) {
                _this2.get(name).reset();
            });
            this.promise = null;
            this.messages = {};
            this.valid = null;
        }
    }, {
        key: 'isValid',
        value: function isValid() {
            var _this3 = this;

            if (this.promise) {
                return this.promise;
            }
            var promises = Object.keys(this.inputs).map(function (name) {
                return _this3.get(name).isValid(_this3.data);
            });

            this.promise = _PromiseHelperJs2['default'].assignRejects(promises).then(function (result) {
                _this3.valid = true;
                _this3.trigger('valid', _this3);
                return _this3.data;
            }, function (messages) {
                _this3.valid = false;
                _this3.messages = messages;
                _this3.trigger('invalid', _this3);
                if (_this3.name) {
                    throw _defineProperty({}, _this3.name, messages);
                } else {
                    throw messages;
                }
            });

            return this.promise;
        }
    }], [{
        key: 'factory',
        value: function factory(items) {
            var inputFilter = new InputFilter();
            for (var _name in items) {
                if (items.hasOwnProperty(_name)) {
                    var _ret = (function () {
                        if (items[_name] instanceof _InputJs2['default'] || items[_name] instanceof InputFilter) {
                            items[_name].name = _name;
                            inputFilter.add(items[_name]);
                            return 'continue';
                        }
                        var input = new _InputJs2['default'](_name);
                        var _items$_name = items[_name];
                        var validators = _items$_name.validators;
                        var filters = _items$_name.filters;
                        var required = _items$_name.required;

                        if (required === false) {
                            input.required = false;
                        }
                        if (Array.isArray(filters)) {
                            filters.forEach(function (filter) {
                                if (typeof filter === 'string') {
                                    filter = new FilterRegistry[filter]();
                                }
                                input.getFiltration().add(filter);
                            });
                        }
                        if (Array.isArray(validators)) {
                            validators.forEach(function (validator) {
                                if (typeof validator === 'string') {
                                    validator = new ValidatorRegistry[validator]();
                                }
                                input.getValidation().add(validator);
                            });
                        }
                        inputFilter.add(input);
                    })();

                    if (_ret === 'continue') continue;
                }
            }

            return inputFilter;
        }
    }]);

    return InputFilter;
})(_EventableJs2['default']);

exports['default'] = InputFilter;
module.exports = exports['default'];