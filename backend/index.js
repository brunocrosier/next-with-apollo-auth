require("dotenv").config()

const { prisma } = require("./generated/prisma-client")
const { GraphQLServer } = require("graphql-yoga")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const Query = require("./resolvers/Query")
const Mutation = require("./resolvers/Mutation")
const {APP_SECRET} = process.env

// import schema stuff

if (process.env.NODE_ENV !== "production") {
  const { importSchema } = require("graphql-import")
  const fs = require("fs")

  const text = importSchema(__dirname + "/schema.graphql")
  fs.writeFileSync("./schema_prep.graphql", text)
}

const server = new GraphQLServer({
  typeDefs: __dirname + "/schema_prep.graphql",
  resolvers: {
    Query,
    Mutation
  },
  context: request => {
    return { ...request, prisma }
  }
})

const corsOptions = {
  origin: process.env.NODE_ENV === "production" ? process.env.PRODUCTION_FRONTEND_URL : "http://localhost:3000",
  credentials: true // <-- REQUIRED backend setting
}

server.express.use(cors(corsOptions))

server.express.use(cookieParser())

// 2. decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies
  if (token) {
    console.log("token", token)
    const { userId } = jwt.verify(token, APP_SECRET)
    // put the userId onto the req for future requests to access
    req.userId = userId
    console.log("userId", userId)
  }
  next()
})

// 3. Create a middleware that populates the user on each request

server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next()

  const user = await prisma.user({ id: req.userId })
  req.user = user
  console.log("req.user", JSON.stringify(req.user))

  next()
})

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.NODE_ENV === "production" ? process.env.PRODUCTION_FRONTEND_URL : "http://localhost:3000" // your frontend url.
    }
  },
  () => console.log("Server is running on http://localhost:4000")
)
