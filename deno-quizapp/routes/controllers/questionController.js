import * as questionService from "../../services/questionService.js";
import * as validationService from "../../services/validationService.js";
import { validasaur } from "../../deps.js";

const getQuestionData = async (user, request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  return {
    title: params.get("title"),
    text: params.get("question_text"),
    questions: await questionService.listQuestions(user.id),
    validationErrors: [],
  };
};

const addQuestion = async ({ user, request, response, render }) => {
  const questionData = await getQuestionData(user, request);

  const [passes, errors] = await validasaur.validate(
    questionData,
    validationService.questionValidationRules,
  );

  if (!passes) {
    console.log(errors);
    questionData.validationErrors = errors;
    render("questions.eta", questionData);
  } else {
    await questionService.addQuestion(
      user.id,
      questionData.title,
      questionData.text,
    );

    response.redirect("/questions");
  }
};

const listQuestions = async ({ render, user }) => {
  render("questions.eta", {
    questions: await questionService.listQuestions(user.id),
  });
};

const deleteQuestion = async ({ params, response }) => {
  await questionService.deleteQuestion(params.id);
  response.redirect(`/questions`);
};

export { addQuestion, deleteQuestion, listQuestions };
