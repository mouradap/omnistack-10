module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(arrayAsString => arrayAsString.trim());
};