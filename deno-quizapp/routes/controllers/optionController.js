import * as optionService from "../../services/optionService.js";
import * as questionService from "../../services/questionService.js";
import * as validationService from "../../services/validationService.js";
import { validasaur } from "../../deps.js";

const getOptionData = async (request, id) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  return {
    text: params.get("option_text"),
    validationErrors: [],
    question: await questionService.getQuestion(id),
    options: await questionService.listOptions(id),
  };
};

const getCorrectness = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const isCorrect = params.get("is_correct");

  if (isCorrect) {
    return true;
  } else {
    return false;
  }
};

const addOption = async ({ request, response, params, render }) => {
  const optionData = await getOptionData(request, params.id);

  const [passes, errors] = await validasaur.validate(
    optionData,
    validationService.optionValidationRules,
  );
  const bool = await getCorrectness(request);

  if (!passes) {
    optionData.validationErrors = errors;
    render("question.eta", {
      validationErrors: errors.text.required,
      question: await questionService.getQuestion(params.id),
      options: await questionService.listOptions(params.id),
      hasCorrect: await optionService.hasCorrect(params.id)
    });
  } else {
    await optionService.addOption(
      params.id,
      optionData.text,
      bool,
    );

    response.redirect(`/questions/${params.id}`);
  }
};

const deleteOption = async ({ params, response }) => {
  await optionService.deleteOption(params.optionId);
  response.redirect(`/questions/${params.questionId}`);
};

const getQuestion = async ({ params, render }) => {
  render("question.eta", {
    validationErrors: "",
    question: await questionService.getQuestion(params.id),
    options: await questionService.listOptions(params.id),
    hasCorrect: await optionService.hasCorrect(params.id),
  });
};

export { addOption, deleteOption, getQuestion };
