export default {
    Input: require('./src/Input.js'),
    InputFilter: require('./src/InputFilter.js'),

    StringTrim: require('./src/filter/StringTrim.js'),
    Float: require('./src/filter/Float.js'),
    Integer: require('./src/filter/Integer.js'),

    StringLength: require('./src/validator/StringLength.js'),

    FilterChain: require('./src/FilterChain.js'),
    ValidatorChain: require('./src/ValidatorChain.js')
}
