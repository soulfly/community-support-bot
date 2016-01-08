var CONFIG = {
  webhookUrl: null,
  mainTag: "quickblox",
  additionalTags: ["android"],
  newQuestionIntervalInSeconds: 60,
  runScheduleForCron: '*/60 * * * * *',
  logMode: 2 // 1 is console, 2 is file
};

module.exports = CONFIG;
