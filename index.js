import { Command } from 'commander'
import * as dotenv from 'dotenv'
import { FgWhite, FgGreen } from './src/util/constants.js'
import { assignVoyagerRole } from './src/assignVoyagerRole.js'
import { getVoyageScheduleByDate } from './src/Airtable/getVoyageSchedule.js'

// Process a request to extract user accounts from the Chingu Discord server
(async () => {
  const program = new Command()
  dotenv.config()
  program 
    .command('assign')
    .description('Assign Voyager role to Discord users signed up for next Voyage')
    .action(async (options, command) => {
      try {
        if (command._name === 'assign') {
          // Check to see if a Voyage is underway
          const currentISODate = (new Date()).toISOString().slice(0,10)
          const voyage = await getVoyageScheduleByDate(currentISODate)
          const voyageName = voyage ? voyage.voyageName : null
          console.log(`index - Processing voyage:`, voyageName)
          process.env.MODE.toUpperCase() === 'TEST' && console.log(`${FgWhite}index - currentISODate:${FgGreen}${ currentISODate } ${FgWhite}activeVoyage:${FgGreen}`, voyage)
          if (voyageName !== null && voyageName !== undefined) {
            await assignVoyagerRole(voyageName)
          }
        } else {
            console.log(`${FgWhite}index - No Voyage underway at this time${FgGreen}`)
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