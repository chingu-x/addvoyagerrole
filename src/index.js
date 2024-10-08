import * as dotenv from 'dotenv'
import updateDiscordUserIDs from './updateDiscordUserIDs.js'

// Run the task to update unique Discord ID's for users in the Chingu
// Discord server
(async () => {
  console.log('Update of Voyager Roles starting...')
  const startDate = new Date()
  dotenv.config()
  console.log('index.js - starting update')
  await updateDiscordUserIDs()
  console.log(`Update started at ${startDate.toISOString()} finished ${new Date().toISOString()}`)
})()