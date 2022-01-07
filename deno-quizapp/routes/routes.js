import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as statisticsController from "./controllers/statisticsController.js";
import * as questionApi from "../routes/apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.post("/questions", questionController.addQuestion);
router.get("/questions", questionController.listQuestions);
router.get("/questions/:id", optionController.getQuestion);
router.post("/questions/:id/delete", questionController.deleteQuestion);

router.post("/questions/:id/options", optionController.addOption);
router.post("/questions/:questionId/options/:optionId/delete", optionController.deleteOption);


router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/quiz", quizController.getRandomQuestion)
router.get("/quiz/:id", quizController.showQuestion)

router.post("/quiz/:id/options/:optionId", quizController.getOption)

router.get("/quiz/:id/correct", quizController.wasCorrect)
router.get("/quiz/:id/incorrect", quizController.wasIncorrect)

router.get("/statistics", statisticsController.showStatistics)
router.get("/api/questions/random", questionApi.getRandomQuestion)
router.post("/api/questions/answer", questionApi.wasCorrect)

export { router };
