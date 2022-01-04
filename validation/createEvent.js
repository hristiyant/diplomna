const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCreateEventInput(data) {
    let errors = {};

    //Convert empty fields to empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.eventType = !isEmpty(data.eventType) ? data.eventType : "";
    data.date = !isEmpty(data.date) ? data.date : "";
    data.quota = !isEmpty(data.quota) ? data.quota : "";

    //Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    //Type checks
    if (Validator.isEmpty(data.type)) {
        errors.type = "Type field is required";
    }

    //DateTime checks
    if (Validator.isEmpty(data.date) || Validator.isEmpty(data.time)) {
        errors.dateTime = "Date and time fields are required";
    }

    //Quota checks
    if (Validator.isEmpty(data.quota)) {
        errors.quota = "Quota field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};