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
We recomment to use [pm2](https://github.com/Unitech/pm2) to run the app:

```javascript
pm2 start index.js
```

# Slack button
<a href="https://slack.com/oauth/authorize?scope=incoming-webhook&client_id=11204901365.18486561444"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"></a>

# License

BSD
