export const validation = (name, value, state, storeState, user) => {

    if (value.toString().length <= 0 || value === 0 || value < 0) {
        // return "Enter value to submit.";
        return "Enter value greater than 0.";
    } else if (value.toString().length > 7) {
        return "7 digit error.";
        // return "Number may only have 7 digits.";
    } else if (Object.values(state).includes(Number(value)) || storeState[user]?.includes(Number(value))) {
        // return "This value is already entered.";
        return "Repeated value.";
    }

};


export const validateAll = (state, currUser, cardLabel, errors, setErrors) => {

    const erroEmpty = {};
    const inputNo = ['one', 'two', 'three', 'four', 'five', 'six'];

    for (let field of inputNo) {
        if (!(state[`${currUser}-${cardLabel}-${field}`])) {
            erroEmpty[`${currUser}-${cardLabel}-${field}`] = "This field is required.";
        }
    }
    if (Object.values(erroEmpty).filter((item) => item !== undefined).length) {
        setErrors({ ...errors, ...erroEmpty });
    }

    return Object.values(erroEmpty).filter((item) => item !== undefined).length === 0;
}