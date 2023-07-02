import { Client, GatewayIntentBits } from 'discord.js'

const getUsersWithVoyagerRole = async () => {
  const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
      ],
    })
  const login = await client.login(process.env.DISCORD_TOKEN)

  try {
    client.on('ready', async () => {
      const guild = await client.guilds.fetch(process.env.GUILD_ID)
      process.env.MODE.toUpperCase() === 'TEST' && 
        console.log('...getVoyagers - guild: ', guild.name)

      const members = await guild.members.fetch()

      const voyagerRole = guild.roles.cache.get('1104544072347160578')
      process.env.MODE.toUpperCase() === 'TEST' && 
        console.log('...getVoyagers - Voyage role: ', voyagerRole.name) 

      const voyagers = guild.roles.cache.get(voyagerRole.id).members.map(m => m)
      process.env.MODE.toUpperCase() === 'TEST' && 
        console.log('...getVoyagers - members with Voyage role: ') 

      let voyagerCount = 0
      for (const voyager of voyagers) {

        voyagerCount = ++voyagerCount
        const userName = voyager.user.username
        const userId = voyager.user.id
        process.env.MODE.toUpperCase() === 'TEST' && 
          console.log(`...Voyager - id: ${ userId } name: ${ userName }`) 
      }
    })
  }
  catch(err) {
    console.log('='.repeat(30))
    console.log('Error retrieving users with the Voyager role:')
    console.log(err)
    await client.destroy() // Terminate this Discord bot
  }

}

export default getUsersWithVoyagerRole