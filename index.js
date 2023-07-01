import { Command } from 'commander'
import * as dotenv from 'dotenv'
//import extractDiscordUsers from './src/extractDiscordUsers.js'

// Process a request to extract user accounts from the Chingu Discord server
(async () => {
  const program = new Command()
  dotenv.config()
  program 
    .command('assign <voyage>')
    .description('Assign Voyager role to Discord users signed up for next Voyage')
    .action(async (voyage, options, command) => {
      try {
        console.log('voyage: ', voyage, ' options: ', options, ' command: ', command)
        if (command._name === 'assign') {
          //await assignVoyagerRole(voyage.toLowerCase())
        }
      }
      catch (err) {
        console.log(err)
        process.exit(0)
      }
    })

    program.parse(process.argv)
  })()
