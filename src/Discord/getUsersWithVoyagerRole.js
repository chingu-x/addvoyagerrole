import { Client, GatewayIntentBits } from 'discord.js'

let membersWithVoyagerRole = []

const getUsersWithVoyagerRole = async () => {
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
        process.env.MODE.toUpperCase() === 'TEST' && 
          console.log('...getUsersWithVoyagerRole - guild: ', guild.name)

        await guild.roles.fetch() // Prime the DiscordJS cache
        await guild.members.fetch() // Prime the DiscordJS cache

        // Retrieve the Role object for the Voyager role
        const voyagerRole = guild.roles.cache.find(role => role.name === "Voyager")
        process.env.MODE.toUpperCase() === 'TEST' && 
          console.log('...getUsersWithVoyagerRole - Voyage role: ', voyagerRole.name) 

        // Retrieve the members who have the Voyager role
        const voyagers = guild.roles.cache.find(role => role.id === voyagerRole.id)
            .members.map(member => member)

        // Create an array containing the members with this role
        for (const voyager of voyagers) {
          membersWithVoyagerRole.push({
            voyager: voyager
          })
        }
        
        resolve({
          role: voyagerRole,
          members: membersWithVoyagerRole
        })
      })

    }
    catch(err) {
      console.log('='.repeat(30))
      console.log('Error retrieving users with the Voyager role:')
      console.log(err)
      client.destroy() // Terminate this Discord bot
      reject(null)
    }
  })
}

export default getUsersWithVoyagerRole