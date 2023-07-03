import { Client, GatewayIntentBits } from 'discord.js'

const addRoleToUsers = async (voyageRole, voyageSignups) => {
  return new Promise(async (resolve, reject) => {
    console.log('...addRoleToUsers - voyageSignups: ', voyageSignups)
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
          console.log('...addRoleToUsers - guild: ', guild.name)

        for (let voyager in voyageSignups) {
          console.log('...voyager: ', voyager)
          //member.roles.add(role)
        }

        
        resolve()
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

export default addRoleToUsers