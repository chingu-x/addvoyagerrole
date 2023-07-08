const addRoleToUsers = async (guild, voyageRole, voyageSignups) => {
  try {
    if  (voyageSignups !== null) {
      for (let voyager of voyageSignups) {
        // Retrieve the Discord user object and assign the Voyager role
        const member = await guild.members.cache.find((member) => member.user.id === voyager.discordId)
        console.log('...addRoleToUsers - Discord user signed up: ', voyager.voyage, ' name: ', voyager.discordName, ' id: ', voyager.discordId)
        process.env.MODE.toUpperCase() === 'PROD' &&
          await member.roles.add(voyageRole)
      }
    }
  }
  catch(err) {
    console.log('='.repeat(30))
    console.log('addRoleToUsers: Error assigning Voyager role to users')
    console.log(err)
  }
}

export default addRoleToUsers