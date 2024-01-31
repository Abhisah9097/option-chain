const OPTION_TYPES = {
    CE: 'CE',
    PE: 'PE'
}

const OPTION_TYPES_ARRAY = [
    OPTION_TYPES.CE,
    OPTION_TYPES.PE
]

const COMPARISON_OPERATORS = {
    LESS_THAN: '<',
    LESS_THAN_OR_EQUAL: '<=',
    GREATER_THAN: '>',
    GREATER_THAN_OR_EQUAL: '>=',
    EQUAL: '==',
    NOT_EQUAL: '!=',
}

const ARITHMETIC_OPERATORS = {
    ADDITION: '+',
    SUBTRACTION: '-',
}

const OPTION_TYPES_WITH_OPERATOR = [
    {
        option_type: OPTION_TYPES.CE,
        comparison_operator: COMPARISON_OPERATORS.GREATER_THAN_OR_EQUAL,
        arithmetic_operator: ARITHMETIC_OPERATORS.SUBTRACTION
    },
    {
        option_type: OPTION_TYPES.PE,
        comparison_operator: COMPARISON_OPERATORS.LESS_THAN_OR_EQUAL,
        arithmetic_operator: ARITHMETIC_OPERATORS.ADDITION
    }
]

const OPTION_TABLE_TD_COLORS = {
    1: "first-of-largest-value",
    2: "second-of-largest-value",
    3: "third-of-largest-value",
    4: "fourth-of-largest-value",
}

export { OPTION_TYPES, OPTION_TYPES_ARRAY, OPTION_TYPES_WITH_OPERATOR, OPTION_TABLE_TD_COLORS };