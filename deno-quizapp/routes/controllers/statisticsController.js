import * as statisticsService from "../../services/statisticsService.js";

const showStatistics = async ({ render, user }) => {
    render("statistics.eta", {
        answers:  await statisticsService.getAnswerCount(user.id),
        correct:  await statisticsService.getCorrectCount(user.id),
        answered: await statisticsService.getOwnQuestionCount(user.id),
        topFive:  await statisticsService.getTop(),
    });
}


export{ showStatistics }








