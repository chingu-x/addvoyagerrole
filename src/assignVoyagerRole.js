import { getVoyagers } from './Airtable/getVoyagers.js'
import getUsersWithVoyagerRole from './Discord/getUsersWithVoyagerRole.js'

const assignVoyagerRole = async (voyageName) => {
  const discordUsers = await getUsersWithVoyagerRole()
  process.env.MODE.toUpperCase() === 'TEST' &&
    console.log(`...assignVoyagerRole - discordUsers: ${ discordUsers }`)

  const voyageSignups = await getVoyagers(voyageName)
  process.env.MODE.toUpperCase() === 'TEST' &&
    console.log(`...assignVoyagerRole - voyageSignups: ${ voyageSignups }`)
}

export { assignVoyagerRole }