import { Command } from 'commander'
import * as dotenv from 'dotenv'
import { assignVoyagerRole } from './src/assignVoyagerRole.js'

// Process a request to extract user accounts from the Chingu Discord server
(async () => {
  const program = new Command()
  dotenv.config()
  program 
    .command('assign <voyage>')
    .description('Assign Voyager role to Discord users signed up for next Voyage')
    .action(async (voyage, options, command) => {
      try {
        console.log(`index - Processing voyage: ${ voyage }`)
        if (command._name === 'assign') {
          await assignVoyagerRole(voyage.toUpperCase())
        }
        console.log(`...index - Processing ended without error`)
      }
      catch (err) {
        console.log(err)
        process.exit(0)
      }
    })

    program.parse(process.argv)
  })()
