import Airtable from 'airtable'
import { getApplicationByEmail } from './getApplicationByEmail.js'

// Retrieve Chingus who have signed up to particpate in the specified Voyage
const getVoyagers = async (voyageName) => {
  return new Promise(async (resolve, reject) => {
    let voyageSignups = []

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
    .eachPage(async function page(records, fetchNextPage) {
      // If the record is found return its id. Otherwise, return null if it's
      // not found
      const adminIDs = ['jdmedlock', 'hypno', 'notcori', 'travel_light']
      for (let i = 0; i < records.length; ++i) {
        const discordId = await getApplicationByEmail(records[i].get('Email').trim())
        
        if (discordId === 0) {
          console.warn(`...getVoyagers - Voyager Application email not found: ${ records[i].get('Email').trim() }`)
        } else {
          if (records.length > 0 && !adminIDs.includes(records[i].get('Discord Name'))) {    
            voyageSignups.push({ 
              airtable_id: records[i].id,
              email: records[i].get('Email'),
              discordName: records[i].get('Discord Name'),
              discordId: discordId,
              voyage: records[i].get('Voyage'),
            })
          }
        }
      }

      // To fetch the next page of records, call 'fetchNextPage'.
      // If there are more records, 'page' will get called again.
      // If there are no more records, 'done' will get called.
      fetchNextPage()
    }, function done(err) {
      if (err) { 
        console.error('...getVoyagers - filter: ', filter)
        console.error(err) 
        reject(err) 
      }
      resolve(voyageSignups)
    })
  })
}

export { getVoyagers }