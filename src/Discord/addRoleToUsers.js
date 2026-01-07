const addRoleToUsers = async (guild, voyageRole, voyageSignups) => {
  try {
    console.log('...Preparing to add role to users...')
    if  (voyageSignups !== null) {
      for (let voyager of voyageSignups) {
        // Retrieve the Discord user object and assign the Voyager role
        const member = await guild.members.cache.find((member) => member.user.id === voyager.discordId)
        console.log('...addRoleToUsers - Discord user signed up: ', voyager.voyage, ' name: ', voyager.discordName, ' id: ', voyager.discordId, ' confirmationCompleted: ', voyager.confirmationCompleted)
        if (member && voyager.confirmationCompleted === 'Yes') {
          process.env.MODE.toUpperCase() === 'PROD' &&
            await member.roles.add(voyageRole)
        } else {
          console.log('...addRoleToUsers - Discord user not found: ', voyager.voyage, ' name: ', voyager.discordName, ' id: ', voyager.discordId, ' confirmationCompleted: ', voyager.confirmationCompleted)
        }
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