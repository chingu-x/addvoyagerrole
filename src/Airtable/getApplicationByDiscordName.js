import Airtable from 'airtable'

// Retrieve the first Application row matching a user's Discord Name
const getApplicationByDiscordName = async (discordName) => {
  return new Promise(async (resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE)

    const filter =  
        `{Discord Name} = "${ discordName }"`

    base('Applications').select({ 
      filterByFormula: filter,
      view: 'Applications' 
    })
    .firstPage((err, records) => {
      if (err) { 
        console.error('filter: ', filter)
        console.error(err) 
        reject(err) 
      }

      // Return the number of Applications submitted in this date range
      if (records !== null && records !== undefined) {
        const discordId = records[0].get('Discord ID')
        resolve(discordId)
      }
      resolve(0)
    })
  })
}

export { getApplicationByDiscordName }