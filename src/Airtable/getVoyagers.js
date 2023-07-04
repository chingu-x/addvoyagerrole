import Airtable from 'airtable'
import { getApplicationByDiscordName } from './getApplicationByDiscordName.js'

// Retrieve Chingus who have signed up to particpate in the specified Voyage
const getVoyagers = async (voyageName) => {
  return new Promise(async (resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE)
    const filter = "AND(" + 
      '{Voyage} = \"' + voyageName + "\", " + 
      '{Status} = "Active"' + 
    ")"
    
    process.env.MODE.toUpperCase() === 'TEST' && 
      console.log(`...getVoyagers - filter: ${ filter }`)

    base('Voyage Signups').select({ 
      filterByFormula: filter,
      view: 'Most Recent Voyage Signups',
      fields: ['Email', 'Discord Name', 'Voyage'],
    })
    .firstPage(async (err, records) => {
      if (err) { 
        console.error('getVoyagers - filter: ', filter)
        console.error(err) 
        reject(err) 
      }

      // If the record is found return its id. Otherwise, return null if it's
      // not found
      let voyageSignups = []
      for (let i = 0; i < records.length; ++i) {
        const discordId = await getApplicationByDiscordName(records[i].get('Discord Name'))
  
        if (records.length > 0) {    
          voyageSignups.push({ 
            airtable_id: records[i].id,
            email: records[i].get('Email'),
            discordName: records[i].get('Discord Name'),
            discordId: discordId,
            voyage: records[i].get('Voyage'),
          })
          resolve(voyageSignups)
        }
      }
      resolve(null)
    })
  })
}

export { getVoyagers }