import { executeQuery } from "../database/database.js";

const addOption = async (questionId, optionText, isCorrect) => {
  await executeQuery(
    `INSERT INTO question_answer_options
        (question_id, option_text, is_correct)
          VALUES ($1, $2, $3)`,
    questionId,
    optionText,
    isCorrect,
  );
};

const deleteOption = async (theId) => {
  await executeQuery(
    `DELETE FROM question_answers WHERE question_answer_option_id = $1`,
    theId,
  );
  await executeQuery(
    `DELETE FROM question_answer_options WHERE id = $1`,
    theId,
  );
};

const hasCorrect = async (theId) => {
  const res = await executeQuery(
    `SELECT * FROM question_answer_options WHERE question_id= $1 AND is_correct = true`,
    theId,
  );
  if(res.rows[0]){
    return true
  }else{
    return false
  }
};

export { addOption, deleteOption, hasCorrect };
