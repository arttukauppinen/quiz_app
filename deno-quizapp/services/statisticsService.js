import { executeQuery } from "../database/database.js";

const getAnswerCount = async (theId) => {
    const res = await executeQuery(`SELECT COUNT(*) FROM question_answers WHERE user_id = $1 `, theId);
    console.log(res.rows[0].count)
    return res.rows[0]
}

const getCorrectCount = async (theId) => {
    const res = await executeQuery(
        `SELECT COUNT(*) FROM question_answers WHERE user_id = $1 AND correct = $2 `,
        theId, true);
    return res.rows[0]
}

const getOwnQuestionCount = async (theId) => {
    const res = await executeQuery(
        `SELECT COUNT(*) FROM (
            (SELECT * FROM questions WHERE user_id = $1) AS A
              INNER JOIN 
            question_answers AS B
            ON A.id = B.question_id
        ) `,
        theId);
    return res.rows[0]
}

const getTop = async () => {
    const res = await executeQuery(
        `SELECT email, count FROM 
            (users INNER JOIN 
                (SELECT DISTINCT user_id, COUNT(user_id)
                FROM question_answers GROUP BY user_id ) AS b 
            ON users.id = b.user_id) ORDER BY count desc LIMIT 5;`
    );

    return res.rows
}

//14
export{ getAnswerCount, getCorrectCount, getTop, getOwnQuestionCount }

