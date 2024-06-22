const removeRoleFromUsers = async (guild, discordUsers, voyageSignups) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('...Preparing to remove role from users...')
      // Identify Discord users with the Voyager role who aren't in the list of 
      // those from Airtable who have signed up for the Voyage.
      for (let voyager of discordUsers.members) {
        let keepRole = false
        let matchingSignups = []
        if (voyageSignups !== null) { // Check for any signups for this Voyage in Airtable
          matchingSignups = voyageSignups.filter((signup) => signup.discordId === voyager.voyager.user.id)
          // Retain the Voyager role for anyone who dropped one team and moved to another.
          // Do this by searching the voyageSignups array to see if the Voyager has
          // multiple signups, one of which is in either `Active` or `Inactive` status.
          keepRole = matchingSignups.find((signup) => signup.discordId === voyager.voyager.user.id && 
            (signup.status === 'Active' || signup.status === 'Inactive'))
        }
        if (!keepRole) {
          console.log('...removeRoleFromUsers - Removing Voyager role from user: ', voyager.voyager.user.username)
          process.env.MODE.toUpperCase() === 'PROD' &&
            voyager.voyager.roles.remove(discordUsers.role)
          keepRole = false
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