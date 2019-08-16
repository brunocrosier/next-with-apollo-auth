const Query = {
    async users(root, args, context) {
      const users = await context.prisma.users()
      return users
    },
    async me(root, args, context) {

      // console.log('trying to run me query')
  
      // if (context.request.user.id === undefined) console.log('hey bruno helloooooooooooooooo')
  
      const user = await context.prisma.user({ id: context.request.user.id })
      // const user = await context.prisma.user({ id: "cjy3o0qvsw8rg0b537duqru8q" })

      console.log("me says:", user)
      // if (user === undefined) throw new Error("No user found, sorry!")
  
      return user
    },
    async locations(root, args, context) {
      const locations = await context.prisma.locations()
      return locations
    },
    async matches(root, args, context, info) {
      // const matches = await context.prisma.matches()
      // return matches
  
      const fragment = `
        fragment MatchesFragment on Match {
          title
          description
          price
          location {
            id
            coordinates
            title
            description
          }
          id
          kickoff
          duration
          maxPlayers
          createdAt
          updatedAt
      }
  `
  
      const matches = await context.prisma.matches().$fragment(fragment)
      return matches
    }
  }
  
  module.exports = Query
  