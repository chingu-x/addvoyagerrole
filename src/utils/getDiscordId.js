import Airtable from 'airtable'

// Retrieve the a user's unique Discord Id by retrieving it from their
// Applications table row using their email address
const getDiscordId = async (discordName) => {
  return new Promise(async (resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE)

    const filter =  
        `{Discord Name} = "${ discordName }"`

    base('Applications').select({ 
      filterByFormula: filter,
      view: 'Applications' 
    })
    .firstPage(async (err, records) => {
      if (err) { 
        console.error('filter: ', filter)
        console.error(err) 
        reject(null) 
      }

      // Return the user's Discord id
      try {
        const discordId = records[0].get('Discord ID')
        resolve(discordId)
      }
      catch(err) {
        resolve(null)
      }
    })
  })
}

export default getDiscordId