import { executeQuery } from "../database/database.js";

const getOption = async (theId) => {
    const res = await executeQuery(`SELECT * FROM question_answer_options WHERE question_id = $1 AND is_correct = $2`, theId, true);
    return res.rows[0].option_text;
}

const addAnswer = async (userId, questionId, answerOption, correct) => {
    await executeQuery(
      `INSERT INTO question_answers
        (user_id, question_id, question_answer_option_id, correct)
          VALUES ($1, $2, $3, $4)`,
      userId, 
      questionId, 
      answerOption,
      correct,
    );
};

export{ getOption, addAnswer }