const removeRoleFromUsers = async (guild, discordUsers, voyageSignups) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Identify Discord users with the Voyager role who aren't in the list of 
      // those from Airtable who have signed up for the Voyage.
      console.log('discordUsers.members: ', discordUsers.members)
      for (let voyager of discordUsers.members) {
        console.log('voyager: ', voyager.voyager.user)
        let matchingSignup = null
        if (voyageSignups !== null) {
          matchingSignup = voyageSignups.find((signup) => signup.discordId === voyager.voyager.user.id)
        }
        if (!matchingSignup) {
          console.log('...removeRoleFromUsers - Discord user not signed up: ', voyager.voyager.user.username)
          voyager.voyager.roles.remove(discordUsers.role)
        }
      } 
      resolve()
    }
    catch(err) {
      console.log('='.repeat(30))
      console.log('removeRoleFromUsers: Error removing Voyager role from users')
      console.log(err)
      reject(err)
    }
  })
}

export default removeRoleFromUsers