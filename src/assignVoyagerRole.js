import { getVoyagers } from './Airtable/getVoyagers.js'
import { getVoyageSchedule } from './Airtable/getVoyageSchedule.js'
import addRoleToUsers from './Discord/addRoleToUsers.js'
import getUsersWithVoyagerRole from './Discord/getUsersWithVoyagerRole.js'

const assignVoyagerRole = async (voyageName) => {
  // Identify which Voyage will be starting next
  const nextVoyage = await getVoyageSchedule(voyageName)
  process.env.MODE.toUpperCase() === 'TEST' &&
    console.log(`...assignVoyagerRole - nextVoyage: `, nextVoyage)

  // Start be retrieving all Discord users with the Voyager Role and all Chingus
  // who are signed up for the next Voyage
  const discordUsers = await getUsersWithVoyagerRole()
  process.env.MODE.toUpperCase() === 'TEST' &&
    console.log('...assignVoyagerRole - voyagerRole: ', discordUsers.role, 
      ' discordUsers: ', discordUsers.members)

  const voyageSignups = await getVoyagers(voyageName)
  process.env.MODE.toUpperCase() === 'TEST' &&
    console.log(`...assignVoyagerRole - voyageSignups: `,voyageSignups)

  // Add the Voyager role to all Discord users signed up for the next Voyage
  await addRoleToUsers(discordUsers.role, voyageSignups)

  // Remove the Voyager role from any Discord users who have it, but aren't
  // signed up for the next Voyage
}

export { assignVoyagerRole }