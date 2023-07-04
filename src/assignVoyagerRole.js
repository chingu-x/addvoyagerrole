import { Client, GatewayIntentBits } from 'discord.js'
import { getVoyagers } from './Airtable/getVoyagers.js'
import { getVoyageSchedule } from './Airtable/getVoyageSchedule.js'
import addRoleToUsers from './Discord/addRoleToUsers.js'
import getUsersWithVoyagerRole from './Discord/getUsersWithVoyagerRole.js'

const assignVoyagerRole = async (voyageName) => {
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
        // Retrieve the guild object for Chingu's Discord server
        const guild = await client.guilds.fetch(process.env.GUILD_ID)
  
        // Identify which Voyage will be starting next
        const nextVoyage = await getVoyageSchedule(voyageName)
        process.env.MODE.toUpperCase() === 'TEST' &&
          console.log(`...assignVoyagerRole - nextVoyage: `, nextVoyage)

        // Start be retrieving all Discord users with the Voyager Role and all Chingus
        // who are signed up for the next Voyage
        const discordUsers = await getUsersWithVoyagerRole(client, guild)
        process.env.MODE.toUpperCase() === 'TEST' &&
          console.log('...assignVoyagerRole - voyagerRole: ', discordUsers.role, 
            ' discordUsers: ', discordUsers.members)

        const voyageSignups = await getVoyagers(voyageName)
        process.env.MODE.toUpperCase() === 'TEST' &&
          console.log(`...assignVoyagerRole - voyageSignups: `,voyageSignups)

        // Add the Voyager role to all Discord users signed up for the next Voyage
        await addRoleToUsers(client, guild, discordUsers.role, voyageSignups)

        // Remove the Voyager role from any Discord users who have it, but aren't
        // signed up for the next Voyage
      })
    }
    catch(err) {
      console.log('='.repeat(30))
      console.log('Error assigning Voyager role to users')
      console.log(err)
      client.destroy() // Terminate this Discord bot
      reject(null)
    }
  })
}

export { assignVoyagerRole }