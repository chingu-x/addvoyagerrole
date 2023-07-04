const addRoleToUsers = async (client, guild, voyageRole, voyageSignups) => {
  console.log('...addRoleToUsers - voyageSignups: ', voyageSignups)
  process.env.MODE.toUpperCase() === 'TEST' && 
    console.log('...addRoleToUsers - guild: ', guild.name)

  await guild.roles.fetch() // Prime the DiscordJS cache
  await guild.members.fetch() // Prime the DiscordJS cache

  for (let voyager in voyageSignups) {
    console.log('...voyager: ', voyager)
    
    // Retrieve the Discord user object and assign the Voyager role
    //member.roles.add(role)
  }
}

export default addRoleToUsers