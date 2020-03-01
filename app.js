const { createServer } = require('http')
const express = require('express')
const bodyParser = require('body-parser')

const dotenv = require('dotenv')
dotenv.config()

const { createEventAdapter } = require('@slack/events-api')
const { createMessageAdapter } = require('@slack/interactive-messages')
const { WebClient } = require('@slack/web-api')
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET
const port = process.env.PORT || 3000

// slackEvents represents attach slack event
// sdk: https://slack.dev/node-slack-sdk/events-api
// events: https://api.slack.com/events
const slackEvents = createEventAdapter(slackSigningSecret)

// slackInteractions represents interaction messages
// sdk: https://slack.dev/node-slack-sdk/interactive-messages
const slackInteractions = createMessageAdapter(slackSigningSecret)

const app = express()
app.use('/slack/events', slackEvents.expressMiddleware())
app.use('/slack/actions', slackInteractions.expressMiddleware())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * message
 * event listener when have a new message in channel
 */
slackEvents.on('message', async event => {
    try {
        console.log(
            `Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`
        )
    } catch (e) {
        console.error(e)
    }
})

/**
 * app_mention
 * event listener when user in channel mention `@jordi`
 */
slackEvents.on('app_mention', async event => {
    try {
        console.log(JSON.stringify(event))
    } catch (e) {
        console.log(JSON.stringify(e))
    }
})

/**
 * /command/weather
 * doc: https://api.slack.com/interactivity/slash-commands
 */
app.post('/slack/command/weather', (req, res) => {
    const text = req.body.text
    const regex = /^now$/g

    if (!regex.test(text)) {
        const data = {
            response_type: 'ephemeral',
            text: "Sorry, that didn't work. Please try again.",
        }

        res.status(200).json(data)
        return
    }

    const data = {
        response_type: 'in_channel',
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: "*It's 80 degrees right now.*",
                },
            },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: 'Partly cloudy today and tomorrow',
                },
            },
        ],
        text: 'Do you want to see my videos? eiei',
        attachments: [
            {
                image_url: 'https://http.cat/200.jpg',
            },
        ],
    }

    res.json(data)
})

const server = createServer(app)
server.listen(port, () => {
    console.log(`Listening for events on ${server.address().port}`)
})
