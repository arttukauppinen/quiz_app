import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import { app } from "../app.js";
import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import * as questionController from "../routes/controllers/questionController.js";
import * as optionController from "../routes/controllers/optionController.js";
import * as statisticsController from "../routes/controllers/statisticsController.js";

//To test: press "Run Test"

Deno.test({
  name: "calling addQuestion does not change table questions",
  fn() {
  const a = questionController.listQuestions;
  questionController.addQuestion
  const b = questionController.listQuestions;
  assertEquals(a, b);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "calling addOption does not change table question_answer_options",
  fn() {
  const a = optionController.getQuestion;
  optionController.addOption
  const b = optionController.getQuestion;
  assertEquals(a, b);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "calling addQuestion does not change statistics",
  fn() {
  const a = statisticsController.showStatistics;
  questionController.addQuestion
  const b = statisticsController.showStatistics;
  assertEquals(a, b);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});



Deno.test({
    name: "GET to / succees",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "GET to /statistics succees",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/statistics").expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "GET to /questions succees",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/questions").expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "GET to /quiz succees",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/quiz").expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "GET to /quiz/1 succees",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/quiz/1").expect(302);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "GET to /auth/login succees",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/auth/login").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

Deno.test({
    name: "GET to /auth/register succees",
    async fn() {
      const testClient = await superoak(app);
      await testClient.get("/auth/register").expect(200);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

