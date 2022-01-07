import * as questionService from "../../services/questionService.js";
import { executeQuery } from "../../database/database.js";

const getRandomQuestion = async ({ response }) => {
  const res = await executeQuery(`SELECT id FROM questions ORDER BY random()`);
  const id = res.rows[0].id;
  const question = await questionService.getQuestion(id);
  const options = await questionService.listOptions(id);

  const result = {
    "questionId": question.id,
    "questionTitle": question.title,
    "questionText": question.question_text,
    "answerOptions": [],
  };

  for (let i = 0; i < options.length; i++) {
    result.answerOptions.push(
      { "optionId": options[i].id, "optionText": options[i].option_text },
    );
  }
  
  response.body = result;
};

const wasCorrect = async ({ response, request }) => {
  const body = request.body({ type: "json" });
  const params = await body.value;
  const id = params.questionId;
  const optionId = params.optionId;

  console.log(id);
  console.log(optionId);

  const res = await executeQuery(
    `SELECT is_correct FROM question_answer_options WHERE question_id = $1 AND id= $2;
    `,
    id,
    optionId,
  );
  console.log(res.rows[0]);
  response.body = { "correct": res.rows[0].is_correct };
};

export { getRandomQuestion, wasCorrect };
