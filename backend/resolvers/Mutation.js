const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { APP_SECRET, getUserId } = require("../utils")

const Mutation = {
 
  async createMatch(root, args, context) {
    const userId = getUserId(context)

    if (!userId) throw new Error("Sorry you gotta be logged in")

    return context.prisma.createMatch({
      title: args.data.title,
      description: args.data.description,
      kickoff: args.data.kickoff,
      duration: args.data.duration,
      maxPlayers: args.data.maxPlayers,
      price: args.data.price,
      location: { connect: { id: args.data.location.connect.id } },
      host: { connect: { id: args.data.host.connect.id } }
    })
  },
  async signup(parent, args, context) {
    const password = await bcrypt.hash(args.password, 10)
    
    const user = await context.prisma.createUser({ ...args, password })

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    context.response.cookie("token", token, {
      httpOnly: false,
      // secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    })
    return {
      token,
      user
    }
  },
  async login(parent, args, context) {

    // 1
    const user = await context.prisma.user({ email: args.email })
    // console.log("user: ", user)
    if (!user) {
      throw new Error("No such user found")
    }

    // 2

    const valid = (await bcrypt.compare(args.password, user.password))

    if (!valid) {
      throw new Error("Invalid password")
    }

    const token = jwt.sign({ userId: await user.id, claims: "read-users" }, APP_SECRET)


    context.response.cookie("token", token, {
      httpOnly: false,
      // secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    })

    // 3
    return {
      token,
      user
    }
  },
  logout(parent, args, context) {
    context.response.clearCookie("token")
    return { message: "Goodbye!" }
  }
}

module.exports = Mutation
