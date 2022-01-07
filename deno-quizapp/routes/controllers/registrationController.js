import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import * as validationService from "../../services/validationService.js";
import { validasaur } from "../../deps.js";

const getRegistrationData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  return {
    email: params.get("email"),
    password: params.get("password"),
    validationErrors: []
  };
};


const registerUser = async ({ request, response, render }) => {
  const registrationData = await getRegistrationData(request);

  const [passes, errors] = await validasaur.validate(
    registrationData,
    validationService.registrationValidationRules,
  );

  if (!passes) {
    console.log(errors);
    registrationData.validationErrors = errors;
    render("register.eta", registrationData);

  } else {

    await userService.addUser(
      registrationData.email,
      await bcrypt.hash(registrationData.password)
    );
    response.redirect("/auth/login");
  }
};

const showRegistrationForm = ({ render }) => {
  render("register.eta");
};

export { registerUser, showRegistrationForm };