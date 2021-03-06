import Validator from "validator";
import isEmpty from "is-empty";

export default function validateRegisterInput(data) {
    let errors = {};

    //Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }

    //Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    //Phone checks
    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone field is required";
    } else if (!Validator.isMobilePhone(data.phone)) {
        errors.phone = "Phone is invalid";
    }

    //Password checks
    if (!Validator.isLength(data.password, 6, 32)) {
        errors.password = "Password length must be between 6 and 32 characters";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};