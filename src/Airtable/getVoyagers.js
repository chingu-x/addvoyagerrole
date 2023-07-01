import Airtable from 'airtable'

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
      view: 'Most Recent Voyage Signups' 
    })
    .firstPage((err, records) => {
      if (err) { 
        console.error('getVoyagers - filter: ', filter)
        console.error(err) 
        reject(err) 
      }

      // If the record is found return its id. Otherwise, return null if it's
      // not found
      for (let i = 0; i < records.length; ++i) {
        if (records.length > 0) {
          resolve(records[i].id)
        }
      }
      resolve(null)
    })
  })
}

export { getVoyagers }