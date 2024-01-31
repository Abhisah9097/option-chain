import { OPTION_TABLE_TD_COLORS, OPTION_TYPES_WITH_OPERATOR } from "../../utils/constants";

export function performOperation(value1, operator, value2) {
    switch (operator) {
        case '+': return value1 + value2;
        case '-': return value1 - value2;
        case '>': return value1 > value2;
        case '<': return value1 < value2;
        case '>=': return value1 >= value2;
        case '<=': return value1 <= value2;
        default: return value1;
    }
}

export function getLargestStrikeByKey(filtered_data, underlying_value, increase_or_decrease_value = 0, key) {
    const result = {};

    OPTION_TYPES_WITH_OPERATOR.forEach(type => {
        const largestValues = filtered_data
            .filter(item => performOperation(item.strikePrice, type.comparison_operator, performOperation(underlying_value, type.arithmetic_operator, increase_or_decrease_value)))
            .sort((a, b) => b[type.option_type][key] - a[type.option_type][key])
            .slice(0, 4);

        result[type.option_type] = largestValues.reduce((acc, item, index) => {
            acc[item.strikePrice] = OPTION_TABLE_TD_COLORS[index + 1];
            return acc;
          }, {});
    });

    return result;
}