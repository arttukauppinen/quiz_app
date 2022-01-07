import { validasaur } from "../deps.js";

const questionValidationRules = {
    title: [validasaur.required, validasaur.minLength(1)],
    text: [validasaur.required, validasaur.minLength(1)],
};

const optionValidationRules = {
    text: [validasaur.required, validasaur.minLength(1)],
};

const registrationValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)]
};


  export{ questionValidationRules, optionValidationRules, registrationValidationRules }