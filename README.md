# Oh My Jordi Slack BOT

![Image of Slack BOT](https://raw.githubusercontent.com/iamgoangle/slack/master/screenshot/logo.png)

Jordy is my best friends. This is my an experiment to create a Slack bot. The Slack API provides fully features and heavily documented, which means it can be easy to get confused to getting start to trap the message event from Slack or push message to Slack Webhook.

In the repository, I implement Slack bot application with the Slack Node.js SDK and Express for HTTP Framework.

### Prerequsitions

- Create new app <https://api.slack.com/apps?new_app=1>.
- Click **"Add features and functionality > Bots"** for choosing the features and configure your bot.
- Grant oAuth for `bot` permission.
- Copy token from **OAuth & Permissions** menu.

You can configure your bot profile in Basic Information.

### How to develop Slack Bot in local

<https://slack.dev/node-slack-sdk/tutorials/local-development>

#### Usecase: Create BOT to listening workspace events

Your bot can subscribe all or specific of event in Slack such as new message in your channels.

![Image of BOT Event](https://raw.githubusercontent.com/iamgoangle/slack/master/screenshot/event_subscribe.jpg)

- Start your node server. I am running using port `:3000` for the example.
- Start `ngrok http 3000` I using ngrok for expose my node application to publicly accessible URL.
- Go to **Event Subscriptions menu**, then enter your url. For example `https://8e8ec2d7.ngrok.io/slack/events`.
- Grant **oAuth Scope** for bot event subscribe.

**Read more about events** <https://api.slack.com/events/message>

### Use case: Interactive Messages

<https://slack.dev/node-slack-sdk/interactive-messages>

### Customize Slack BOT

[slack.com/customize/slackbot](https://slack.com/customize/slackbot?utm_source=zapier.com&utm_medium=referral&utm_campaign=zapier&utm_source=zapier.com&utm_medium=referral&utm_campaign=zapier)

### Other options

<https://hubot.github.com/> provides capability to create a Slack bot and also contains give developer to use the tools to easily developer their own slack application.
