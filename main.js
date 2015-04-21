export default {
    Input: require('./src/Input.js'),
    InputFilter: require('./src/InputFilter.js'),

    Bool: require('./src/filter/Bool.js'),
    Float: require('./src/filter/Float.js'),
    Integer: require('./src/filter/Integer.js'),
    StringTrim: require('./src/filter/StringTrim.js'),

    Between: require('./src/validator/Between.js'),
    Callback: require('./src/validator/Callback.js'),
    Date: require('./src/validator/Date.js'),
    StringLength: require('./src/validator/StringLength.js'),

    FilterChain: require('./src/FilterChain.js'),
    ValidatorChain: require('./src/ValidatorChain.js')
}
