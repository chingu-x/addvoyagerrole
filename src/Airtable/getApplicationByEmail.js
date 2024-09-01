import Airtable from 'airtable'

// Retrieve the first Application row matching a user's email address
const getApplicationByEmail = async (email) => {
  return new Promise(async (resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE)

    const filter = `{Email} = "${ email }"`
    process.env.MODE.toUpperCase() === 'TEST' &&
      console.log('...getApplicationByEmail - filter: ', filter)

    base('Applications').select({ 
      filterByFormula: filter,
      view: 'Applications',
      fields: ['Email', 'Discord ID'], 
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

export { getApplicationByEmail }