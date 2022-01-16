
# Quiz App!

This is an application that was part of course Web Software Development, for further information visit

<https://wsd.cs.aalto.fi/>

To run this app locally:
- Set your database with following statements:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(256) NOT NULL,
  question_text TEXT NOT NULL
);

CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  question_answer_option_id INTEGER REFERENCES question_answer_options(id),
  correct BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX ON users((lower(email)));

- Set your own database credentials in the database.js file 
- run in in commandline with command 

$ deno run --unstable --allow-all --watch run-locally.js

- go to localhost:7777 on your browser

---

online location for application:

<https://deno-quizapp.herokuapp.com>
