import Airtable from 'airtable'

// Retrieve the Solo Project status for the specified unique Discord ID. 
const getSoloProjectEvalStatus = async (discordID) => {
  return new Promise(async (resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE)
    const filter = '{Discord ID} = \"' + discordID + "\" "

    base('Solo Projects').select({ 
      filterByFormula: filter,
      view: 'Waiting Evaluation' 
    })
    .firstPage((err, records) => {
      if (err) { 
        console.error('getSoloProjectStatus - filter: ', filter)
        console.error(err) 
        reject(err) 
      }

      // If the record is found return its record id and status. Otherwise, return null if it's
      // not found
      for (let i = 0; i < records.length; ++i) {
        if (records.length > 0) {
          resolve({
            "recordID": records[i].id,
            "soloProjectEvalStatus": records[i].fields['Evaluation Status']
          })
        }
      }
      resolve(null)
    })
  })
}

// Update the status in an exising Solo Project row in Airtable with the specified evaluation status value
const updateSoloProjectEvalStatus = async (recordID, newStatus) => {
  return new Promise(async (resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE)

    base('Solo Projects').update([
      {
        "id": recordID,
        "fields": {
          "Evaluation Status": newStatus,
        }
      }
    ], (err, records) => {
      if (err) {
        console.error('Error:', err)
        reject(err)
      }

      if (records) {
        resolve(records[0].id)
      } else {
        resolve(null)
      }
    })
  })
}

export { getSoloProjectEvalStatus, updateSoloProjectEvalStatus }