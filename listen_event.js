const { createEventAdapter } = require('@slack/events-api')
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET)
const port = process.env.PORT || 3000

// Attach listeners to `message` events
// See: https://api.slack.com/events/message.im
slackEvents.on('message', async event => {
    try {
        console.log(
            `Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`
        )
    } catch (e) {
        console.error(e)
    }
})

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error)

// Start a basic HTTP server
slackEvents.start(port).then(() => {
    // Listening on path '/slack/events' by default
    console.log(`server listening on port ${port}`)
})
