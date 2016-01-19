# Overview 
StackOverflow tags trigger for Slack

# Setup
In order to run the node.js app you have to edit **config.js**:

```javascript
var CONFIG = {
  webhookUrl: "...",
  mainTag: "quickblox",
  additionalTags: ["android"],
  newQuestionIntervalInSeconds: 60,
  runScheduleForCron: '15 * * * *',
  logMode: 2 // 1 is console, 2 is file
};
```

# Run
We recommend to use [pm2](https://github.com/Unitech/pm2) to run the app:

```javascript
pm2 start index.js
```

# License

BSD
