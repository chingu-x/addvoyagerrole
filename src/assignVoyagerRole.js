import { getVoyagers } from './Airtable/getVoyagers.js'

const assignVoyagerRole = async (voyageName) => {
  const voyagers = await getVoyagers(voyageName)
  process.env.MODE.toUpperCase() === 'TEST' &&
    console.log(`...assignVoyagerRole - voyagers: ${ voyagers }`)
}

export { assignVoyagerRole }