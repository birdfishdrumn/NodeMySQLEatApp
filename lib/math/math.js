const roundTo = require("round-to");

let padding = (value) => {
    if (isNaN(parseFloat(value))) {
        return "-";
    }
    // 四捨五入して最後を0で返す処理
    return roundTo(value, 2).toPrecision(3);
};

let round = (value) => {
    return roundTo(value, 2);
};

module.exports = {
    padding, //少数が4.2となった場合に4.20と第二位まで含めたい場合
    round
};