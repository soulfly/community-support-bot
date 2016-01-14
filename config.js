var CONFIG = {
  webhookUrl: null,
  mainTag: "quickblox",
  additionalTags: ["android"],
  newQuestionIntervalInSeconds: 60,
  runScheduleForCron: '15 * * * *',
  logMode: 2 // 1 is console, 2 is file
};

module.exports = CONFIG;
