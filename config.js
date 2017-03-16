var CONFIG = {
  slack: {
    webhookUrl: null
  },
  quickblox: {
    appId: 0,
    authKey: null,
    authSecret: null,
    botUser: {
      login: null,
      password: null
    }
    chatDialogId: null
  },
  stackoverflow: {
    mainTag: "quickblox",
    additionalTags: ["android"]
  }
};

module.exports = CONFIG;
