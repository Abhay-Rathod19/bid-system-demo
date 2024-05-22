import { checkIncludes, objectValues } from "./javaScript";

export const validation = (name, value, state, storeState, currUser) => {
    if (value.toString().length <= 0 || value === 0 || value < 0) {
        return "Enter value greater than 0.";
    } else if (value.toString().length > 7) {
        return "Enter 7 digit only.";
    } else if (
        checkIncludes(objectValues(state), Number(value)) ||
        checkIncludes(storeState[currUser], Number(value))
    ) {
        return "Repeated value.";
    }
};


export const validateAll = (state, currUser, cardLabel, errors, setErrors) => {
    const errorEmpty = {};
    const inputNo = ["one", "two", "three", "four", "five", "six"];

    for (let field of inputNo) {
        if (!state[`${currUser}-${cardLabel}-${field}`]) {
            errorEmpty[`${currUser}-${cardLabel}-${field}`] =
                "This field is required.";
        }
    }

    if (objectValues(errorEmpty).filter((item) => item !== undefined).length) {
        setErrors({ ...errors, ...errorEmpty });
    }

    return (
        objectValues(errorEmpty).filter((item) => item !== undefined).length === 0
    );
};
