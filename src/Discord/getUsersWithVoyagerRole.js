import { Client, GatewayIntentBits } from 'discord.js'

let membersWithVoyagerRole = []

const getUsersWithVoyagerRole = async (client, guild) => {
  return new Promise(async (resolve, reject) => {
    try {
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