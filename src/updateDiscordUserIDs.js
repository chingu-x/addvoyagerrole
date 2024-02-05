import { Client, GatewayIntentBits } from 'discord.js'
import { addDiscordIDToApplication } from './utils/Application.js'
import { getSoloProjectEvalStatus, updateSoloProjectEvalStatus } from './utils/SoloProject.js'

const MS_PER_DAY = 86400000

const updateDiscordUserIDs = async () => {
  return new Promise(async (resolve, reject) => {
    const client = new Client({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMembers,
        ],
      })
    const login = await client.login(process.env.DISCORD_TOKEN)

    try {
      client.on('ready', async () => {
        // Retrieve all guild members
        const guild = await client.guilds.fetch(process.env.GUILD_ID)
        // Use the following for testing against and individual Chingu 
        //const members = await guild.members.fetch({ query: 'forrrrest', limit: 5 } )
        const members = await guild.members.fetch({ })
        console.log('\nGuild members...')
        let memberCount = 0
        for (const member of members) {
          memberCount = ++memberCount
          let userName
          if (member[1].user.discriminator === "0") {
            userName = member[1].user.username
          } else {
            userName = member[1].user.username.concat('#', member[1].user.discriminator)
          }

          // Skip any users whose Discord names contain double quotes, which can't
          // be encoded in an Airtable filter
          let updateResult
          let soloProjectEvalStatus
          const daysSinceJoined = Number.parseInt((Date.now() - member[1].joinedTimestamp) / MS_PER_DAY)
          
          if (userName.indexOf('"') !== -1 || daysSinceJoined > process.env.DAYS_TO_SEARCH) {
            updateResult = "Skipping"
          } else {
            updateResult = await addDiscordIDToApplication(userName, member[1].user.id)

            // If the current Solo Project status is `Not in Discord` change it to `Waiting Eval`
            soloProjectEvalStatus = await getSoloProjectEvalStatus(member[1].user.id)
            if (soloProjectEvalStatus !== null && soloProjectEvalStatus.soloProjectEvalStatus === 'Not in Discord') {
              await updateSoloProjectEvalStatus(soloProjectEvalStatus.recordID, 'Waiting Eval')
            }
          }
          if (updateResult !== 'Skipping') {
            console.log(`${ memberCount.toString().padStart(5,"0") } id: ${ member[1].user.id } userName: ${ userName } daysSinceJoined: ${ daysSinceJoined } updateResult: ${ updateResult }`)
          }
        }
        console.log('\n--------------')
        client.destroy() // Terminate this Discord bot

        resolve(true)
      })
    }
    catch(error) {
      console.log('='.repeat(30))
      console.log('Error retrieving Guild Members:')
      console.log(error)
      client.destroy() // Terminate this Discord bot
      reject(error)
    }
  })
}

export default updateDiscordUserIDs