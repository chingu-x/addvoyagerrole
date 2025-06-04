import Airtable from 'airtable'

// Retrieve the schedule for the specified Voyage
const getVoyageSchedule = async (voyageName) => {
  return new Promise(async (resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE)
    const filter = "{Name} = \"" + voyageName.toUpperCase() + "\""

    console.log('filter: ', filter)

    base('Schedules').select({ 
      fields: ['Name', 'Type', 'Start Date', 'End Date'],
      filterByFormula: filter,
      view: 'Voyages' 
    })
    .firstPage((err, records) => {
      console.log('err: ', err)
      if (records.length === 0) {
        reject('Voyage schedule not found')
      }

      if (err) { 
        console.error('filter: ', filter)
        console.error(err) 
        reject(err) 
      }

      const voyageStartDt = records[0].get('Start Date')
      const voyageEndDt = records[0].get('End Date')

      resolve({
        voyageName: records[0].get('Name'),
        startDt: voyageStartDt,
        endDt: voyageEndDt,
      })
    })

  })
}

// Retrieve the schedule for the Voyage whose start and ending dates fall
// around the specified date. Return null if a Voyage is not underway
const getVoyageScheduleByDate = async (dateToFind) => {
  return new Promise(async (resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE)
    const filter = "AND(" + 
        "DATESTR({Start Date}) <= \"" + dateToFind + "\", " +
        "DATESTR({End Date}) >= \"" + dateToFind + "\" " +
      ")"

    console.log('getVoyageScheduleByDate - filter: ', filter)

    base('Schedules').select({ 
      fields: ['Name', 'Type', 'Start Date', 'End Date'],
      filterByFormula: filter,
      view: 'Schedules' 
    })
    .firstPage((err, records) => {
      if (err) { 
        console.error('filter: ', filter)
        console.error(err) 
        reject(err) 
      }

      if (records.length === 0) {
        resolve({
          voyageName: 'V??',
          startDt: null,
          endDt: null
        })
        return null
      }

      const voyageStartDt = records[0].get('Start Date')
      const voyageEndDt = records[0].get('End Date')

      resolve({
        voyageName: records[0].get('Name'),
        startDt: voyageStartDt,
        endDt: voyageEndDt
      })
    })

  })
}

export { getVoyageSchedule, getVoyageScheduleByDate }