import * as questionService from "../../services/questionService.js";
import * as quizService from "../../services/quizService.js";
import { executeQuery } from "../../database/database.js";

const getRandomQuestion = async ({ response }) => {
  const res = await executeQuery(`SELECT id FROM (
    questions
      INNER JOIN
    (SELECT question_id 
     FROM question_answer_options
     WHERE is_correct = true
    ) AS B
    ON questions.id = B.question_id
    )ORDER BY random()`);
    
  const id = res.rows[0].id;

  response.redirect(`/quiz/${id}`);
};

const showQuestion = async ({ params, render }) => {
  render("quiz.eta", {
    question: await questionService.getQuestion(params.id),
    options: await questionService.listOptions(params.id),
  });
};

const getOption = async ({ response, params, user }) => {
  const result = await executeQuery(
    `SELECT * FROM question_answer_options WHERE id = $1`,
    params.optionId,
  );

  const bool = result.rows[0].is_correct;
  await quizService.addAnswer(user.id, params.id, params.optionId, bool);

  if (bool) {
    response.redirect(`/quiz/${params.id}/correct`);
  } else {
    response.redirect(`/quiz/${params.id}/incorrect`);
  }
};

const wasCorrect = ({ render }) => {
  render("correctness.eta", {
    correct: true,
  });
};

const wasIncorrect = async ({ params, render }) => {
  render("correctness.eta", {
    correct: false,
    correctOption: await quizService.getOption(params.id),
  });
};

export { getOption, getRandomQuestion, showQuestion, wasCorrect, wasIncorrect };
