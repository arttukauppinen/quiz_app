import { executeQuery } from "../database/database.js";

const addQuestion = async (userId, title, questionText) => {
  await executeQuery(
    `INSERT INTO questions
      (user_id, title, question_text)
        VALUES ($1, $2, $3)`,
    userId, 
    title, 
    questionText
  );
};

const listQuestions = async (theId) => {
    const res = await executeQuery(`SELECT * FROM questions WHERE user_id = $1`, theId);
    return res.rows;
};

const listOptions = async (theId) => {
    const res = await executeQuery(`SELECT * FROM question_answer_options WHERE question_id = $1`, theId);
    return res.rows;
};

const getQuestion = async (theId) => {
    const res = await executeQuery(`SELECT * FROM questions WHERE id = $1`, theId);
    return res.rows[0];
}

const deleteQuestion = async (theId) => {
    await executeQuery(`DELETE FROM questions WHERE id = $1`, theId);
}



export { addQuestion, listQuestions, listOptions, getQuestion, deleteQuestion };