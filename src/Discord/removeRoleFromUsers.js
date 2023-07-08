const removeRoleFromUsers = async (guild, discordUsers, voyageSignups) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Identify Discord users with the Voyager role who aren't in the list of 
      // those from Airtable who have signed up for the Voyage.
      for (let voyager of discordUsers.members) {
        let matchingSignup = null
        if (voyageSignups !== null) { // Check for any signups for this Voyage in Airtable
          matchingSignup = voyageSignups.find((signup) => signup.discordId === voyager.voyager.user.id)
        }
        if (!matchingSignup) {
          console.log('...removeRoleFromUsers - Discord user not signed up: ', voyager.voyager.user.username)
          process.env.MODE.toUpperCase() === 'PROD' &&
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