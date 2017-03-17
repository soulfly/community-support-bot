# Overview
StackOverflow tags trigger for Slack

# Setup
In order to run the node.js app you have to edit **config.js**:

```javascript
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
    },
    chatDialogId: null
  },
  stackoverflow: {
    mainTag: "quickblox",
    additionalTags: ["android"]
  }
};
```

# Run
We recommend to use [pm2](https://github.com/Unitech/pm2) to run the app:

```javascript
pm2 start index.js
```

# License

BSD
